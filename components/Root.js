//This file will eventually control the state of the application and the navigation

import React, { Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';
var moment = require('moment');
var now = moment().format("dddd MMMM Do YYYY");
var Dashboard = require('./Dashboard');
class Root extends Component {
  render(){
    console.log( "I am getting to the root!");
    return (
      <View style={styles.container} >
      <View style={styles.head} >
      <Text style={styles.time}>
      {now}
      </Text>
      </View>
      <Text style={styles.titles}>

      Hello Shari!
      </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65,
    padding: 10,
    backgroundColor: '#cddbf2',
  },
  titles: {
    fontSize: 20,
    // textAlign: 'center',
    margin: 10,
    fontFamily: 'Chalkboard SE',
  },
  head: {
      height: 25,
      left: 10
  },
  time: {
    fontFamily: 'Chalkboard SE',
    fontSize: 15,
    fontWeight: 'bold',

  },
});
module.exports = Root;
