import { AsyncStorage } from 'react-native';
import { getDecks, getDeck } from '../utils/api';
import * as ACTIONS from './types';

export function getDecksAction() {
  return (dispatch) => {
    getDecks().then(data => dispatch ({type: ACTIONS.TYPES_DECKS_GET, payload: data}));
  }
}

export function getDeckDetailAction(deckId){
  return (dispatch) => {
    getDeck(deckId).then(deckDetail => {
      dispatch ({type: ACTIONS.TYPES_DECK_DETAIL_GET, payload: JSON.parse(deckDetail)})
    });
  }
}

export function deleteDeckAction(deckTitle) {
  return (dispatch) => {
    AsyncStorage.removeItem(deckTitle)
      .then(getDecks().then(data => {
          dispatch({ type: ACTIONS.TYPES_DECK_DELETE, payload: data})
        })
        .catch(err => console.log(err)))
      .catch(err => console.log(err));
  }
}
