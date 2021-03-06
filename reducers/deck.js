import * as ACTIONS from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.TYPES_DECK_DETAIL_GET:
      return action.payload;
    default:
      return state;
  }
};
