//This file will eventually control the state of the application and the navigation

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Modal,
  Image

} from 'react-native';

const moment = require('moment');

const now = moment().format('dddd MMMM Do YYYY');
const Assignment = require('./Assignment');
const Course = require('./Course');


class Dashboard extends Component {

  constructor(props) {
    super(props);
    console.log("First?");
    this.assignment = [];
    this.getCurrentAssignment();
    this.dailyTask = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    console.log("Re-check the assignment" + this.assignment);
    this.information = {};
    this.state = {
      assignments: this.assignment,
      dataSource: this.dailyTask.cloneWithRows(this.assignment),
      active: false,
      modalVisible: false,
      transparent: false,
      info: this.information
    };
  }

  onAddPressed() {
    this.props.navigator.push({
      title: 'Schedule An Assignment',
      component: Assignment,
    });
    console.log('You Pressed Add!');
  }

  onClassesPressed() {
    this.props.navigator.push({
      title: 'My Courses',
      component: Course
    });
    console.log('You are trying to see some classes');
  }

  onInProgressPressed() {
    console.log('You want to see what is in Progress yay!' + this.assignment);
  }
  _onHighlight = () => {
    this.setState({ active: true });
  };
  _onUnhighlight = () => {
    this.setState({ active: false });
  };
  setModalVisible(visible, rowData, other) {
    console.log("Is it visible " + visible);
    console.log("This was pressed " + rowData);
    console.log('hopefully this is rowData' + other);
    this.setState({ transparent: !this.state.transparent });
    this.setState({ modalVisible: visible });
    this.setState({ info: rowData })
  }

  getCurrentAssignment() {
    console.log("HIIIII");
    const today = moment().format('MM-DD-YYYY');
    console.log("Today is " + today);
    fetch('http://localhost:8000/assign/' + today)
    .then((response) => response.json())
    .then((responseJson) => {
      this.assignment = responseJson;

      console.log( "Let's go to the Assignment!" + this.assignment);
      this.setState({ assignments: this.assignment, dataSource: this.dailyTask.cloneWithRows(this.assignment) });
      return this.assignment;
    })
    .catch((error) => {
      console.error("You don't want zero problems big fella" + error);
    });
  }


  renderRow(rowData) {
    return (
      <View>
      <TouchableHighlight
      underlayColor='#dddddd'
      // onHideUnderlay={this._onUnhighlight}
      // onShowUnderlay={this._onHighlight}
      onPress={this.setModalVisible.bind(this, true, rowData)}
      >
      <View style={styles.rowContainer} >
      <View style={styles.textContainter}>
      <Text
      style={styles.toDo}
      numberOfLines={1}
      >{rowData.title}
      </Text>
      </View>
      </View>
      </TouchableHighlight>
      </View>
    );
  }

  render() {
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    const innerContainerTransparentStyle = this.state.transparent
    ? { backgroundColor: '#f9f6b8', padding: 20 }
    : null;
    console.log('I am getting to the render!');
    console.log('this is the assignment' + this.state.info.title);
    return (
      <View
      // source={Pic}
      style={styles.container}
      >
        <Modal
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
        >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View
              style={[styles.innerContainer, innerContainerTransparentStyle]}
            >
            <Text onPress={this.setModalVisible.bind(this, false)}>
            Assignment: {this.state.info.title} {'\n'}
            Completion Date: {moment().format('MM-DD-YYYY')} {'\n'}
            Progress: {this.state.info.progress} {'\n'}
            </Text>
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
      <ListView
      enableEmptySections={true}
      style={{ height: 500 }}
      dataSource={this.state.dataSource}
      renderRow={this.renderRow.bind(this)}
      />
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
    alignItems: 'center'
  },
  head: {
    height: 10,
    left: 10,
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
    padding: 15,
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
  }
});

module.exports = Dashboard;
