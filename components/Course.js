'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,

} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
class Course extends Component {
  constructor(props) {
    super(props);
    value: 0;
    this.state = {
      value:  this.props.value
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={{marginBottom: 25}} >
      <Text style={{ fontWeight: 'bold', fontSize: 15, fontFamily: 'ChalkboardSE-Bold'}} >
      I am looking for my task by ...
      </Text>

      </View>

      <TouchableHighlight>
      <View style={{ height: 80, width: 250, alignSelf: 'center'}}>
      <View style={{ backgroundColor: 'grey', borderRadius: 30, flex: 1, justifyContent: 'center'}}>
      <ModalDropdown dropDownstyle={{ justifyContent: 'center', width: 100 }} options={['option 1', 'option 2']}>
      <Text style={{textAlign: 'center', fontWeight: 'bold'}}> Category </Text>
      </ModalDropdown>
      </View>
      </View>
      </TouchableHighlight>



      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginHorizontal: 20,
    paddingTop: 40,
    backgroundColor: 'white',
  },
});
module.exports = Course;
