/**
 * A container of days of the week
 */

import React, {PureComponent} from "react";
import {View, StyleSheet, Text} from "react-native";
import Day from './day.js';
import {Event} from './schedule-types-constants'
import { connect } from 'react-redux'

class WeekComponent extends PureComponent {
  /** @returns produces JSX representation of the next 7 days from dates given by getDatesOfWeek() */
  renderDays() {
    const dates = this.props.daysToDisplay;
    let first = true;
    return dates.map((d) => {
      const rendering = <Day key={d} date={d} />;
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

function mapStateToProps(state: State) {
  return {daysToDisplay: state.appState.daysToDisplay}
}

const Week = connect(mapStateToProps)(WeekComponent)
export default Week

const style = StyleSheet.create({
  container: {
    maxWidth: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center'
  },
  firstDay: {
    borderLeftWidth: 0
  }
});