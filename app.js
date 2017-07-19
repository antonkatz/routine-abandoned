/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {routineApp} from './src/js/redux/reducers'
import {testData} from './src/js/redux/store'
import AppDisplay from './src/js/app-display'
import {Text} from 'react-native'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const store = createStore(routineApp, testData);

export default class ExampleApp extends Component {
  render() {
    return (
      <Provider store={store}>
        {/*<Text>Test</Text>*/}
        <AppDisplay/>
      </Provider>
    );
  }
}