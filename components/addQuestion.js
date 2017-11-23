import React from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { addCardToDeck } from '../utils/api';

class AddQuestion extends React.Component {
  state = {
    questionInput: '',
    answerInput: '',
    erMsg: ''
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.navTitle
    }
  };

  handleSubmit = () => {
    if (this.state.questionInput && this.state.answerInput) {
      const { questionInput, answerInput } = this.state;
      const title = this.props.navigation.state.params.title;

      const card = {
        question: questionInput,
        answer: answerInput
      };

      addCardToDeck(title, card);

      //Reset
      this.setState({
        errMsg: false,
        questionInput: '',
        answerInput: ''
      });

      this.props.navigation.goBack(Keyboard.dismiss());
    } else {
      this.setState({ errMsg: true })
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center'
        }}
        behavior="padding"
      >
        <Card title="Add a Card" >
          <FormLabel>Question:</FormLabel>
          <FormInput
            onChangeText={questionInput => this.setState({ questionInput })}
            value={this.state.titleText}
          />
          <FormLabel>Answer:</FormLabel>
          <FormInput
            onChangeText={answerInput => this.setState({ answerInput })}
            value={this.state.titleText}
          />
          <FormValidationMessage>
            {this.state.errMessage ? 'Both fields are required': ''}
          </FormValidationMessage>
          <Button
            title="Submit"
            raised
            backgroundColor="blue"
            onPress={this.handleSubmit}
          />
        </Card>
      </KeyboardAvoidingView>
    );
  }
}

export default AddQuestion;
