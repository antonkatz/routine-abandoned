/**
 * A container of days of the week
 */

import React, {PureComponent} from "react";
import {View, StyleSheet, Text} from "react-native";
import Day from './day.js';
import {Event} from './schedule-types-constants'

function filterEventsByDate(events: Array<Event>, day: Date): Array<Event> {
  return events.filter((e: Event) => (
    e.dateTimeStart.toDateString() === day.toDateString()
  ))
}

export default class Week extends PureComponent {
  props: {events: Array<Event>, dayStart: Date, dayEnd: Date}

  /** @return the next 7 dates including today*/
  getDatesOfWeek() {
    let dates = new Array(7).fill(null);
    dates = dates.map((v, i) => {
      let date = new Date();
      date.setDate(date.getDate() + i);
      return date
    });
    return dates
  }

  /** @returns produces JSX representation of the next 7 days from dates given by getDatesOfWeek() */
  renderDays() {
    const dates = this.getDatesOfWeek();
    let first = true;
    const _props = this.props
    return dates.map((d) => {
      const events = filterEventsByDate(_props.events, d)
      const dayProps = Object.assign({}, _props, {events: events})
      // console.log("day props week", dayProps, d)
      const rendering = <Day key={d} date={d} {...dayProps}/>;
      first = false;
      return (rendering)
    })
  }

  render() {
    return (
      <View style={style.container}>
        {this.renderDays()}
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    maxWidth: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  firstDay: {
    borderLeftWidth: 0
  }
});