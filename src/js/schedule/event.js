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
import {expandEventAction, registerEventDomAction, startShiftPlanEdgeAction} from './schedule-reducers-actions'
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';

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
    let topShiftButton = <RaisedButton label="Shift start" onTouchTap={this.props.onStartShift(this.props.id, 'top')} primary={true}/>
    let bottomShiftButton = <RaisedButton label="Shift end" onTouchTap={this.props.onStartShift(this.props.id, 'bottom')} primary={true}/>

    if (this.props.shiftTop) {
      topShiftButton = <RaisedButton label="Cancel" secondary={true}/>
    }
    if (this.props.shiftBottom) {
      bottomShiftButton = <RaisedButton label="Cancel" secondary={true}/>
    }

    return (
      <View>
        {this.state.expanded && topShiftButton}
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
        {this.state.expanded && bottomShiftButton}
      </View>
    )
  }
}

function mapStateToProps(state: State, ownProps) {
  // const self = state.appState.events.find(e => (e.id === ownProps.id))
  const action = state.appState.editEventMode.action
  const activeEditMode = action && state.appState.editEventMode.eventId === ownProps.id
  let editProps = {}
  // console.log("event, props, shifting", action, activeEditMode, state.appState.editEventMode)
  if (activeEditMode) {
    editProps = {
      shiftTop: action === 'shift-top',
      shiftBottom: action === 'shift-bottom'
    }
  }
  return Object.assign({}, ownProps, editProps)
}

function mapDispatchToProps(dispatch) {
  return {
    onStartShift: (eventId, shiftEdge) => () => {
      dispatch(startShiftPlanEdgeAction(eventId, shiftEdge))
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
