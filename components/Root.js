//This file will eventually control the state of the application and the navigation

import React, { Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  NavigatorIOS
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
        {assignment: 'Into to losing my shit', due: 'today'},
        {assignment: 'Giving up 101', due: 'today'},
        {assignment: 'Marrying Rich and Other Alternatives', due: 'today'}
      ])
    };
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
      renderRow={(rowData) => <Text> {rowData.assignment}</Text>}
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
});
module.exports = Root;
