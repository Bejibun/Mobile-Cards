import * as ACTIONS from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.TYPES_DECKS_GET:
    case ACTIONS.TYPES_DECK_DELETE:
      return action.payload;
    default:
      return state;
  }
};
