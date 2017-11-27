import React from 'react'
import { connect } from 'react-redux';
import { KeyboardAvoidingView, TouchableOpacity, FlatList, View, Text, Keyboard, StyleSheet } from 'react-native';
import { Badge, Button, Card, FormInput, FormValidationMessage } from 'react-native-elements'
import { getDecksAction } from '../actions';
import { orange, white } from '../utils/colors';

class Decks extends React.PureComponent {

  componentDidMount() {
    this.props.getDecksAction();
  }

  componentDidUpdate() {
    this.props.getDecksAction()
  }

  _keyExtractor = (data, renderItem) => {this.props.DBdata,this.renderItem};

  renderItem = ({ item }) =>
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate(
              'Deck',
              {
                deckId: item.key,
                navTitle: item.title,
                title: item.title
              }
            )}
    >
      <View>
        <Card
          title={item.title}
          subtitle={`${item.questions.length} cards`}>
            <Text style={{textAlign: 'center'}}>
              {`${item.questions.length} cards`}
            </Text>
        </Card>
      </View>
    </TouchableOpacity>;


  render() {
    return (
      <View style={styles.containerStyle}>
        {this.props.DBdata.length > 0
          ?
          <FlatList
            data={this.props.DBdata}
          renderItem={this.renderItem}
          />
        : <Card title="Create Your Deck!"/>
        }
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    alignSelf: 'stretch'
  }
};

const mapStateToProps = state => {
  const DBdata = state.decks;

  return { DBdata };
};

export default connect(mapStateToProps, { getDecksAction })(Decks);
