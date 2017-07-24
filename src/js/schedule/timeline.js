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
    )).sort(dateSorter)
    if (points.findIndex(p => {
        console.log(p, timeLineStartTime)
        return p.valueOf() === timeLineStartTime.valueOf()
      }) === -1) {
      points = [this.getStartTime(), ...points]
    }
    points.push(this.getEndTime())
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
        <View style={styles.container} key="routines">
          <Text>routines</Text>
          <View>
            {sortedRoutines.map(r => (
              <RoutineEvent key={r.id} {...r}/>
            ))}
          </View>
        </View>
      )
    }

    return (
      <View>
        {bins}
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})