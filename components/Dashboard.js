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
      <View style={styles.container}>
      <Text> Subject: </Text>
      <PickerIOS
      // itemStyle={styles.picker}
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
    <Text> This course is at {selection} </Text>
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
  label: {
    fontSize: 20,
    // textAlign: 'center',
    margin: 10,
    fontFamily: 'Chalkboard SE',
  },
  picker: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'

  }
  });
  module.exports = Dashboard;
