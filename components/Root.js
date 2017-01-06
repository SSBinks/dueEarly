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
      numberOfLines={2}>Assignment: {rowData.assignment} {'\n'}Course: {rowData.course}</Text>
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
      <View
        adjustsFontSizeToFit={true}
        style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
      <TouchableHighlight style={styles.button} underlayColor='#f9f6b8'>
      <Text style={styles.menu}>OOO</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button} underlayColor='#f9f6b8'>
      <Text style={styles.menu}> ^^^</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button} underlayColor='#f9f6b8'>
      <Text style={styles.menu}> + </Text>
      </TouchableHighlight>
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
  menu: {
    textAlign: 'center',

  }
});
module.exports = Root;
