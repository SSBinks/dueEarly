'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
  DatePickerIOS,
  Button,
  ListView,
  PickerIOS,

} from 'react-native';

const moment = require('moment');
const PickerItemIOS = PickerIOS.Item;

const ASSIGNMENT_TYPES = {
  default: {
    type: '',
    progress: 0
  },
  reading: {
    type: 'Reading',
    progress: 10
  },
  draft: {
    type: 'Draft',
    progress: 55
  },
  termPaper: {
    type: 'Term Paper',
    progress: 30
  },

  midterm: {
    type: 'Midterm',
    progress: 20
  },
  final: {
    type: 'Final',
    progress: 40
  },
  exam: {
    type: 'Exam',
    progress: 40
  },
  presentation: {
    type: 'Presentation',
    progress: 90
  },
  personal: {
    type: 'Personal Project',
    progress: 20
  }
};

class Course extends Component {
  static defaultProps = {
    date: new Date(),
  };
  constructor(props) {
    super(props);
    this.dailyTask = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.assignment = [];
    this.state = {
      assignments: this.assignment,
      date: this.props.date,
      dataSource: this.dailyTask.cloneWithRows(this.assignment),
      dateModal: false,
      typeModal: false,
      deliverable: 'default'
    };
    console.log('This is the date: ' + this.state.date)
  }
  onDateChange = (date) => {
    console.log('Date is a changin' + date);
    this.setState({ date: date });
  };
  //Modal setting!
  setdateModal(visible, object) {
    console.log('This is the first thing:' + visible);
    console.log('This is the second thing:' + object);
    this.setState({ dateModal: visible });
    if (visible === false) {
      this.dateAssignments();
    }
  }

  setTypeModal(visible, object) {
    this.setState({ typeModal: visible });
    if (visible === false) {
      this.categoryAssignments();
    }
  }

  categoryAssignments(){
    console.log("HIIIII");
    const category = ASSIGNMENT_TYPES[this.state.deliverable].type;
    const url = 'http://www.whats-due.com/assign/category/' + category;
    console.log("The category is " + category);
    console.log( 'this is the url ' + url);
    fetch(url, {
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.assignment = responseJson;
      console.log("Let's go to the Assignment!" + this.assignment);
      this.setState({ assignments: this.assignment, dataSource: this.dailyTask.cloneWithRows(this.assignment) });
      return this.assignment;
    })
    .catch((error) => {
      console.error("You don't want zero problems big fella" + error);
    });
  }

  dateAssignments() {
    console.log("HIIIII");
    const today = moment(this.state.date).format('MM-DD-YYYY');
    const url = 'http://www.whats-due.com/assign/' + today;
    console.log("Today is " + today);
    console.log( 'this is the url ' + url);
    fetch(url, {

    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.assignment = responseJson;
      console.log("Let's go to the Assignment!" + this.assignment);
      this.setState({ assignments: this.assignment, dataSource: this.dailyTask.cloneWithRows(this.assignment) });
      return this.assignment;
    })
    .catch((error) => {
      console.error("You don't want zero problems big fella" + error);
    });
  }
  renderRow(rowData) {
    if (rowData.title === undefined) {
      return (
        <View>
        <Text> Nothing to Show </Text>
        </View>
      );
    }

    return (
      <View>
      <TouchableHighlight
      underlayColor='#dddddd'
      // onHideUnderlay={this._onUnhighlight}
      // onShowUnderlay={this._onHighlight}
      // onPress={this.setModalVisible.bind(this, true, rowData)}
      >
      <View style={styles.rowContainer} >
      <View style={styles.textContainter}>
      <Text
      style={styles.toDo}
      numberOfLines={1}
      >{rowData.title}
      </Text>
      </View>
      </View>
      </TouchableHighlight>
      </View>
    );
  }


  render() {
    const modalBackgroundStyle = {
      backgroundColor: this.state.typeModal ? 'rgba(0, 0, 0, 0.5)' : 'white',
    };
    return (

      <View style={styles.container}>
      <View style={{ marginBottom: 25 }} >
      <Text style={{ fontWeight: 'bold', fontSize: 20, fontFamily: 'ChalkboardSE-Bold' }} >
      I am looking for my task by ...
      </Text>
      </View>

      <View style={styles.topMenu}>
      <TouchableHighlight>
      <View style={{ height: 80, width: 140, alignSelf: 'center' }}>
      <View style={{ backgroundColor: 'grey', borderRadius: 30, flex: 1, justifyContent: 'center' }}>
      <Text onPress={this.setTypeModal.bind(this, true)} style={{ textAlign: 'center', fontWeight: 'bold' }}> Category </Text>
      </View>
      </View>
      </TouchableHighlight>

      <TouchableHighlight>
      <View style={{ height: 80, width: 140, alignSelf: 'center' }}>
      <View
      style={{ backgroundColor: 'grey', borderRadius: 30, flex: 1, justifyContent: 'center' }}
      >
      <Text
      style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}
      onPress={this.setdateModal.bind(this, true)}
      > Date </Text>
      </View>
      </View>
      </TouchableHighlight>
      </View>

      <Modal
      visible={this.state.dateModal}
      animationType='fade'
      transparent={true}
      >
      <View style={[styles.container, { justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
      <View style={{ backgroundColor: 'white', justifyContent: 'center' }}>
      <Text style={styles.modalHeading}> Choose a Date </Text>
      <View style={{ padding: 5 }}>
      <DatePickerIOS
      minimumDate={this.props.date}
      style={styles.date}
      date={this.state.date}
      mode='date'
      onDateChange={this.onDateChange}
      />
      <View style={styles.button}>
      <Button
      onPress={this.setdateModal.bind(this, false)}
      title='Confirm Date'
      color='white'
      />
      </View>
      </View>
      </View>
      </View>
      </Modal>
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
      <ListView
      style={{ marginTop: 1, paddingTop: 1 }}
      enableEmptySections={true}
      automaticallyAdjustContentInsets={false}
      dataSource={this.state.dataSource}
      renderRow={this.renderRow.bind(this)}
      />
      </View>


      {/* TYPE MODAL*/}
      <Modal
      visible={this.state.typeModal}
      animationType='fade'
      transparent={true}
      >
      <View style={[styles.container, { justifyContent: 'center' }, modalBackgroundStyle]}>
      <View style={{ backgroundColor: 'white' }}>
      <View style={{ paddingTop: 5 }}>
      <Text style={styles.modalHeading}> Assignment Type </Text>
      </View>
      <PickerIOS
      itemStyle={styles.picker}
      selectedValue={this.state.deliverable}
      onValueChange={(deliverable) => this.setState({ deliverable })}

      >
      {Object.keys(ASSIGNMENT_TYPES).map((deliverable) => (
        <PickerItemIOS
        key={deliverable}
        value={deliverable}
        label={ASSIGNMENT_TYPES[deliverable].type}
        />
      )
      // console.log(this.state.course);
    )}
    </PickerIOS>
    <View style={styles.button}>
    <Button
    onPress={this.setTypeModal.bind(this, false)}
    title='Choose Assignment'
    color='white'
    />
    </View>
    </View>
    </View>

    </Modal>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65,
    padding: 10,
    // height: null,
    // width: null,
    backgroundColor: 'white'
  },
  topMenu: {
    borderBottomColor: 'white',
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalHeading: {
    // fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',

  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 30,
    // width: 150,
  },
  textContainter: {
    flex: 1,
    padding: 3,
    backgroundColor: '#caf9db',
    height: 70,
    borderRadius: 25,
    justifyContent: 'center'
  },
  toDo: {
    fontFamily: 'Chalkboard SE',
    textAlign: 'center'
  },
  button: {
    borderTopColor: 'grey',
    borderTopWidth: 1,
    backgroundColor: 'grey'
  },
});
module.exports = Course;
