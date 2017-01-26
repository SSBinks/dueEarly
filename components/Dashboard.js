//This file will eventually control the state of the application and the navigation

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Modal,
  Slider,
  AlertIOS

} from 'react-native';

const moment = require('moment');
const AssignmentEdit = require('./AssignmentEdit');

const now = moment().format('dddd MMMM Do YYYY');
const Assignment = require('./Assignment');
const Course = require('./Course');


class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.assignment = [];
    this.getCurrentAssignment();
    this.dailyTask = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.information = {};

    this.state = {
      assignments: this.assignment,
      dataSource: this.dailyTask.cloneWithRows(this.assignment),
      active: false,
      modalVisible: false,
      transparent: false,
      info: this.information,
      statusColor: '#f9f6b8'
    };
  }


  componentWillReceiveProps() {
    this.getCurrentAssignment();
  }

  onAddPressed() {
    this.props.navigator.push({
      title: 'Schedule An Assignment',
      component: Assignment,
      tintColor: 'black',
    });
  }

  onClassesPressed() {
    this.props.navigator.push({
      title: 'Search',
      component: Course,
      tintColor: 'black',
    });
  }

  onInProgressPressed() {
    console.log('You want to see what is in Progress yay!');
  }

  setModalVisible(visible, rowData, other) {
    this.setState({ transparent: !this.state.transparent });
    this.setState({ modalVisible: visible });
    this.setState({ info: rowData });
    this.appendAssignment();
  }


  appendAssignment() {
    // if( this.state.info._id === undefined) {
    //   this.updateProgress();
    // }
    console.log('This is the percent' + this.state.info.progress);
    console.log('I am getting here!');
    const id = this.state.info._id;
    fetch('http://www.whats-due.com/assign/update/' + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.info.text,
        dueDate: this.state.info.date,
        complete: this.state.info.complete,
        categories: this.state.info.deliverable,
        part: this.state.info.parts,
        completionAmount: this.state.info.completionAmount,
        goal: this.state.info.goal,
        dailyGoal: this.state.info.dailyGoal
      })
    });
  }
  editAssignment() {
    this.props.navigator.push({
      title: 'Update Me',
      tintColor: 'black',
      component: AssignmentEdit,
      passProps: this.state.info,
    });
  }


  getCurrentAssignment() {
    const url = 'http://www.whats-due.com/';
    fetch(url, {

    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.assignment = responseJson;
      this.setState({ assignments: this.assignment, dataSource: this.dailyTask.cloneWithRows(this.assignment) });
      return this.assignment;
    })
    .catch((error) => {
      console.error('You dont want zero problems big fella' + error);
    });
  }

  updateProgress() {
    const num = parseInt(this.state.info.completionAmount) / parseInt(this.state.info.goal);
    const percent = num * 100;
    const obj = this.state.info;
    obj.progress = percent;
    this.setState({ info: obj });
  }

  _onLocalNotification(notification) {
    AlertIOS.alert(
      'Local Notification Received',
      'Alert message: ' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  renderRow(rowData) {
    return (
      <View>
        <TouchableHighlight
          underlayColor='#dddddd'
          onPress={this.setModalVisible.bind(this, true, rowData)}
        >
          <View style={styles.rowContainer} >
            <View style={styles.textContainter}>
              <Text
                style={styles.toDo}
                numberOfLines={1}
              >
                {rowData.title}
              </Text>
          </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    const modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff'
    };

    if (parseInt(this.state.info.progress) >= 90){
      var tabColor = { backgroundColor: '#caf9db', padding: 20  }
    }
    else if(parseInt(this.state.info.progress) >= 50) {
      var tabColor = {  backgroundColor: '#f9f6b8', padding: 20  }
    }
    else {
      var tabColor = {backgroundColor: '#ffcccc', padding: 20  }
    }

    return (
      <View
        style={styles.container}
      >
        <Modal
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
        >
          <View style={[styles.container, { justifyContent: 'center' }, modalBackgroundStyle]}>
            <View
              style={[styles.innerContainer, tabColor]}
            >
              <Text
                onPress={this.setModalVisible.bind(this, false)}
                onLongPress={this.editAssignment.bind(this)}
                style={{ fontSize: 15, fontFamily: 'ChalkboardSE-Regular', letterSpacing: 0 }}
              >
                This is Due: {moment(this.state.info.dueDate).utc().format('dddd[,] MMM Do')} {'\n'}
                You are {parseInt(this.state.info.progress).toFixed(0)}% Complete{'\n'}
                Your Daily Goal is: {parseInt(this.state.info.dailyGoal).toFixed(0)} {this.state.info.part}s {'\n'}
                You are currently on {this.state.info.part}: {parseInt(this.state.info.completionAmount).toFixed(0)}
            </Text>
              <View style={{ alignItems: 'stretch', justifyContent: 'center' }}>
                <Slider
                  style={{ height: 50, width: 250 }}
                  minimumTrackTintColor={'white'}
                  value={parseInt(this.state.info.completionAmount)}
                  onValueChange={(value) => {
                    const num = parseInt(this.state.info.completionAmount) / parseInt(this.state.info.goal);
                    const percent = num * 100;
                    const obj = this.state.info;
                    obj.completionAmount = value;
                    obj.progress = percent;
                    this.setState({ info: obj });
                  }}
                  maximumValue={parseInt(this.state.info.goal)}
              />
            </View>
            </View>
          </View>
        </Modal>

        <View
          style={styles.topMenu}
        >
          <TouchableHighlight style={styles.button} underlayColor='#f9f6b8' onPress={this.onInProgressPressed.bind(this)}>
            <Text style={styles.menu} >O O O</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} underlayColor='#f9f6b8' onPress={this.onClassesPressed.bind(this)}>
            <Text style={styles.menu} onPress={this.onClassesPressed.bind(this)}> ^^^</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} underlayColor='#f9f6b8' onPress={this.onAddPressed.bind(this)}>
            <Text style={styles.menu} > + </Text>
          </TouchableHighlight>
        </View>

        <View
        style={styles.head}
        >
          <Text
            style={styles.time}
          >
          Today: {now}
        </Text>
        </View>
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
      <ListView
      style={{  marginTop: 1, paddingTop: 1}}
      enableEmptySections={true}
      automaticallyAdjustContentInsets={false}
      dataSource={this.state.dataSource}
      renderRow={this.renderRow.bind(this)}
      />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65,
    padding: 10,
    // height: null,
    // width: null,
    backgroundColor: 'white'
  },
  titles: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
    fontFamily: 'ChalkboardSE-Bold',
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  head: {
    padding: 20,
  },
  time: {
    fontFamily: 'Chalkboard SE',
    fontSize: 15,
    fontWeight: 'bold',
  },
  toDo: {
    fontFamily: 'Chalkboard SE',
    textAlign: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 30,
    // width: 150,
  },
  textContainter: {
    flex: 1,
    padding: 3,
    backgroundColor: '#caf9db',
    height: 70,
    borderRadius: 25,
    justifyContent: 'center'
  },
  button: {
    height: 50,
    width: 70,
    alignSelf: 'stretch',
    backgroundColor: '#f9f6b8',
    borderRadius: 10,
    padding: 15,
    shadowColor: 'black',
    shadowOpacity: 30,

  },
  topMenu: {
    borderBottomColor: 'white',
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menu: {
    textAlign: 'center',
  },

});

module.exports = Dashboard;
