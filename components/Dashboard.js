'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  // TextInput,
  PickerIOS
} from 'react-native';

//For the picker of classes
const PickerItemIOS = PickerIOS.Item;

//Class objects which will come in as JSOn?
const COURSES = {
  math: {
    title: 'math',
    time: '9:30'
  },
  science: {
    title: 'science',
    time: '10:30'
  },
  gym: {
    title: 'gym',
    time: '1:30'
  },
  AA: {
    title: 'AA',
    time: '8:30'
  },
  english: {
    title: 'english',
    time: '2:30'
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: 'english',
    };
  }
  render() {
    const classes = COURSES[this.state.course];
    const selection = classes.title + ' ' + classes.time;
    console.log(COURSES[this.state.course].title);
    return (

      <View style={{ marginTop: 20 }}>
      <Text style={styles.label}> Subject: </Text>
      <PickerIOS
      itemStyle={{ fontSize: 25, color: 'red', textAlign: 'left', fontWeight: 'bold' }}
      selectedValue={this.state.course}

      onValueChange={(course) => this.setState({ course })}
      >

      {Object.keys(COURSES).map((course) => (
        <PickerItemIOS
        key={course}
        value={course}
        label={COURSES[course].title}
        />
      )
      // console.log(this.state.course);
    )}
      </PickerIOS>

      </View>
      // <TextInput
      // style={{ height: 40, width: 40 }}
      // placeholder='Here be a list of classes'
      // OnChangeText={(text) => this.setState({ text })}
      // />

      // <Text
      // style={styles.instructions}>
      // To get started, edit index.ios.js
      // </Text>
      // <Text style={styles.instructions}>
      // Press Cmd+R to reload,{'\n'}
      // Still Here!
      // Cmd+D or shake for dev menu
      // </Text>


    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#838487',
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Chalkboard SE',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
module.exports = Dashboard;
