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

// import ModalDropdown from 'react-native-modal-dropdown';

const Course = require('./Course');
const Dashboard = require('./Dashboard');
const moment = require('moment');
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
const ASSIGNMENT_TYPES = {
  termPaper: {
    type: 'term paper',
    progress: 10
  },
  final: {
    type: 'final',
    progress: 30
  },
  midterm: {
    type: 'midterm',
    progress: 20
  },
  exam: {
    type: 'exam',
    progress: 40
  },
  draft: {
    type: 'draft',
    progress: 55
  },
  reading: {
    type: 'reading',
    progress: 90
  }
};

class Assignment extends Component {
  static defaultProps = {
    date: new Date(),
  };
  constructor(props) {
    super(props);
    this.state = {
      course: 'math',
      date: this.props.date,
      text: '',
      deliverable: 'termPaper',
      modalVisible: false,
      progress: 0,
      complete: false
    };
  }
  onDateChange = (date) => {
    console.log('DAte is a changin');
    this.setState({ date: date });
  };
  onCourseSelection() {
    this.props.navigator.push({
      component: Course
    });
  }
  goHome() {
    console.log('this is the text' + this.state.text);
    this.props.navigator.pop({
      component: Dashboard
    })
  }
  setModalVisible(visible, othercrap) {
    console.log('This is the first thing:' + visible);
    console.log('This is the second thing:' + othercrap);
    this.setState({ modalVisible: visible });
  }
  makeNewAssignment() {
    console.log('this is the text' + this.state.text);
    fetch('http://localhost:8000/assign', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.text,
        dueDate: this.state.date,
        complete: this.state.complete,
        progress: ASSIGNMENT_TYPES[this.state.deliverable].progress
      })
    });
    this.goHome();
  }

  render() {
    const classes = COURSES[this.state.course];
    const selection = classes.title + ' ' + classes.time;
    const turnin = ASSIGNMENT_TYPES[this.state.deliverable]
    this.progress = turnin.progress;
    // console.log(COURSES[this.state.course].title);
    return (
      // This is the input for the assingment
      <View style={styles.container}>

      <View style={styles.headingContainer}>
      <Text style={styles.heading}>
      Assignment Name: {this.state.text}
      </Text>
      </View>

      <View style={styles.input}>
      <TextInput
      style={{ textDecorationColor: 'black', fontWeight: 'bold', height: 30, fontSize: 15 }}
      placeholder='My new assignment'
      placeholderTextColor='yellow'
      numberOfLines={2}
      onChangeText={(text) => this.setState({ text })}
      value={this.state.text}
      />
      </View>
      {/*This is the selector for the type of assignment*/}
      <View style={styles.headingContainer}>
      <Text style={styles.heading}>
      Assignment Type
      </Text>
      </View>

      <PickerIOS
      itemStyle={styles.picker}
      selectedValue={this.state.deliverable}
      onValueChange={(deliverable) => this.setState({ deliverable })}

      >
      {Object.keys(ASSIGNMENT_TYPES).map((deliverable) => (
        <PickerItemIOS
        key={deliverable}
        value={deliverable}
        label={ASSIGNMENT_TYPES[deliverable].type}
        />
      )
      // console.log(this.state.course);
    )}
    </PickerIOS>

    <TouchableHighlight
    style={styles.headingContainer}
    onPress={this.onCourseSelection.bind(this)}
    >
    <Text style={styles.heading}>
    Course
    </Text>
    </TouchableHighlight>

    <PickerIOS
    itemStyle={styles.picker}
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
  )}
  </PickerIOS>

  <TouchableHighlight
  >
  <View style={styles.headingContainer}>
  <Text style={styles.heading}
  onPress={this.setModalVisible.bind(this, true)}>
  Due:
  </Text>
  </View>
  </TouchableHighlight>
  <Modal
  visible={this.state.modalVisible}
  animationType='slide'
  transparent={true}
  >
  <View style={[styles.container, { backgroundColor: 'transparent' }]}>
  <Text> The Date </Text>
  <View style={[{ backgroundColor: 'blue' }, { backgroundColor: 'grey' }]}>
  <DatePickerIOS
  minimumDate={this.props.date}
  style={styles.date}
  date={this.state.date}
  mode='date'
  onDateChange={this.onDateChange}
  />
  <Button
  onPress={this.setModalVisible.bind(this, false)}
  title='Confirm Date'
  color='black'
  />
  </View>
  </View>

  </Modal>

  <Text> This course is at {selection} </Text>
  <Button
  onPress={this.makeNewAssignment.bind(this)}
  title='Create Assignment'
  color='black'
  />

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
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
    backgroundColor: 'blue'
  },

  date: {
    height: 180,
    backgroundColor: 'blue',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  headingContainer: {
    padding: 4,
    backgroundColor: '#f6f7f8',
  },
  heading: {
    fontWeight: '500',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#838487',
    borderColor: '#000000',
    borderWidth: 1,
    height: 40
  }

});
module.exports = Assignment;
