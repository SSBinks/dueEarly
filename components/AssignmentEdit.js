'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  PickerIOS,
  DatePickerIOS,
  TouchableHighlight,
  Modal,
  Button
} from 'react-native';

class AssignmentEdit extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    console.log('make sure to check on' + this.props._id);
    return (
      <View style={styles.container}>
      <Text style={{color: 'black', fontSize: 80, justifyContent: 'center'}}>
      Hello World
      </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingTop: 40,
    backgroundColor: 'white',
  },
});
module.exports = AssignmentEdit;
