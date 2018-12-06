import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import {
  getListEpic,
  createNewItemEpic,
  saveNewItemEpic,
  updateItemEpic,
  saveItemUpdateEpic,
  deleteItemEpic,
} from './epic/notesEpic';
import {
  getUserActionsEpic,
  startRecordingEpic,
  stopRecordingEpic,
  clearRecordingEpic
} from './epic/userActionsEpic';
import notesReducer from './reducer/notesReducer';
import commonReducer from './reducer/commonReducer';
import userActionsReducer from './reducer/userActionsReducer';


export const rootEpic = combineEpics(
  // notesEpics
  getListEpic,
  createNewItemEpic,
  saveNewItemEpic,
  updateItemEpic,
  saveItemUpdateEpic,
  deleteItemEpic,
  // userEpics
  getUserActionsEpic,
  startRecordingEpic,
  stopRecordingEpic,
  clearRecordingEpic
);

export const rootReducer = combineReducers({
  notesReducer,
  commonReducer,
  userActionsReducer
});