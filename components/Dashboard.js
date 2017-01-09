'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  PickerIOS,
  DatePickerIOS,
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
const ASSIGNMENT_TYPES = {
  termPaper: {
    type: 'term paper',
  },
  final: {
    type: 'final',
  },
  midterm: {
    type: 'midterm',
  },
  exam: {
    type: 'exam',
  },
  draft: {
    type: 'draft',
  },
  reading: {
    type: 'reading',
  }
};

class Dashboard extends Component {
  static defaultProps = {
    date: new Date(),
  };
  constructor(props) {
    super(props);
    this.state = {
      course: 'math',
      date: this.props.date,
      text: '',
      deliverable: 'termPaper'
    };
  }
  onDateChange = (date) => {
    console.log('DAte is a changin');
    this.setState({ date: date });
  };
  render() {
    const classes = COURSES[this.state.course];
    const selection = classes.title + ' ' + classes.time;
    console.log(COURSES[this.state.course].title);
    return (
        // This is the input for the assingment
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            Assignment Name
          </Text>
        </View>

        <View style={styles.input}>
          <TextInput
            style={{ textDecorationColor: 'black', fontWeight: 'bold', height: 30, fontSize: 15 }}
      // multiline={true}
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

        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            Course
          </Text>
        </View>

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
      // console.log(this.state.course);
    )}
    </PickerIOS>
    <View style={styles.headingContainer}>
    <Text style={styles.heading}>
    Due Date
    </Text>
    </View>
    <DatePickerIOS
    style={styles.date}
    date={this.state.date}
    mode='date'
    onDateChange={this.onDateChange}
    />
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
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
    backgroundColor: 'blue'
  },

  date: {
    height: 170,
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
module.exports = Dashboard;
