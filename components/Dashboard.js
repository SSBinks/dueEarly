'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

 class Dashboard extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.welcome}>
      Hello Shari!
      </Text>
      <Text style={styles.instructions}>
      To get started, edit index.ios.js
      </Text>
      <Text style={styles.instructions}>
      Press Cmd+R to reload,{'\n'}
      Still Here!
      Cmd+D or shake for dev menu
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Chalkboard SE',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
module.exports = Dashboard;
