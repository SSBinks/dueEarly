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
const Course = require('./Course');
const Dashboard = require('./Dashboard');
const moment = require('moment');
//For the picker of classes
const PickerItemIOS = PickerIOS.Item;

const PARTS = {
  default: {
    type: ''
  },
  Page: {
    type: 'Page'
  },
  Chapter: {
    type: 'Chapter'
  },
  Section: {
    type: 'Section'
  },
  ProblemSet: {
    type: 'Problem set'
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

class AssignmentEdit extends Component {
  static defaultProps = {
    date: new Date(),
  };
  constructor(props) {
    super(props);
    this.state = {
      warningColor: '#f9f6b8',
      date: this.props.date,
      text: this.props.title,
      deliverable: 'default',
      dateModal: false,
      typeModal: false,
      partModal: false,
      progress: this.props.progress.toString(),
      complete: this.props.complete,
      parts: 'default',
      completionAmount: ((this.props.completionAmount).toFixed(0)).toString(),
      weekly: false,
      daily: false,
      goal: this.props.goal.toString(),
      dailyGoal: this.props.dailyGoal.toString()
    };
    console.log('This is props part ' + this.props.part);
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
  //Set the Progress
  onSetProgress () {
    const num = parseInt(this.state.completionAmount) / parseInt(this.state.goal);
    console.log('In the onSetProgress this is num' + num);
    const percent = num * 100;
    console.log('In the onSetProgress this is percent' + percent);
    this.setState({ progress: percent });
    console.log('In the onSetProgress this is progress' + this.state.progress);
  }

  onSetDailyGoals() {
    const today = moment();
    const dayDiff = moment(this.state.date).diff(today, 'days');
    if(dayDiff !== 0 ) {
      const goal =(parseInt(this.state.goal) - parseInt(this.state.completionAmount))/ parseInt(dayDiff);
      this.setState({ dailyGoal: goal });
    }
    else if(this.state.goal !== '') {
      const goals = parseInt(this.state.goal);
      this.setState({ dailyGoal: goals });
    }
    else {
      this.setState({ dailyGoal: 0});
    }
  }
  goHome() {
    console.log('this is the text' + this.state.text);
    this.props.navigator.pop({
      component: Dashboard,
      passProps: this.state
    })
  }
  //Modal setting!
  setdateModal(visible, othercrap) {
    console.log('This is the first thing:' + visible);
    console.log('This is the second thing:' + othercrap);
    this.setState({ dateModal: visible });
    this.onSetDailyGoals();
  }
  setTypeModal(visible, othercrap) {
    this.setState({ typeModal: visible });
  }
  setPartModal(visible) {
    this.setState({ partModal: visible });
  }

  appendAssignment() {
    // if( this.state.info._id === undefined) {
    //   this.updateProgress();
    // }
    console.log('This is the percent' + this.state.progress);
    console.log('I am getting here!');
    if (this.state.text !== '') {
      const id = this.props._id;
      fetch('http://www.whats-due.com/assign/update/' + id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.state.text,
          dueDate: moment(this.state.date).format('L'),
          complete: this.state.complete,
          categories: ASSIGNMENT_TYPES[this.state.deliverable].type,
          part: PARTS[this.state.parts].type,
          completionAmount: this.state.completionAmount,
          goal: this.state.goal,
          progress: this.state.progress,
          dailyGoal: this.state.dailyGoal
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
        backgroundColor: this.state.typeModal ? 'rgba(0, 0, 0, 0.5)' : 'white',
      };
      console.log('this is in the progress' + this.state.progress);
      console.log('this is in the daily Goal' + this.state.dailyGoal);
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
        placeholder={this.state.text}
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
        <View style={{ backgroundColor: 'white'  }}>
        <View style={{ paddingTop: 5,}}>
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
      <View style={styles.button}>
      <Button
      onPress={this.setTypeModal.bind(this, false)}
      title='Choose Assignment'
      color='black'
      />
      </View>
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
    <View style={styles.button}>
    <Button
    onPress={this.setPartModal.bind(this, false)}
    title='Confirm Part'
    color='black'
    />
    </View>
    </View>
    </View>

    </Modal>
    {/* This is where the input start and endput*/}
    <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-around' }}>
    <View style={{width: 150, height: 36,  borderBottomColor: 'grey', borderBottomWidth: 2 }}>
    <TextInput
    style={[styles.textInputDecor, { textAlign: 'center' }, {justifyContent: 'flex-end'}]}
    placeholder={(this.state.completionAmount).substring(0, 2)}
    placeholderTextColor='black'
    numberOfLines={1}
    placeholderTextColor='grey'
    onEndEditing={this.onSetProgress.bind(this)}
    onChangeText={(completionAmount) => this.setState({ completionAmount })}
    value={this.state.completionAmount}
    />
    </View>
    <View style={{width: 150, height: 36,  borderBottomColor: 'grey', borderBottomWidth: 2 }}>
    <TextInput
    style={[styles.textInputDecor, { textAlign: 'center' }, {justifyContent: 'flex-end'}]}
    placeholder={this.state.goal}
    placeholderTextColor='black'
    returnKeyType='done'
    numberOfLines={1}
    placeholderTextColor='grey'
    onChangeText={(goal) => this.setState({ goal })}
    value={this.state.goal}
    onEndEditing={this.onSetProgress.bind(this)}
    onSubmitEditing={this.onSetProgress.bind(this)}
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
    <Text style={styles.modalHeading}> The Date </Text>
    <View style={{padding: 5}}>
    <DatePickerIOS
    minimumDate={this.props.date}
    style={styles.date}
    date={this.state.date}
    mode='date'
    onDateChange={this.onDateChange}
    />
    <View style={styles.button}>
    <Button
    onPress={this.setdateModal.bind(this, false)}
    title='Confirm Date'
    color='black'
    />
    </View>
    </View>
    </View>
    </View>
    </Modal>
    <View style={{ margin: 30, justifyContent: 'flex-end', backgroundColor: '#f9f6b8' }}>
    <Button
    onPress={this.appendAssignment.bind(this)}
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
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    backgroundColor: 'white'
  },

  date: {
    height: 180,
    backgroundColor: 'white',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  textInputDecor: {
    textDecorationColor: 'black',
    fontWeight: 'bold',
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
    // fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',

  },
  input: {
    borderColor: '#f9f6b8',
    borderWidth: 1,
    height: 40,
    borderBottomColor: 'grey',
    borderStyle: 'solid'
  },
  button: {
    borderTopColor: 'grey',
    borderTopWidth: 1,
    backgroundColor: '#f9f6b8'
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
module.exports = AssignmentEdit;
