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
import {getDateWithSetTime, filterEventsByDate} from '../helpers'
import {FREE_TIME_EVENT_TITLE} from './schedule-types-constants'
import { connect } from 'react-redux'
import type {State} from '../redux/state'

function getStartTime(props) {
  return getDateWithSetTime(props.date, props.dayLimits.start.hour, props.dayLimits.start.minute)
}

function getEndTime(props) {
  return getDateWithSetTime(props.date, props.dayLimits.end.hour, props.dayLimits.end.minute)
}

function DayComponent (props) {
  const title = dayOfWeekToText(props.date.getDay());
  const isToday = props.date.toDateString() === (new Date()).toDateString()
    return (
       <View style={styles.container}>
        <Toolbar>
          <ToolbarTitle text={title}></ToolbarTitle>
        </Toolbar>

         <View style={styles.timelineContainer}>
           <TimeLine events={props.events} startTime={getStartTime(props)} endTime={getEndTime(props)}
                     isCurrent={isToday}/>

           {props.timeLines.map(t => (
             <TimeLine key={t.timeLineId} timeLineId={t.timeLineId} events={t.events}
                       startTime={t.startTime} endTime={t.endTime}
                       isCurrent={isToday} routines={t.routines} matchOffset={t.matchOffset} style={styles.timeLine}/>
           ))}
         </View>
       </View>
    )
}

function mapStateToProps(state: State, ownProps) {
  const rootEvents = state.appState.events.filter(e => (e.isRoot))
  const todaysEvents = filterEventsByDate(rootEvents, ownProps.date)
  const timeLines = state.appState.additionalTimeLines
    .filter(t => t.startTime.toDateString() === (ownProps.date).toDateString())
  return {date: ownProps.date, dayLimits: state.settings.dayLimits,
    events: todaysEvents, timeLines: timeLines}
}

const Day = connect(mapStateToProps)(DayComponent)
export default Day

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 100,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  timelineContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  timeLine: {position: 'relative'}
})