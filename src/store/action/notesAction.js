import { createActions } from 'redux-actions';

export const notesActions = createActions({
  GET_LIST: () => {},
  GET_LIST_FAILURE: error => error,
  
  CREATE_NEW_ITEM: item => item,
  CREATE_NEW_ITEM_FAILURE: error => error,

  UPDATE_ITEM: description => description,
  UPDATE_ITEM_FAILURE: error => error,
  
  SAVE_ITEM_UPDATE: item => item,
  SAVE_ITEM_UPDATE_FAILURE: item => item,

  DELETE_ITEM: id => id,
  DELETE_ITEM_FAILURE: error => error,

  UPDATE_LIST: list => list,

  COMPLETE_ITEM: id => id,
  COMPLETE_ITEM_FAILURE: error => error,

  SAVE_NEW_ITEM: item => item,
  SAVE_NEW_ITEM_FAILURE: error => error
});

export const getList = dispatch => data =>
  dispatch(notesActions.getList(data));

export const createNewItem = dispatch => item =>
  dispatch(notesActions.createNewItem(item));

export const updateItem = dispatch => description =>
  dispatch(notesActions.updateItem(description));

export const deleteItem = dispatch => id =>
  dispatch(notesActions.deleteItem(id));

export const completeItem = dispatch => id =>
  dispatch(notesActions.completeItem(id));



