/**
 * The timeline on the side of the schedule
 */

import React, {PureComponent} from "react";
import {View, StyleSheet, Text} from "react-native";

export default class TimeLine extends PureComponent {
  /** @return time interval in milliseconds between successive points on the line */
  getTimeInterval() {
    return 30 * 60 * 1000;
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
    const end = this.getEndTime().valueOf();
    const points = [this.getStartTime()];
    let last = points[0].valueOf();
    while(last < end) {
      const d = new Date(last + this.getTimeInterval());
      points.push(d);
      last = d.valueOf();
    }
    return points;
  }

  renderTimePoints() {
    const points = this.getTimePoints()
    return points.map((p) => {
      const minutes = p.getMinutes();
      const m = minutes < 10 ? '0' + minutes : minutes
      return (
         <Text>
           {p.getHours()}:{m}
         </Text>
      )
    })
  }

  render() {
    return (
       <View style={styles.container}>
         {this.renderTimePoints()}
       </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
})