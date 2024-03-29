/**
 * The timeline on the side of the schedule
 *
 * - should have a zoom level
 * - should have a view filter
 * - should be able to nest itself in other timelines
 * - should be able to collapse
 *
 * @flow
 */

import React, {PureComponent} from "react";
import {View, StyleSheet, Text} from "react-native";
import Event from './event'
import RoutineEvent from './routine-event'
import AlternativeEvent from './alternative-event'
import {dateSorter, shiftEvent} from '../helpers'
import {Routine} from '../redux/state'
import {displayTimePoint} from "../display-helpers"
import {connect} from 'react-redux'
import {convertConflictsIntoAlternatives, fillNonEventTime} from './schedule-data-logic'
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Icon from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';


const TimeBinComponent = (props: {text: string, children: any, style: ?any}) => {

  if (props.displayTimePicker) {
    console.log("bin with time picker", props.time)
  }

  const fullStyle = [styles.bin]
  if (props.style) {
    fullStyle.push(props.style)
  }
  const icon = <Icon style={{height: "1em", width: "auto"}}/>

  const onTimePick = (event, date) => {
    props.onTimePick(date)
  }

  return (
    <View style={fullStyle}>
      <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: "space-between", alignItems: 'flex-end'}}>
        {!props.displayTimePicker && <Text>{props.text}</Text>}
        {props.displayTimePicker && <View>
          <TimePicker
            id={props.text}
            autoOk={true}
            format="24hr"
            value={props.time}
            onChange={onTimePick}
          />
        </View>}

        {props.createPlanMode && props.onCreateNew && <RaisedButton icon={icon} primary={true}
                                                                    style={{flexGrow: 0, flexShrink: 1, minWidth: 0, height: 'auto', lineHeight: 'unset'}}
                                                                    onTouchTap={props.onCreateNew}/>}
      </View>
      <View>
        {props.children}
      </View>
    </View>
  )
}

function mapStateToProps(state: State, ownProps) {
  const props = Object.assign({}, ownProps, {createPlanMode: state.appState.createPlanMode.on})
  return props
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

const TimeBin = connect(mapStateToProps)(TimeBinComponent)
export default TimeBin

const styles = StyleSheet.create({
  bin: {
    flexShrink: 1,
    flexGrow: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  binContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  nowBin: {
    borderStyle: 'solid',
    borderColor: 'red',
    borderTopWidth: 3
  },
  marker: {
    height: 3,
    backgroundColor: 'red'
  }
})