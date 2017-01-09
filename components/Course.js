'use strict';
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

class Course extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Text>
      Add ya Courses Here
      </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#838487',
    flex: 1,
    marginTop: 65,
    padding: 5,
  }
});

module.exports = Course;
