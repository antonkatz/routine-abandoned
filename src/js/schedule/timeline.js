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
import RaisedButton from 'material-ui/RaisedButton';
import TimeBin from "./time-bin"
import AddIcon from 'material-ui/svg-icons/content/add';
import { withRouter } from 'react-router'
import {createPlanAction} from './schedule-reducers-actions'
import TimeShifter from './time-shifter'

export type TimeLineProps = {
  startTime: Date, endTime: Date, events: Array<Event>, routines: Array<Routine>, timeLineId: ?number
}

class TimeLineComponent extends React.Component {
  props: TimeLineProps

  constructor(props) {
    super(props)
    this.state = {now: new Date()}
  }

  componentDidMount() {
    if (this.props.isCurrent) {
      this.interval = setInterval(() => {
        this.setState((old) => (Object.assign({}, old, {now: new Date()})))
      }, 1000 * 60)
    }
    if (this.props.matchOffset) {
      const elem = ReactDOM.findDOMNode(this)
      const selfOffset = elem.getBoundingClientRect().top
      const offsetBy = this.props.matchOffset - selfOffset
      elem.style.top = "calc(" + offsetBy + "px - 1em)"
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  getStartTime(): Date {
    return this.props.startTime
  }

  getEndTime(): Date {
    return this.props.endTime
  }

  /** @returns array of time points at which to put markers */
  getTimePoints(events: Array<Event>): Array<Date> {
    const timeLineStartTime = this.getStartTime()
    let points = events.map(e => (
      e.dateTimeStart
    ))
    if (points.findIndex(p => {
        return p.valueOf() === timeLineStartTime.valueOf()
      }) === -1) {
      points = [this.getStartTime(), ...points]
    }
    points.push(this.getEndTime())
    points = points.sort(dateSorter)
    return points;
  }

  render() {
    // slitting an event into two, for display purposes (showing current time marker)
    const now = this.state.now
    const events = [...this.props.events]
    const currentEvent = events.findIndex(e => {
      // splitting in a display pleasing way -- at least a minute has passed
      // starts before now, ends after now
      return e.dateTimeStart.valueOf() <= (now.valueOf() - 60 * 1000) && e.dateTimeEnd.valueOf() >= now.valueOf()
    })
    if (currentEvent > -1) {
      const e = events[currentEvent]
      const topEvent = shiftEvent(e, e.dateTimeStart, now)
      const bottomEvent = shiftEvent(e, now, e.dateTimeEnd)
      events.splice(currentEvent, 1, topEvent, bottomEvent)
    }

    const timePoints = this.getTimePoints(events)
    const sortedEvents = events.sort((a, b) => (
      a.dateTimeStart.valueOf() - b.dateTimeStart.valueOf()
    ))
    //todo sort the routines
    let sortedRoutines = []
    if (this.props.routines) {
      sortedRoutines = this.props.routines
    }

    const bins = []
    for (let i = 0; i < timePoints.length - 1; i++) {
      const start = timePoints[i]
      const end = timePoints[i + 1]
      const eventsInBin = sortedEvents.filter(e => (e.dateTimeStart.valueOf() >= start.valueOf() &&
      e.dateTimeEnd <= end.valueOf()))
      const isNow = start.valueOf() <= now.valueOf() && end.valueOf() > now.valueOf()
      bins.push(
        <TimeBin style={isNow ? styles.nowBin : null} key={start.valueOf() + "" + end.valueOf()}
        text={displayTimePoint(start)} onCreateNew={this.props.onCreateNew(start)}>
            {eventsInBin.map(e => {
              if (e.type === 'single') {
                return <Event key={e.id} {...e} timeLineId={this.props.timeLineId}/>
              } else if (e.type == 'alternative') {
                return <AlternativeEvent key={e.id} {...e} timeLineId={this.props.timeLineId}/>
              }
            })}
        </TimeBin>
      )
    }
    bins.push(
      <TimeBin key="end-of-day" text={displayTimePoint(timePoints[timePoints.length-1])} />
    )

    if (sortedRoutines.length > 0) {
      bins.push(
        <TimeBin key="routines" text="routines">
            {sortedRoutines.map(r => (
              <RoutineEvent key={r.id} {...r}/>
            ))}
        </TimeBin>
      )
    }

    return (

      <View style={{display: 'flex', flexDirection: "row", flexWrap: 'nowrap'}}>
        <TimeShifter timeLineId={this.props.timeLineId} day={this.props.startTime} start={this.props.startTime}
        end={this.props.endTime} />
        <View style={styles.binContainer}>
          {bins}
        </View>
      </View>
    )

  }
}

function mapStateToProps(state: State, ownProps) {
  const withAlternatives = convertConflictsIntoAlternatives(ownProps.events)
  const freeTime = fillNonEventTime(withAlternatives, ownProps.startTime, ownProps.endTime)

  return Object.assign({}, ownProps, {events: [...withAlternatives, ...freeTime]})
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onCreateNew: (time: Date) => () => {
      dispatch(createPlanAction(time, ownProps.timeLineId))
    }
  }
}


const TimeLine = connect(mapStateToProps, mapDispatchToProps)(TimeLineComponent)
export default TimeLine

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