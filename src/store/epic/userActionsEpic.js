import { Observable } from 'rxjs';
import { userActions } from "../action/userActionsAction";
import axios from "../../axios";

export const getUserActionsEpic = (action$, store) =>
  action$.ofType(userActions.getUserActions().type)
  .mergeMap(action => Observable.fromPromise(axios.get('/get-user-actions'))
    .mergeMap(resp => {
      const { userActionsList } = resp.data;

      const formattedUserActions = userActionsList.reduce((prev, curr) => {
        const { id, description, type } = curr;
        prev.push({
          id,
          description,
          type
        });
        return prev;
      }, []);

      return Observable.of(userActions.getUserActionsSuccess(formattedUserActions))
    })
    .catch(error => Observable.of(userActions.getUserActionsFailure(error)))
  );

export const startRecordingEpic = (action$, store) =>
  action$.ofType(userActions.startRecording().type)
    .mergeMap(action => Observable.fromPromise(axios.get('/start-recording'))
      .mergeMap(resp => Observable.of(userActions.startRecordingSuccess()))
      .catch(error => Observable.of(userActions.startRecordingFailure(error)))
    );

export const stopRecordingEpic = (action$, store) =>
  action$.ofType(userActions.stopRecording().type)
    .mergeMap(action => Observable.fromPromise(axios.get('/stop-recording'))
      .mergeMap(resp => Observable.of(userActions.stopRecordingSuccess()))
      .catch(error => Observable.of(userActions.stopRecordingFailure(error)))
    );

export const clearRecordingEpic = (action$, store) =>
  action$.ofType(userActions.clearRecording().type)
    .mergeMap(action => Observable.fromPromise(axios.get('/clear-recording'))
      .mergeMap(resp => Observable.of(userActions.clearRecordingSuccess()))
      .catch(error => Observable.of(userActions.clearRecordingFailure(error)))
    );


