/**
 * Managing routines and sub-routines (their prototypes, not actual events)
 */

import React, {PureComponent} from "react";
import {View, StyleSheet, Text, Button} from "react-native";
import {wrapWithLink} from './navigation/helpers'

export default class CreateRoutine extends PureComponent {

  render() {
    return (
      <View>
        this is a create routine view
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 200,
    // backgroundColor: 'black'
    // alignSelf: 'flex-start'
  },
  innerContainer: {
    // flexWrap: 'no-wrap',
    // flexDirection: 'column'
  }
})