//This file will eventually control the state of the application and the navigation

import React, { Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  NavigatorIOS,
  TouchableHighlight
} from 'react-native';
var moment = require('moment');
var now = moment().format("dddd MMMM Do YYYY");
var Dashboard = require('./Dashboard');
class Root extends Component {
  constructor(props){
    super(props);
    const dailyTask = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: dailyTask.cloneWithRows([
        {assignment: 'propsal', course: 'Intro to losing my shit', due: 'today'},
        {assignment: 'blank sheet of paper', course: 'Giving up 101', due: 'today'},
        {assignment: 'get hair done', course: 'Marrying Rich and Other Alternatives', due: 'today'}
      ])
    };
  }
  renderRow(rowData, sectionID, rowID){
    return(
      <TouchableHighlight
      underlayColor='#dddddd'>
      <View>
      <View style={styles.rowContainer}>
      <View style={styles.textContainter}>
      <Text style={styles.toDo}
      numberOfLines={2}> Assignment: {rowData.assignment} {'\n'}Course: {rowData.course}</Text>
      </View>
      </View>
      </View>
      </TouchableHighlight>
    );
  }
  render(){
    console.log( "I am getting to the root!");
    return (
      <View style={styles.container} >
      <Text style={styles.titles}>
      Whats Due?
      </Text>
      <View style={styles.head} >
      <Text style={styles.time}>
      Today: {now}
      </Text>
      </View>
      <ListView
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
    height: 25,
    left: 10
  },
  time: {
    fontFamily: 'Chalkboard SE',
    fontSize: 12,
    fontWeight: 'bold',

  },
  toDo: {
    fontFamily: 'Chalkboard SE',
    // backgroundColor: 'pink',
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
  },
});
module.exports = Root;
