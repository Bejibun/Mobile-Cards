import React from 'react';
import { StatusBar,View, Button} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import Main from './components/main';
import Deck from './components/deck';
import AddDeck from './components/addDeck';
import AddQuestion from './components/addQuestion';
import Quiz from './components/quiz';
import reducer from './reducers';
import { setLocalNotification } from './utils/helpers';
import { Font, AppLoading } from 'expo';


function CustomStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        {...props}
      />
    </View>
  );
}


const Tabs = TabNavigator({
  Decks: {
    screen: Main,
    navigationOptions: {
      tabBarLabel: 'Deck Lists',
      tabBarIcon: ({ tintColor }) => <Ionicons name="md-albums" size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name="md-add" size={30} color={tintColor} />
    }
  }
});

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
      title: 'Details',
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

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <CustomStatusBar
            backgroundColor="gray"
            barStyle="light-content"
          />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
