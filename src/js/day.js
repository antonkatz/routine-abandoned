/**
 * A single day of the week in the schedule
 */
import React, {PureComponent} from "react";
import {View, StyleSheet, Text} from "react-native";

export default class Day extends PureComponent {
  render() {
    return (
       <View style={[styles.container, this.props.style]}>
        <Text>
          test
        </Text>
       </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    minWidth: 100,
    // backgroundColor: 'black',
    borderLeftWidth: 1,
    borderLeftColor: 'black',
    borderStyle: 'solid'
  }
})