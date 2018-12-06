import { userActions } from '../action/userActionsAction';

const initialState = {
  userActions: [],
  recording: false
};

const userActionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.getUserActionsSuccess().type: {
      return { ...state, userActions: action.payload };
    }
    case userActions.startRecordingSuccess().type: {
      return { ...state, recording: true };
    }
    case userActions.stopRecordingSuccess().type: {
      return { ...state, recording: false };
    }
    case userActions.clearRecordingSuccess().type: {
      return { ...state, recording: false };
    }
    default: {
      return { ...state };
    }
  }
};

export default userActionsReducer;
