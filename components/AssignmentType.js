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

class AssignmentType extends Component {
  render() {
    return (
      <View style={styles.contrainer}>
      <Text>
      Hello World
      </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#838487',
    flex: 1,
    marginTop: 65,
    padding: 5,
  },

});
module.exports = AssignmentType;
