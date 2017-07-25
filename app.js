/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {routineApp} from './src/js/redux/root-reducers'
import {testData} from './src/js/redux/state'
import AppDisplay from './src/js/app-display'
import {Text} from 'react-native'
import injectTapEventPlugin from 'react-tap-event-plugin';
import {initializeAction, refreshAction} from './src/js/schedule/schedule-reducers-actions'

injectTapEventPlugin();

const store = createStore(routineApp, testData);
store.dispatch(initializeAction())
store.dispatch(refreshAction())

export default class ExampleApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppDisplay/>
      </Provider>
    );
  }
}