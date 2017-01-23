'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  PickerIOS,
  DatePickerIOS,
  TouchableHighlight,
  Modal,
  AlertIOS,
  Button,
  PushNotificationIOS
} from 'react-native';

class AssignmentEdit extends Component {
  constructor(props) {
    super(props)

  }
  _sendNotification() {
    require('RCTDeviceEventEmitter').emit('remoteNotificationReceived', {
      aps: {
        alert: 'Sample notification',
        badge: '+1',
        sound: 'default',
        category: 'REACT_NATIVE'
      },
    });
  }

  _sendLocalNotification() {
    require('RCTDeviceEventEmitter').emit('localNotificationReceived', {
      aps: {
        alert: 'Sample local notification',
        badge: '+1',
        sound: 'default',
        category: 'REACT_NATIVE'
      },
    });
  }

  _onRegistered(deviceToken) {
    AlertIOS.alert(
      'Registered For Remote Push',
      `Device Token: ${deviceToken}`,
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  _onRegistrationError(error) {
    AlertIOS.alert(
      'Failed To Register For Remote Push',
      `Error (${error.code}): ${error.message}`,
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  _onRemoteNotification(notification) {
    AlertIOS.alert(
      'Push Notification Received',
      'Alert message: ' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  _onLocalNotification(notification){
    AlertIOS.alert(
      'Local Notification Received',
      'Alert message: ' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  componentWillMount() {
    PushNotificationIOS.addEventListener('register', this._onRegistered);
    PushNotificationIOS.addEventListener('registrationError', this._onRegistrationError);
    PushNotificationIOS.addEventListener('notification', this._onRemoteNotification);
    PushNotificationIOS.addEventListener('localNotification', this._onLocalNotification);

    PushNotificationIOS.requestPermissions();
  }

  componentWillUnmount() {
    PushNotificationIOS.removeEventListener('register', this._onRegistered);
    PushNotificationIOS.removeEventListener('registrationError', this._onRegistrationError);
    PushNotificationIOS.removeEventListener('notification', this._onRemoteNotification);
    PushNotificationIOS.removeEventListener('localNotification', this._onLocalNotification);
  }

  render() {
    return (
      <View style={styles.container}>
      <Button
         onPress={this._sendNotification}
         label="Send fake notification"
         title='this is the send'
      />
      <Button
      onPress={this._sendLocalNotification}
      label="Send fake local notification"
      title='Hello Shar shar'
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingTop: 40,
    backgroundColor: 'white',
  },
});
module.exports = AssignmentEdit;
