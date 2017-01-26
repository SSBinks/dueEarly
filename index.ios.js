/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} from 'react-native';

const Homescreen = require('./components/Homescreen');
// const Pic = require('./util/sticky-notes.jpg');

class dueEarly extends Component {
  render() {
    return (
      <NavigatorIOS
      initialRoute={{
        navigationBarHidden: true,
        component: Homescreen,
        title: 'Home',
      }}
      style={{ flex: 1 }}
      />
    );
  }
}


AppRegistry.registerComponent('dueEarly', () => dueEarly);
