import { notesActions } from '../action/notesAction';

const initialState = {
  list: []
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case notesActions.updateList().type: {
      return { ...state, list: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default notesReducer;
