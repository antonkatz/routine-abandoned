/**
 * @flow
 */


import React, {Component} from "react";
import {View, StyleSheet, Text} from "react-native";
import {minutesToDisplayTime} from "../display-helpers"
import TimeLine from './timeline'
import {DEFAULT_ROUTINE_COLOR} from '../color-constants'

export default class Event extends Component {
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
        <View style={styles.innerContainer} onClick={this.toggleExpand}>
          <View>{this.props.title}</View>
          <View>{minutesToDisplayTime(this.props.duration)}</View>
        </View>
        <TimeLine active={this.state.expanded} events={[]} routines={this.props.routines}/>
      </View>
    )
  }
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
