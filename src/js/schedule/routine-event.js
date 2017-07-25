/**
 * @flow
 */


import React from "react";
import {View, StyleSheet, Text} from "react-native";
import {minutesToDisplayTime} from "../display-helpers"
import TimeLine from './timeline'
import {DEFAULT_ROUTINE_COLOR} from '../color-constants'
import {eventStyles} from './schedule-types-constants'

export default RoutineEvent = (props) => {
  return (
    <View style={eventStyles.outerContainer}>
      <View style={[eventStyles.colorBar, {backgroundColor: props.color ? props.color : DEFAULT_ROUTINE_COLOR}]}></View>
      <View style={eventStyles.innerContainer}>
        <View>{props.title}</View>
        <TimeLine active={false}/>
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
