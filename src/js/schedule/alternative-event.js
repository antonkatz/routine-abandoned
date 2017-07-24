/**
 * @flow
 */

import React from "react";
import {View, StyleSheet, Text} from "react-native";
import {minutesToDisplayTime} from "../display-helpers"
import TimeLine from './timeline'
import {DEFAULT_ROUTINE_COLOR} from '../color-constants'
import Event from './event'
import Icon from 'material-ui/svg-icons/action/swap-horiz';

type Props = {
  alternatives: Array<Event>
}

export default AlternativeEvent = (props: Props) => {
  return (
    <View style={styles.outerContainer}>
      {props.alternatives.map(e => (
        <View key={e.id} style={styles.innerContainer}>
          <Icon/>
          <Event {...e} style={styles.event}/>
        </View>
      ))}

    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    // borderLeftStyle: "dashed",
    // borderLeftColor: "black",
    // borderLeftWidth: 7
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center'
  },
  event: {
    flexGrow: 1,
    flexShrink: 0
  },
  icon: {
    flexGrow: 0,
    flexShrink: 0
  }
})

// export {Props as AlternativeEventProps}