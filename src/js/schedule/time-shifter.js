import React, {PureComponent} from "react";
import {View} from 'react-native'
import {minutesToDisplayTime} from '../display-helpers'
import RaisedButton from 'material-ui/RaisedButton';

export default class TimeShifter extends PureComponent {
  props: {start: Date, end: Date, currentPosition: Date}

  constructor() {
    super()
    // gradations in minutes
    this.gradations = [5, 10, 30, 60]
    this.maxGradationMarks = 2

    this.state = {atGradation: null}
  }

  getMarks() {

    return [-5, 5]
  }

  // shift start / shift end vs move / change duration

  render() {
    const marks = this.getMarks().map(m => {
      return (<RaisedButton style={styles.mark} key={m} label={m} fullWidth={true} primary={true}
                            overlayStyle={{display: 'flex', alignItems: 'center', justifyContent: "center"}}
                            labelStyle={{padding: 0}}/>)
    })

    return (
      <View style={styles.outerContainer}>
        {marks}
      </View>
    )
  }
}

const styles = {
  outerContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    width: '2em',
    justifyContent: "space-evenly"
  },
  mark: {
    // borderRightStyle: 'solid',
    // borderRightColor: 'blue',
    // borderRightWidth: 1,
    maxHeight: '2em',
    flexGrow: 1,
    flexShrink: 1
  }
}