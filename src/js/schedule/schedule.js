/**
 * Components containing the days of the week and the timeline
 */

import React, {PureComponent} from "react";
import {View, StyleSheet, Text} from "react-native";
import Week from './week.js'

export default class Schedule extends PureComponent {
  render() {
    return (
       <View style={styles.container}>
         <Week {...this.props}/>
       </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
    // minHeight: '100%'
  },
  timeline: {
    marginRight: 10
  }
})