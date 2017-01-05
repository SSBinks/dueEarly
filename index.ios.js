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
      <NavigatorIOS
      style={styles.container}
      initialRoute={{
        title: 'Due: Early',
        component: Root,
      }}/>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e8f4'
  }
});

// AppRegistry.registerComponent('dueEarly', () => DueEarly);
//
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
//
// export default class dueEarly extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Hello Shari!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

AppRegistry.registerComponent('dueEarly', () => dueEarly);
