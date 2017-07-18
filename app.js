/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import Schedule from './src/js/schedule.js'
import RoutineNav from './src/js/navigation/routinesnav'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {routineApp} from './src/js/redux/reducers'
import {testData} from './src/js/redux/store'

const store = createStore(routineApp, testData);

export default class ExampleApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <ScrollView style={styles.container} contentContainerStyle={styles.innerContainer} horizontal={true}>
          <RoutineNav/>
          <Schedule/>
        </ScrollView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});