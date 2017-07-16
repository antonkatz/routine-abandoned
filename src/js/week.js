/**
 * A container of days of the week
 */

import React, {PureComponent} from "react";
import {View, StyleSheet, Text} from "react-native";
import Day from './day.js';

export default class Week extends PureComponent {

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
    return dates.map((d) => {
      const rendering = <Day style={first ? style.firstDay : null} key={d}/>;
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
    flexDirection: 'row'
  },
  firstDay: {
    borderLeftWidth: 0
  }
});