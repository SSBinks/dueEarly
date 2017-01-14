/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/
// 'use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight,
  NavigatorIOS
} from 'react-native';

const Homescreen = require('./components/Homescreen');
const Pic = require('./util/sticky-notes.jpg');

class dueEarly extends Component {
  // onTrigger() {
  //   this.props.navigator.push({
  //     title: 'Whats Due?',
  //     component: Homescreen,
  //   });
  // }
  render() {
    return (
      <NavigatorIOS
      initialRoute={{
        component: Homescreen,
        title: 'Home',
      }}
      style={{flex: 1}}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Chalkboard SE',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  }
});


AppRegistry.registerComponent('dueEarly', () => dueEarly);
