//This file will eventually control the state of the application and the navigation

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Modal,

} from 'react-native';

const moment = require('moment');

const now = moment().format('dddd MMMM Do YYYY');
const Dashboard = require('./Dashboard');
const Course = require('./Course');

class Root extends Component {

  constructor(props) {
    super(props);
    console.log("First?");
    this.assignment = [];
    this.getCurrentAssignment();
    this.dailyTask = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    console.log("Re-check the assignment" + this.assignment);

    this.state = {
      assignments: this.assignment,
      dataSource: this.dailyTask.cloneWithRows(this.assignment),
      active: false,
      modalVisible: false,
      transparent: false,
    };
  }

  onAddPressed() {
    this.props.navigator.push({
      title: 'Schedule An Assignment',
      component: Dashboard,
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
  setModalVisible( num, visible)  {
    console.log("Is it visible " + visible);
      console.log("This was pressed " + num);
    this.setState({ modalVisible: num });
  };
  _toggleTransparent = () => {
    this.setState({ transparent: !this.state.transparent });
  };
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
    // console.log("This is the current row" + rowData.id);

    return (
      <View>
      <TouchableHighlight
      underlayColor='#dddddd'
      // onHideUnderlay={this._onUnhighlight}
      // onShowUnderlay={this._onHighlight}
      onPress={this.setModalVisible.bind(this, true)}
      >
      <View style={styles.rowContainer} >
      <View style={styles.textContainter}>

      <Text
      style={styles.toDo}
      numberOfLines={2}
      >Assignment: {rowData.title}
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
    var innerContainerTransparentStyle = this.state.transparent
    ? {backgroundColor: '#fff', padding: 20 }
    : null;
    var activeButtonStyle = {
      backgroundColor: '#ddd'
    };
    console.log('I am getting to the render!');
    return (
      <View style={styles.container} >
      <Modal
      transparent={this.state.transparent}
      visible={this.state.modalVisible}
      >
      <View style={[styles.container, modalBackgroundStyle]}>
      <Text> Hi Chari </Text>
      </View >
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
      <Text style={styles.titles}>
      Whats Due?
      </Text>
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
    backgroundColor: '#838487',
  },
  titles: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
    fontFamily: 'ChalkboardSE-Bold',
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
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    // width: 150,
  },
  textContainter: {
    flex: 1,
    padding: 15,
    backgroundColor: '#caf9db',
    height: 70,
    borderRadius: 25,
  },
  button: {
    height: 50,
    width: 70,
    alignSelf: 'stretch',
    backgroundColor: '#f9f6b8',
    borderRadius: 10,
    padding: 15,

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

module.exports = Root;
