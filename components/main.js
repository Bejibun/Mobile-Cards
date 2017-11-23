import { StyleSheet, View } from 'react-native';
import React from 'react';
import Decks from './decks';
import { orange, white, blue } from '../utils/colors';

export default class Main extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Decks {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
