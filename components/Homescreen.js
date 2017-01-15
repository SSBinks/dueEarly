import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const Dashboard = require('./Dashboard');
const Pic = require('../util/sticky-notes.jpg');

class Homescreen extends Component {

  onTrigger() {
    this.props.navigator.push({
      barTintColor: 'white',
      shawdowHidden: true,
      tintColor: 'black',
      translucent: true,
      title: 'Whats Due?',
      component: Dashboard,
    });
  }
  render() {
    return (
      <TouchableHighlight
      style={{ flex: 1 }}
      onPress={this.onTrigger.bind(this)}
      >
      <Image
      source={Pic}
      style={styles.container}
      >
      <View style={styles.center}>
      <Text style={styles.title}>
      Due: Early
      </Text>
      </View>
      </Image>
      </TouchableHighlight>
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

module.exports = Homescreen;
