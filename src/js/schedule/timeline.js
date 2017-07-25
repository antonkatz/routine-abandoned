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
import dateSorter from '../helpers'
import {Routine} from '../redux/store'
import {displayTimePoint} from "../display-helpers"

export type TimeLineProps = {
  startTime: Date, endTime: Date, events: Array<Event>, active: Boolean, routines: Array<Routine>
}

export default class TimeLine extends PureComponent {
  props: TimeLineProps

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
    // now
    // const now = new Date()
    // if (now.valueOf() <= this.getEndTime().valueOf() && now.valueOf() >= this.getStartTime().valueOf()) {
    //   points.push(now)
    // }
    points = points.sort(dateSorter)
    return points;
  }

  render() {
    if (this.props.active === false) {
      return null;
    }

    const timePoints = this.getTimePoints(this.props.events)
    const sortedEvents = this.props.events.sort((a, b) => (
      a.dateTimeStart.valueOf() - b.dateTimeStart.valueOf()
    ))
    //todo sort the routines
    let sortedRoutines = []
    if (this.props.routines) {
      sortedRoutines = this.props.routines
    }

    const bins = []
    console.log(timePoints, "timepoints")
    for (let i = 0; i < timePoints.length - 1; i++) {
      const start = timePoints[i]
      const end = timePoints[i + 1]
      const eventsInBin = sortedEvents.filter(e => (e.dateTimeStart.valueOf() >= start.valueOf() &&
      e.dateTimeEnd <= end.valueOf()))
      bins.push(
        <View style={styles.container} key={start.valueOf() + "" + end.valueOf()}>
          <Text>{displayTimePoint(start)}</Text>
          <View>
            {eventsInBin.map(e => {
              if (e.type === 'single') {
                return <Event key={e.id} {...e}/>
              } else if (e.type == 'alternative') {
                return <AlternativeEvent key={e.id} {...e}/>
              }
            })}
          </View>
        </View>
      )
    }
    bins.push(
      <View style={styles.container} key={"end-of-day"}>
        <Text>{displayTimePoint(timePoints[timePoints.length-1])}</Text>
      </View>
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

const TimeBin = (props: {text: string, children: any}) => {
  return (
    <View style={styles.binContainer}>
      <Text>{props.text}</Text>
      <View>
        {props.children}
      </View>
    </View>
  )
}

// const CurrentTimeMarker = (props) => {
//   return (
//     <View style={styles.marker}></View>
//   )
// }

const styles = StyleSheet.create({
  binContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  marker: {
    height: 3,
    backgroundColor: 'red'
  }
})