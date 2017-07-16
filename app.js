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
import Routines from './src/js/routines.js'
import { StackNavigator } from 'react-navigation';

class ExampleApp extends Component {
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.innerContainer} horizontal={true}>
        <Routines/>
        <Schedule/>
      </ScrollView>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: ExampleApp },
});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);


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
