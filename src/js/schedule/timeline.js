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

export type TimeLineProps = {
  startTime: Date, endTime: Date, events: Array<Event>, active: Boolean, routines: Array<Routine>
}

class TimeLineComponent extends React.Component {
  props: TimeLineProps

  constructor(props) {
    super(props)
    this.state = {now: new Date(), setIntervalId: null}
  }

  componentDidMount() {
    if (this.props.isCurrent) {
      this.interval = setInterval(() => {
        this.setState((old) => (Object.assign({}, old, {now: new Date()})))
      }, 1000 * 60)
    }
  }

  componentWillUnmount() {
    this.interval = false
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
    if (this.props.active === false) {
      return null;
    }

    // slitting an event into two, for display purposes (showing current time marker)
    const now = this.state.now
    const events = [...this.props.events]
    const currentEvent = events.findIndex(e => {
      return e.dateTimeStart.valueOf() <= now.valueOf() && e.dateTimeEnd.valueOf() >= now.valueOf()
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
        text={displayTimePoint(start)}>
            {eventsInBin.map(e => {
              if (e.type === 'single') {
                return <Event key={e.id} {...e}/>
              } else if (e.type == 'alternative') {
                return <AlternativeEvent key={e.id} {...e}/>
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
      <View>
        {bins}
      </View>
    )

  }
}

const TimeBin = (props: {text: string, children: any, style: ?any}) => {
  const fullStyle = [styles.binContainer]
  if (props.style) {
    fullStyle.push(props.style)
  }
  return (
    <View style={fullStyle}>
      <Text>{props.text}</Text>
      <View>
        {props.children}
      </View>
    </View>
  )
}

function mapStateToProps(state: State, ownProps) {
  const withAlternatives = convertConflictsIntoAlternatives(ownProps.events)
  console.log("with alt", withAlternatives)
  const freeTime = fillNonEventTime(withAlternatives, ownProps.startTime, ownProps.endTime)

  return Object.assign({}, ownProps, {events: [...withAlternatives, ...freeTime]})
}

const TimeLine = connect(mapStateToProps)(TimeLineComponent)
export default TimeLine

const styles = StyleSheet.create({
  binContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
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