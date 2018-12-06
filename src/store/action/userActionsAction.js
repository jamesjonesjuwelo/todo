import { createActions } from 'redux-actions';

export const userActions = createActions({
  GET_USER_ACTIONS: () => {},
  GET_USER_ACTIONS_SUCCESS: userActions => userActions,
  GET_USER_ACTIONS_FAILURE: error => error,
  
  START_RECORDING: () => {},
  START_RECORDING_SUCCESS: () => {},
  START_RECORDING_FAILURE: () => {},
  
  STOP_RECORDING: () => {},
  STOP_RECORDING_SUCCESS: () => {},
  STOP_RECORDING_FAILURE: () => {},
  
  CLEAR_RECORDING: () => {},
  CLEAR_RECORDING_SUCCESS: () => {},
  CLEAR_RECORDING_FAILURE: () => {},
});

export const getUserActions = dispatch => () =>
  dispatch(userActions.getUserActions());

export const startRecording = dispatch => () => {
  console.log('firing');
  return dispatch(userActions.startRecording());
}


export const stopRecording = dispatch => () =>
  dispatch(userActions.stopRecording());

export const clearRecording = dispatch => () =>
  dispatch(userActions.clearRecording());



