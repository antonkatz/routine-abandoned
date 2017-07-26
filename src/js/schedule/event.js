/**
 * @flow
 */


import React, {Component} from "react";
import {View, StyleSheet, Text, TouchableHighlight} from "react-native";
import {minutesToDisplayTime} from "../display-helpers"
import TimeLine from './timeline'
import {DEFAULT_ROUTINE_COLOR} from '../color-constants'
import {Event as EventType} from './schedule-types-constants'

export default class Event extends Component {
  props: EventType

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };

    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    this.setState(pState => {
      return {expanded: !pState.expanded}
    })
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <View
          style={[styles.colorBar, {backgroundColor: this.props.color ? this.props.color : DEFAULT_ROUTINE_COLOR}]}></View>
        <TouchableHighlight onPress={this.toggleExpand}>
          <View style={styles.innerContainer}>
            <View>{this.props.title}</View>
            <View>{minutesToDisplayTime(this.props.duration)}</View>
          </View>
        </TouchableHighlight>
        <TimeLine active={this.state.expanded} events={this.props.includes} routines={this.props.routines}
                  startTime={this.props.dateTimeStart} endTime={this.props.dateTimeEnd}/>
      </View>
    )
  }
}

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
