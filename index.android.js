/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Router from './src/router';
export default class RNAWebRTCApp extends Component {
  constructor() {
    super();
    console.disableYellowBox = true;
  }
  render() {
    return (
      <Router />
    );
  }
}


AppRegistry.registerComponent('RNAWebRTCApp', () => RNAWebRTCApp);
