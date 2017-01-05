/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/
// 'use strict'
import React, { Component } from 'react';
import{
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';
var Root = require('./components/Root');

class dueEarly extends Component {
  render(){
    return (
      <NavigatorIOS style={styles.container}
      barTintColor='#000'
      titleTextColor='#fff'
      initialRoute={{
        title: 'Due: Early',
        component: Root,
      }}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAF6FF'
  }
});



AppRegistry.registerComponent('dueEarly', () => dueEarly);
