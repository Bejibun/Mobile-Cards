import { AsyncStorage } from 'react-native'
// import { formatCalendarResults, CALENDAR_STORAGE_KEY } from './_calendar'

/*
getDecks: return all of the decks along with their titles, questions, and answers. 

getDeck: take in a single id argument and return the deck associated with that id. 

saveDeckTitle: take in a single title argument and add it to the decks. 

addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 
*/

//Get All Deck List
export function getDecks() {
  return AsyncStorage.getAllKeys().then(keys => {
    return AsyncStorage.multiGet(keys).then(stores => {
      return stores.map((result, i, store) => {
        // get at each store's key/value so you can work with it
        let key = store[i][0];
        let value = JSON.parse(store[i][1]);
        if (value) {
          return {
            key,
            title: value.title,
            questions: value.questions
          };
        }
      }).filter(items => {
        if (items) {
          return typeof items.questions !== 'undefined'
        }
      });
    });
  });
}

//Get specific Deck
export function getDeck(id) {
  return AsyncStorage.getItem(id);
}

//Save Deck Title
export function saveDeckTitle(title) {
  try {
    return AsyncStorage.setItem(title, JSON.stringify({ title, questions: [] }));
  } catch (err) {
    console.log(err);
  }
}

//Add New Card to deck
export function addCardToDeck(title, card) {
  console.log("add card", title, card.question, card.answer);
  try {
    AsyncStorage.getItem(title).then(result => {
      const data = JSON.parse(result);

      let questions = data.questions;
      questions.push(card);

      AsyncStorage.mergeItem(title, JSON.stringify({
        questions
      }));
    });
  } catch (err) {
    console.log(err);
  }
}
