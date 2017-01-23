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
  Button,
  Switch,
} from 'react-native';

// import ModalDropdown from 'react-native-modal-dropdown';
const AssignmentEdit = require('./AssignmentEdit');
const Course = require('./Course');
const Dashboard = require('./Dashboard');
const moment = require('moment');
//For the picker of classes
const PickerItemIOS = PickerIOS.Item;

const PARTS = {
  default: {
    type: ''
  },
  page: {
    type: 'page'
  },
  chapter: {
    type: 'chapter'
  },
  section: {
    type: 'section'
  },
  problemSet: {
    type: 'problem set'
  }
};
const ASSIGNMENT_TYPES = {
  default: {
    type: '',
    progress: 0
  },
  reading: {
    type: 'Reading',
    progress: 10
  },
  draft: {
    type: 'Draft',
    progress: 55
  },
  termPaper: {
    type: 'Term Paper',
    progress: 30
  },

  midterm: {
    type: 'Midterm',
    progress: 20
  },
  final: {
    type: 'Final',
    progress: 40
  },
  exam: {
    type: 'Exam',
    progress: 40
  },
  presentation: {
    type: 'Presentation',
    progress: 90
  },
  personal: {
    type: 'Personal Project',
    progress: 20
  }
};

class Assignment extends Component {
  static defaultProps = {
    date: new Date(),
  };
  constructor(props) {
    super(props);
    this.state = {
      warningColor: '#f9f6b8',
      course: 'math',
      date: this.props.date,
      text: '',
      deliverable: 'default',
      dateModal: false,
      typeModal: false,
      partModal: false,
      progress: 0,
      complete: false,
      parts: 'default',
      completionAmount: '',
      weekly: false,
      daily: false,
      goal: '',
    };
  }
  onAssignType() {
    this.props.navigator.push({
      component: AssignmentEdit
    });
  }
  onDateChange = (date) => {
    console.log('Date is a changin' + date);
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
  setdateModal(visible, othercrap) {
    console.log('This is the first thing:' + visible);
    console.log('This is the second thing:' + othercrap);
    this.setState({ dateModal: visible });
  }
  setTypeModal(visible, othercrap) {
    this.setState({ typeModal: visible });
  }
  setPartModal(visible) {
    this.setState({ partModal: visible });
  }
  makeNewAssignment() {
    console.log('this is the text' + this.state.text);
    if(this.state.text !== '') {
      fetch('http://www.whats-due.com/assign/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.state.text,
          dueDate: moment(this.state.date).format('L'),
          complete: this.state.complete,
          category: ASSIGNMENT_TYPES[this.state.deliverable].type,
          part: PARTS[this.state.parts].type

        })
      });
      this.goHome();
    }
    else {
      this.setState({ warningColor: '#f4cecd' });
    }
  }

  render() {
    var modalBackgroundStyle = {
      backgroundColor: this.state.typeModal ? 'rgba(0, 0, 0, 0.5)' : 'green',
    };


    const turnin = ASSIGNMENT_TYPES[this.state.deliverable]
    this.progress = turnin.progress;
    // console.log(COURSES[this.state.course].title);
    return (
      // This is the input for the assingment
      <View style={styles.container}>

      <View style={styles.headingContainer}>
      <View style={[styles.input, { backgroundColor: this.state.warningColor }]}>
      <TextInput
      style={styles.textInputDecor}
      placeholder='New Assignment ...'
      placeholderTextColor='black'
      numberOfLines={1}
      placeholderTextColor='grey'
      onChangeText={(text) => this.setState({ text })}

      value={this.state.text}
      />
      </View>
      </View>

      {/*This is the selector for the type of assignment*/}

      <TouchableHighlight
      style={styles.headingContainer}
      onPress={this.setTypeModal.bind(this, true)}
      >
      <View style={styles.section}>
      <Text style={styles.heading}>
      I am working on a... {ASSIGNMENT_TYPES[this.state.deliverable].type}
      </Text>
      </View>
      </TouchableHighlight>


      <Modal
      visible={this.state.typeModal}
      animationType='slide'
      transparent={true}
      >
      <View style={[styles.container, { justifyContent: 'center' }, modalBackgroundStyle]}>
      <View style={{ backgroundColor: 'white', justifyContent: 'center' }}>
      <View style={{ paddingTop: 5 }}>
      <Text style={styles.modalHeading}> Assignment Type </Text>
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

    <Button
    onPress={this.setTypeModal.bind(this, false)}
    title='Choose Assignment'
    color='black'
    />
    </View>
    </View>

    </Modal>

    {/* This is where the parts are selected*/}

    <TouchableHighlight
    style={styles.headingContainer}
    onPress={this.setPartModal.bind(this, true)}
    >
    <View style={styles.section}>
    <Text style={styles.heading}>
    I need to divide this by... {PARTS[this.state.parts].type}
    </Text>
    </View>
    </TouchableHighlight>


    <Modal
    visible={this.state.partModal}
    animationType='slide'
    transparent={true}
    >
    <View style={[styles.container, { justifyContent: 'center' }, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
    <View style={{ backgroundColor: 'white', justifyContent: 'center' }}>
    <View style={{ paddingTop: 5 }}>
    <Text style={styles.modalHeading}> Section Type </Text>
    </View>
    <PickerIOS
    itemStyle={styles.picker}
    selectedValue={this.state.parts}
    onValueChange={(parts) => this.setState({ parts })}

    >
    {Object.keys(PARTS).map((parts) => (
      <PickerItemIOS
      key={parts}
      value={parts}
      label={PARTS[parts].type}
      />
    )

  )}
  </PickerIOS>
  <Button
  onPress={this.setPartModal.bind(this, false)}
  title='Confirm Part'
  color='black'
  />
  </View>
  </View>

  </Modal>
{/* This is where the input start and endput*/}
  <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-around' }}>
  <View style={{width: 150, height: 36,  borderBottomColor: 'grey', borderBottomWidth: 2 }}>
  <TextInput
  style={[styles.textInputDecor, { textAlign: 'center' }, {justifyContent: 'flex-end'}]}
  placeholder='Starting Point...'
  placeholderTextColor='black'
  numberOfLines={1}
  keyboardType='numeric'
  placeholderTextColor='grey'
  onChangeText={(completionAmount) => this.setState({ completionAmount })}
  value={this.state.completionAmount}
  />
  </View>
  <View style={{width: 150, height: 36,  borderBottomColor: 'grey', borderBottomWidth: 2 }}>
  <TextInput
  style={[styles.textInputDecor, { textAlign: 'center' }, {justifyContent: 'flex-end'}]}
  placeholder='End Goal...'
  placeholderTextColor='black'
  keyboardType='numeric'
  numberOfLines={1}
  placeholderTextColor='grey'
  onChangeText={( goal) => this.setState({ goal })}
  value={this.state.goal}
  />
  </View>
  </View>

  {/* These are the switches*/}
  <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-around', marginBottom: 10 }}>
  <View style={{width: 150, height: 36,  borderBottomColor: 'grey', borderBottomWidth: 2 }}>
  <Text>Daily Notifications
  <Switch
  onTintColor='white'
  onValueChange={(value) => this.setState({ daily: value })}
  style={{ marginTop: 10 }}
  value={this.state.daily}
  />
  </Text>
  </View>
  <View style={{width: 150, height: 36,  borderBottomColor: 'grey', borderBottomWidth: 2 }}>
  <Text>Weekly Notifications
  <Switch
  onTintColor='white'
  onValueChange={(value) => this.setState({ weekly: value })}
  style={{ marginTop: 10 }}
  value={this.state.weekly}
  />
  </Text>
  </View>
  </View>

  {/* This is the beginning of the date stuff*/}
  <TouchableHighlight
  >
  <View style={styles.headingContainer}>
  <View style={styles.section}>
  <Text style={styles.heading}
  onPress={this.setdateModal.bind(this, true)}>
  This is due on... {moment(this.state.date).format('L')}
  </Text>
  </View>
  </View>
  </TouchableHighlight>

  <Modal
  visible={this.state.dateModal}
  animationType='slide'
  transparent={true}
  >
  <View style={[styles.container, { justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
  <View style={{ backgroundColor: 'white', justifyContent: 'center'}}>
  <Text> The Date </Text>
  <View style={[{ backgroundColor: 'blue' }, { backgroundColor: 'white' }]}>
  <DatePickerIOS
  minimumDate={this.props.date}
  style={styles.date}
  date={this.state.date}
  mode='date'
  onDateChange={this.onDateChange}
  />
  <Button
  onPress={this.setdateModal.bind(this, false)}
  title='Confirm Date'
  color='black'
  />
  </View>
  </View>
  </View>
  </Modal>
  <View style={{ marginTop: 10 }}>
  <Button
  onPress={this.makeNewAssignment.bind(this)}
  title='Create Assignment'
  color='black'
  />
</View>
  </View>
);
}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f6b8',
    flex: 1,
    marginTop: 65,
    padding: 10,
  },
  label: {
    fontSize: 20,
    // textAlign: 'center',
    margin: 10,
    fontFamily: 'Chalkboard SE',
  },
  picker: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    backgroundColor: 'white'
  },

  date: {
    height: 180,
    backgroundColor: 'blue',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  textInputDecor: {
    textDecorationColor: 'black',
    // fontWeight: 'bold',
    height: 40,
    fontSize: 15,

  },
  headingContainer: {
    padding: 4,
    borderColor: 'black',
    height: 60,
    marginTop: 20

  },
  heading: {
    color: 'black',
    fontSize: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  modalHeading: {
    fontWeight: 'bold',
    fontSize: 25,
    fontFamily: 'ChalkboardSE-Bold',
    textAlign: 'center'
  },
  input: {
    borderColor: '#f9f6b8',
    borderWidth: 1,
    height: 40,
    borderBottomColor: 'grey',
    borderStyle: 'solid'
  },

  section: {
    height: 60,
    borderStyle: 'dashed',
    borderWidth: 3,
    backgroundColor: 'white',
    borderColor: '#f9f6b8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  }

});
module.exports = Assignment;
