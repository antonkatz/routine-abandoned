/**
 * @flow
 */


import React, {Component} from "react";
import {View, StyleSheet, Text, TouchableHighlight} from "react-native";
import {minutesToDisplayTime} from "../display-helpers"
import TimeLine from './timeline'
import {DEFAULT_ROUTINE_COLOR} from '../color-constants'
import {Event as EventType} from './schedule-types-constants'
import {connect} from 'react-redux'
import {expandEventAction} from './schedule-reducers-actions'

class EventComponent extends Component {
  props: EventType

  render() {
    return (
      <View style={styles.outerContainer}>
        <View
          style={[styles.colorBar, {backgroundColor: this.props.color ? this.props.color : DEFAULT_ROUTINE_COLOR}]}></View>
        <TouchableHighlight onPress={this.props.onToggleExpand(this.props.id)}>
          <View style={styles.innerContainer}>
            <View>{this.props.title}</View>
            <View>{minutesToDisplayTime(this.props.duration)}</View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onToggleExpand: (eventId) => () => {
      expandEventAction(eventId)
    }
  }
}

const Event = connect((s, ownProps) => (ownProps), mapDispatchToProps)(EventComponent)
export default Event

const styles = StyleSheet.create({
  outerContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: "flex-start"
  },
  innerContainer: {
    flexShrink: 1,
    flexGrow: 1,
  },
  colorBar: {
    flexShrink: 1,
    flexGrow: 0,
    width: 10,
    borderColor: "black",
    borderStyle: "solid"
  }
})
