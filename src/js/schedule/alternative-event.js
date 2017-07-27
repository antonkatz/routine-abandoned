/**
 * @flow
 */

import React from "react";
import {View, StyleSheet, Text, TouchableHighlight} from "react-native";
import {minutesToDisplayTime} from "../display-helpers"
import TimeLine from './timeline'
import {DEFAULT_ROUTINE_COLOR} from '../color-constants'
import Event from './event'
import Icon from 'material-ui/svg-icons/action/swap-horiz';
import {connect} from 'react-redux'

type Props = {
  alternatives: Array<Event>
}

const AlternativeEventComponent = (props: Props) => {
  return (
    <View style={styles.paper}>
      <View style={styles.iconContainer}>
        <Icon/>
      </View>
      <View style={styles.innerContainer}>
      {props.alternatives.map(e => (
          <Event key={e.id} {...e} style={styles.event} timeLineId={props.timeLineId}/>
      ))}
      </View>
    </View>
  )
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const AlternativeEvent = connect((state, ownProps) => (ownProps), mapDispatchToProps)(AlternativeEventComponent)
export default AlternativeEvent

const styles = StyleSheet.create({
  paper: {
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center'
  },
  event: {
    flexGrow: 1,
    flexShrink: 0
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0,
    flexShrink: 0
  }
})

// export {Props as AlternativeEventProps}