import React, { Component } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, Text, Keyboard, Platform, StyleSheet } from 'react-native';
import { purple, white } from '../utils/colors';
import { NavigationActions } from 'react-navigation';
import { Card, FormInput, FormValidationMessage } from 'react-native-elements';
import { saveDeckTitle } from '../utils/api';

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Create Deck</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends React.Component {
  state = {
    currentTitle: '',
    errMsg: false
  };

  handleSubmit = () => {
    if (this.state.currentTitle) {
      const { currentTitle } = this.state;
      saveDeckTitle(currentTitle);
      this.setState({
        errMsg: false,
        currentTitle: ''
      });
      this.props.navigation.navigate(
        'Deck',
        {
          navTitle: currentTitle,
          entryId: currentTitle
        },
        Keyboard.dismiss()
      );
    } else {
      this.setState({ errMsg: true })
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={{
        flex: 1,
          justifyContent: 'center',
          alignContent: 'center'
        }}
        behavior="padding"
      >
        <Card title="What is the title of your new deck?" >
          <FormInput
            onChangeText={currentTitle => this.setState({ currentTitle })}
            value={this.state.currentTitle}
          />
          <FormValidationMessage>
            {this.state.errMsg ? 'This field is required': ''}
          </FormValidationMessage>
          <SubmitBtn onPress={this.handleSubmit}
          />
        </Card>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})

export default AddDeck;
