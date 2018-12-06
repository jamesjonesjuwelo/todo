const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");
const db = require('./db');
const {
  getList,
  createListRow,
  createActionRow,
  updateItemDescription ,
  updateItemCompletion,
  deleteItemRow,
  getUserActions,
  clearUserActions
} = db;

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());
app.use(compression());
app.use(express.static('public'));

app.use(cookieSession({
  name: 'session',
  secret: 'secret', // default secret for the project
  maxAge: 24 * 60 * 60 * 1000 * 7 * 30
}));

app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/dist/bundle.js`));

app.get('/get-list', (req, res) => {
  req.session.recording = false;
  getList()
    .then(result => res.json({ list: result.rows }))
    .catch(error => {
      console.log(error);
      res.json({ error: true })
    })
});

app.get('/get-user-actions', (req, res) => {
  getUserActions()
    .then(result => res.json({ userActionsList: result.rows }))
    .catch(error => {
      console.log(error);
      res.json({ error: true })
    })
});

app.get('/start-recording', (req, res) => {
  req.session.recording = true;
  res.json({ success: true });
});

app.get('/stop-recording', (req, res) => {
  req.session.recording = false;
  res.json({ success: true });
});

app.get('/clear-recording', (req, res) => {
  req.session.recording = false;
  const userId = req.session.id;
  
  clearUserActions(userId)
    .then(result => res.json({ success: true }))
    .catch(error => {
      console.log(error);
      res.json({ error: true })
    })
});

const createUserId = () => `id-${Math.random().toString(36).substr(2, 16)}`;

const saveAction = (description, userId, type, createdAt) =>
  createActionRow(description, userId, type, createdAt)
    .then(result => true)
    .catch(console.log);

const saveItem = (name, description, createdAt, completed) =>
  createListRow(name, description, createdAt, completed)
    .then(result => result.rows[0])
    .catch(console.log);

const saveItemDescription = (id, description) =>
  updateItemDescription(id, description)
    .then(result => true)
    .catch(console.log);

const saveItemCompletion = (id, completed) =>
  updateItemCompletion(id, completed)
    .then(result => true)
    .catch(console.log);

const deleteItem = (id) =>
  deleteItemRow(id)
    .then(result => true)
    .catch(console.log);

app.get('/get-list', (req, res) =>
  getList()
    .then(result => res.json({ list: result.rows }))
    .catch(error => {
      console.log(error);
      res.json({ error: true })
    })
);

app.post('/create-item', (req, res) => {
  const { name, description, createdAt, completed } = req.body;
  const userId = req.session.id ? req.session.id : createUserId();
  
  if (!req.session.id) req.session.id = userId;
  const type = 'Created';
  
  const itemVal = saveItem(name, description, createdAt, completed);
  const saveActionProm = req.session.recording
    ? saveAction(description, userId, type, createdAt)
    : Promise.resolve(true);
  
  Promise
    .all([itemVal, saveActionProm])
    .then(values => res.json({ item: values[0] }))
    .catch(error => res.json({ error: true }));
});

app.post('/update-item', (req, res) => {
  const { id, description, completed, createdAt } = req.body;
  const userId = req.session.id ? req.session.id : createUserId();
  
  const itemVal = completed
    ? saveItemCompletion(id, completed)
    : saveItemDescription(id, description);
  const type = completed ? 'Completed' : 'Updated';
  
  const saveActionProm = req.session.recording
    ? saveAction(description, userId, type, createdAt)
    : Promise.resolve();
  
  Promise
  .all([itemVal, saveActionProm])
    .then(values => res.json({ success: true }))
    .catch(error => res.json({ error: true }));
});

app.post('/delete-item', (req, res) => {
  const { id, description, createdAt } = req.body,
    userId = req.session.id ? req.session.id : createUserId(),
    type = 'Deleted';
  
  const deleteVal = deleteItem(id);
  const saveActionProm = req.session.recording
    ? saveAction(description, userId, type, createdAt)
    : Promise.resolve();
  
  Promise
    .all([deleteVal, saveActionProm])
    .then(values => res.json({ success: true }))
    .catch(error => res.json({ error: true }));
});


app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(8080, () => console.log('Im listening'));
