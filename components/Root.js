//This file will eventually control the state of the application and the navigation

import React, { Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';
var Dashboard = require('./Dashboard');
class Root extends Component {
  render(){
          console.log( "I am getting to the root!");
    return (
      <View style={styles.container} >
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cddbf2',
  },
  titles: {
    fontSize: 20,
    // textAlign: 'center',
    margin: 10,
    fontFamily: 'Chalkboard SE',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
module.exports = Root;
