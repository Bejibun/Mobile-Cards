import React from "react";
import { StackNavigator } from 'react-navigation';
import Deck from './components/deck';
import AddQuestion from './components/addQuestion';
import Quiz from './components/quiz';

const MainNavigator =  StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: "Deck List",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "gray"

      }
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "gray"

      }
    }
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "gray"

      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "gray"

      }
    }
  }
});

export default MainNavigator;
