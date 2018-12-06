import { Observable } from 'rxjs';
import { notesActions } from '../action/notesAction';
import { uniqueId, sortBy } from 'lodash';
import axios from '../../axios';

export const getListEpic = (action$, store) =>
  action$.ofType(notesActions.getList().type)
    .mergeMap(action => Observable.fromPromise(axios.get('/get-list'))
      .mergeMap(resp => {
        const { list } = resp.data;
  
        const formattedList = list.reduce((prev, curr) => {
          const { id, name, description, created_at, completed } = curr;
          const item = {
            id,
            name,
            description,
            createdAt: created_at,
            completed: completed === 'true'
          };
          
          prev.push(item);
          return prev;
        }, []);
  
        const sortedItems = sortBy(formattedList, [function(o) { return parseInt(o.id) }]);
        sortedItems.reverse();
        
        return Observable.of(notesActions.updateList(sortedItems))
      })
      .catch(error => Observable.of(notesActions.getListFailure(error)))
    );

export const createNewItemEpic = (action$, store) => // change to format new item
  action$.ofType(notesActions.createNewItem().type)
    .mergeMap(action => {
      const { description, name } = action.payload;
      
      const newDate = () => {
        let date = new Date();
        let dd = date.getDate();
        let mm = date.getMonth() +1;
        const yyyy = date.getFullYear();
        if(dd<10) dd = `0${dd}`;
        if(mm<10) mm = `0${mm}`;
    
        return `${dd}/${mm}/${yyyy}`;
      };

      const item = {
        name,
        description,
        createdAt: newDate(),
        completed: false
      };

      return Observable.of(notesActions.saveNewItem(item));
    })
    .catch(error => Observable.of(notesActions.createNewItemFailure(error)));

export const saveNewItemEpic = (action$, store) =>
  action$.ofType(notesActions.saveNewItem().type)
    .mergeMap(action => Observable.fromPromise(axios.post('/create-item', action.payload))
      .mergeMap(resp => {
        if (resp.data.error) return Observable.of(notesActions.saveNewItemFailure());
        const respItem = { ...resp.data.item },
          item = { ...action.payload },
          state = store.getState(),
          list = [ ...state.notesReducer.list ];
        
        item.id = respItem.id;
        list.unshift(item);

        return Observable.of(notesActions.updateList(list));
      })
      .catch(error => Observable.of(notesActions.saveNewItemFailure(error)))
    );

export const updateItemEpic = (action$, store) =>
  action$.ofType(notesActions.updateItem().type)
    .mergeMap(action => {
      const { completed, description, item } = action.payload;
      const newItem = { ...item };
      if (completed) newItem.completed = true;
      else if (description) newItem.description = description;
      
      return Observable.of(notesActions.saveItemUpdate(newItem));
    })
    .catch(error => Observable.of(notesActions.updateItemFailure(error)));

export const saveItemUpdateEpic = (action$, store) =>
  action$.ofType(notesActions.saveItemUpdate().type)
    .mergeMap(action => Observable.fromPromise(axios.post('/update-item', action.payload))
      .mergeMap(resp => {
        if (resp.data.error) return Observable.of(notesActions.saveItemUpdate());
        
        const item = action.payload,
          state = store.getState(),
          list = state.notesReducer.list;
        
        const updatedList = list.map(listItem => {
          if (listItem.id === item.id) return item;
          else return listItem;
        });
  
        return Observable.of(notesActions.updateList(updatedList));
      })
    );

export const deleteItemEpic = (action$, store) =>
  action$.ofType(notesActions.deleteItem().type)
    .mergeMap(action => Observable.fromPromise(axios.post('/delete-item', action.payload))
      .mergeMap(resp => {
        if (resp.data.error) return Observable.of(notesActions.deleteItemFailure());
        
        const { id } = action.payload,
          state = store.getState(),
          list = state.notesReducer.list;

        const updatedList = list.filter(item => item.id !== id);

        return Observable.of(notesActions.updateList(updatedList));
      })
      .catch(error => Observable.of(notesActions.deleteItemFailure(error)))
    );