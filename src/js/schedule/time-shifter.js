import React, {PureComponent} from "react";
import {View} from 'react-native'
import {minutesToDisplayTime} from '../display-helpers'
import Slider from 'material-ui/Slider';
import {connect} from 'react-redux'
import {State} from '../redux/state'

class TimeShifterComponent extends PureComponent {
  props: {start: Date, end: Date, currentPosition: Date, day: Date}

  constructor() {
    super()
    this.state = {atGradation: null}
    this.onSliderChange = this.onSliderChange.bind(this)
  }

  getMin() {
    return (this.props.start.valueOf() - this.props.currentPosition.valueOf()) / 1000 / 60
  }

  getMax() {
    return (this.props.end.valueOf() - this.props.currentPosition.valueOf()) / 1000 / 60
  }

  onSliderChange(event, value) {
    console.log(value)
  }


  render() {
    if (!this.props.isActive) {
      return null
    }
    return (
      <View style={styles.paper}>
        <Slider axis="y" style={styles.slider} sliderStyle={{margin: 0}} max={this.getMax()} min={this.getMin()} defaultValue={0}
        onChange={this.onSliderChange}/>
      </View>
    )
  }
}


function mapStateToProps(state: State, ownProps) {
  let isActive = false
  let currentPosition = null

  if (state.appState.editEventMode.action && state.appState.editEventMode.action.startsWith('shift')) {
    const event = state.appState.events.find(e => (e.id === state.appState.editEventMode.eventId))
    if (state.appState.editEventMode.action.endsWith('top')) {
      currentPosition = event.dateTimeStart
    } else {
      currentPosition = event.dateTimeEnd
    }
    console.log("timeshifter event", currentPosition, event)
    // console.log("timeshifter", ownProps)
    if (!ownProps.timeLineId) {
      isActive = event.dateTimeStart.toDateString() === ownProps.day.toDateString()
    } else {
      let activeTimeLine = state.appState.additionalTimeLines.find(t => (t.parentEventId === state.appState.editEventMode.eventId))
      isActive = activeTimeLine === ownProps.timeLineId
    }
  }

  return Object.assign({}, ownProps, {isActive: isActive, currentPosition: currentPosition})
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const TimeShifter = connect(mapStateToProps, mapDispatchToProps)(TimeShifterComponent)
export default TimeShifter

const styles = {
  paper: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    width: '2em',
    justifyContent: "flex-start",
    alignItems: 'center'
  },
  slider: {
    flexGrow: 1,
    flexShrink: 1,
    height: 1,
    paddingTop: 10,
    paddingBottom: 10
  }
}