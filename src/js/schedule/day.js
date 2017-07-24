/**
 * A single day of the week in the schedule
 *
 * - a day can have several timelines
 *
 * @flow
 */
import React, {PureComponent} from "react";
import {View, StyleSheet, Text} from "react-native";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {dayOfWeekToText} from '../display-helpers'
import TimeLine from './timeline'
import {getDateWithSetTime} from '../helpers'
import {FREE_TIME_EVENT_TITLE} from './schedule-types-constants'

function getStartTime(props) {
  // console.log("st", props, props.date)
  return getDateWithSetTime(props.date, 5, 0)
}

function getEndTime(props) {
  return getDateWithSetTime(props.date, 20, 30)
}

function createFreeEvent(start: Date, end: Date) {
  const duration = Math.floor((end.valueOf() - start.valueOf()) / 1000 / 60)
  return {
    id: FREE_TIME_EVENT_TITLE + start.valueOf() + end.valueOf(), parentPlanId: null,
    dateTimeStart: start, dateTimeEnd: end, title: FREE_TIME_EVENT_TITLE,
    routines: [], color: "rgba(255,255,255,255)", duration: duration,
    type: 'single'}
}

function fillNonEventTime(props): Array<Event> {
  let upperPoint = getDateWithSetTime(props.date, props.dayStart.hour, props.dayStart.minute)
  let currentPoint: Date = upperPoint
  const lowestPoint = getDateWithSetTime(props.date, props.dayEnd.hour, props.dayEnd.minute)

  // const startTimes = props.events.map(e => (e.dateTimeStart)).sort();
  // const endTimes = props.events.map(e => (e.dateTimeEnd));

  const freeTimeBlocks = []

  console.log(props.events)

  if (props.events.length === 0) {
    freeTimeBlocks.push(createFreeEvent(upperPoint, lowestPoint))
  } else {
    while (currentPoint.valueOf() < lowestPoint.valueOf()) {
      const nextSortedEvents = props.events.map(e => (
        Object.assign({}, {diff: e.dateTimeStart.valueOf() - currentPoint.valueOf()}, e)
      ))
        // filtering out events that happen before the current point
        .filter(e => (e.diff >= 0))
        .sort((eA, eB) => (
        eA.diff - eB.diff
      ))
      if (nextSortedEvents.length === 0) {
        break
      }

      const closestEvent = nextSortedEvents[0]
      if (nextSortedEvents[0].diff === 0) {
        currentPoint = closestEvent.dateTimeEnd
        continue
      }

      freeTimeBlocks.push(createFreeEvent(currentPoint, closestEvent.dateTimeStart))

      console.log(nextSortedEvents)
      console.log(currentPoint, closestEvent.dateTimeStart)
      console.log(closestEvent.dateTimeEnd)

      // figuring out where to start next
      currentPoint = closestEvent.dateTimeEnd
      // seeing if any events start within the time of the closest event
      for (let i = 1; i < nextSortedEvents.length; i++) {
        const e = nextSortedEvents[i]
        if (e.dateTimeStart.valueOf() < currentPoint.valueOf()) {
          currentPoint = e.dateTimeEnd
        }
      }
    }

    if (currentPoint.valueOf() < lowestPoint.valueOf()) {
      freeTimeBlocks.push(createFreeEvent(currentPoint, lowestPoint))
    }
  }

  return freeTimeBlocks
}

export default function Day (props) {
  const title = dayOfWeekToText(props.date.getDay());
  const freeEvents = fillNonEventTime(props)
  const events = [...freeEvents, ...props.events]
    return (
       <View style={styles.container}>
        <Toolbar>
          <ToolbarTitle text={title}></ToolbarTitle>
        </Toolbar>

        <TimeLine events={events} startTime={getStartTime(props)} endTime={getEndTime(props)}/>

       </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 100,
    backgroundColor: 'rgba(0,0,0,0.1)'
  }
})