import { createActions } from 'redux-actions';

export const commonActions = createActions({
  TOGGLE_USER_ACTIONS_OVERLAY: boolean => boolean,
});

export const toggleUserActionsOverlay = dispatch => () =>
  dispatch(commonActions.toggleUserActionsOverlay());


