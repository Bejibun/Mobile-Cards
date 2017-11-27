import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, Text, Keyboard } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { getDeckDetailAction, deleteDeckAction } from '../actions';
import { orange, white, blue } from '../utils/colors';

class Deck extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.navTitle
    }
  };

  componentDidMount() {
    this.props.getDeckDetailAction(this.props.navigation.state.params.deckId);
  }

  componentDidUpdate() {
    this.props.getDeckDetailAction(this.props.navigation.state.params.deckId);
  }

  deleteItem() {
    const title = this.props.title;
    this.props.deleteDeckAction(title);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center'
        }}
      >
        <Card title={this.props.navigation.state.params.title} >
          <Text style={{marginBottom: 10, textAlign: 'center'}}>
            {this.props.questions ? this.props.questions.length : 0} cards
          </Text>
          <View>
            <Button
              icon={{name: 'note-add'}}
              backgroundColor='orange'
              buttonStyle={styles.buttonStyle}
              title='Add Card'
              onPress={() => {
                  this.props.navigation.navigate(
                    'AddQuestion',
                    {
                      navTitle: this.props.title,
                      title: this.props.title
                    }
                  );
                }
              }
            />
          </View>
          <View>
            <Button
              icon={{name: 'play-circle-outline'}}
              backgroundColor='blue'
              buttonStyle={[styles.buttonStyle, { marginTop: 10 }]}
              title='Start Quiz'
              onPress={() => {
                  this.props.navigation.navigate(
                    'Quiz',
                    {
                      navTitle: this.props.title,
                      questions: this.props.questions }
                  );
                }
              }
            />
          </View>
        </Card>
        <View>
          <Button
            title="Remove"
            buttonStyle={[styles.buttonStyle, { marginTop: 50 }]}
            backgroundColor="red"
            onPress={() => this.deleteItem()}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  }
};

const mapStateToProps = state => {

  const { title, questions } = state.deck ? state.deck : ('', []);

  return { title, questions };
};

export default connect(mapStateToProps, {
  deleteDeckAction, getDeckDetailAction })(Deck);
