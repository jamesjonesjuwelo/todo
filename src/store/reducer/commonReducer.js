import { commonActions } from '../action/commonAction';

const initialState = {
  userActionsOverlayVisible: false
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case commonActions.toggleUserActionsOverlay().type: {
      return { ...state, userActionsOverlayVisible: !state.userActionsOverlayVisible };
    }
    default: {
      return { ...state };
    }
  }
};

export default commonReducer;
