'use strict';
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Modal,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
// import React, { Component } from 'react';
// import { Modal, Text, TouchableHighlight, View } from 'react-native';
class Course extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//       <Text>
//       Add ya Courses Here
//       </Text>
//       </View>
//     );
//   }
// }
//


//
//

  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState( { modalVisible: visible } );
  }
  shariText() {
    console.log('I found Shari!')
    return (
      <View>
      <Text> Shari Shari </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal

          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>
            <ModalDropdown  options={[  <View style={{ width: 40, height: 40 }}>
              <Text> Shari Shari </Text>
              </View>]} >
            <Text> derp </Text>

            </ModalDropdown>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>

            </TouchableHighlight>

          </View>
         </View>
        </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>

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
