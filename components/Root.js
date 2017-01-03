//This file will eventually control the state of the application and the navigation

import React, { Component} from 'react';
import Dashboard from './Dashboard';
export default class Root extends Component {
  render(){
    return (
      <Dashboard />
    );
  }
}
