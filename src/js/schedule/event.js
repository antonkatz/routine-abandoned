/**
 * @flow
 */


import React from "react";
import {View, StyleSheet, Text} from "react-native";

export default Event = (props) => {
  return (
    <View style={styles.outerContainer}>
      <View style={[styles.colorBar, {backgroundColor: props.color}]}></View>
      <View style={styles.innerContainer}>
        <View>{props.title}</View>
        <View>{props.duration}</View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    display: 'flex',
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: "flex-start"
  },
  innerContainer: {
    flexShrink: 1
  },
  colorBar: {
    // flexBasis: '100%',
    flexShrink: 1,
    width: 5,
    // height: '100%',
    borderWidth: 1,
    borderColor: "red",
    borderStyle: "solid"
  }
})
