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

export default class TimeLine extends PureComponent {

  /** @return time interval in milliseconds between successive points on the line */
  getTimeInterval() {
    return 60 * 60 * 1000;
  }

  getTimedDate(hour, minute) {
    const d = new Date();
    d.setHours(hour);
    d.setMinutes(minute);
    d.setSeconds(0);
    return d
  }

  getStartTime() {
    return this.getTimedDate(5,0)
  }

  getEndTime() {
    return this.getTimedDate(20,30)
  }

  /** @returns array of time points at which to put markers */
  getTimePoints() {
    const end = this.getEndTime();
    const end_value = end.valueOf();
    const points = [this.getStartTime()];
    let last = points[0].valueOf();
    while(last < end_value) {
      const d = new Date(last + this.getTimeInterval());
      points.push(d.valueOf() > end_value ? end : d);
      last = d.valueOf();
    }
    return points;
  }

  renderTimeBins() {
    const points = this.getTimePoints()
    return points.map((p, i) => {
      const minutes = p.getMinutes();
      const m = minutes < 10 ? '0' + minutes : minutes
      return (
         <Text key={i}>
           {p.getHours()}:{m}
         </Text>
      )
    })
  }

  render() {
    return (
       <View style={styles.container}>
         {this.renderTimeBins()}
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