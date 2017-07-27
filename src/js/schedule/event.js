/**
 * @flow
 */


import React, {Component} from "react";
import {View, StyleSheet, Text, TouchableHighlight} from "react-native";
import {minutesToDisplayTime, displayTimePoint} from "../display-helpers"
import TimeLine from './timeline'
import {DEFAULT_ROUTINE_COLOR} from '../color-constants'
import {Event as EventType} from './schedule-types-constants'
import {connect} from 'react-redux'
import {expandEventAction, registerEventDomAction, moveEventAction} from './schedule-reducers-actions'
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class EventComponent extends Component {
  props: EventType

  constructor() {
    super()
    this.state = {expanded: false}

    this.ownToggleExpand = this.ownToggleExpand.bind(this)
  }

  componentDidMount() {
    if (!this.props.isEtherEvent) {
      this.props.onMount(this.props.id, ReactDOM.findDOMNode(this))
    }
  }

  componentWillUnmount() {
    if (!this.props.isEtherEvent) {
      this.props.onUnmount(this.props.id, ReactDOM.findDOMNode(this))
    }
  }

  ownToggleExpand() {
    // console.log("event toggle expand", this.state.expanded, !this.state.expanded)
    this.props.onToggleExpand(this.props.id, this.props.timeLineId)
    const newState = {expanded: !this.state.expanded}
    // console.log("new", newState)
    this.setState(newState)
    // console.log(this.state.expanded)
  }

  render() {
    return (
      <View>
        <View style={styles.paper}>
          <View
            style={[styles.colorBar, {backgroundColor: this.props.color ? this.props.color : DEFAULT_ROUTINE_COLOR}]}></View>
          <TouchableHighlight onPress={this.ownToggleExpand}>
            <View style={styles.innerContainer}>
              <View>{this.props.title}</View>
              <View>{minutesToDisplayTime(this.props.duration)}</View>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state: State, ownProps) {
  return Object.assign({}, ownProps)
}

function mapDispatchToProps(dispatch) {
  return {
    onStartShift: (eventId, shiftEdge) => () => {
      dispatch(moveEventAction(eventId, shiftEdge))
    },
    onToggleExpand: (eventId, timeLineId) => {
      dispatch(expandEventAction(eventId, timeLineId))
    },
    onMount: (eventId, dom) => {
      dispatch(registerEventDomAction(eventId, dom, false))
    },
    onUnmount: (eventId, dom) => {
      dispatch(registerEventDomAction(eventId, dom, true))
    }
  }
}

const Event = connect(mapStateToProps, mapDispatchToProps)(EventComponent)
export default Event

const styles = StyleSheet.create({
  paper: {
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
