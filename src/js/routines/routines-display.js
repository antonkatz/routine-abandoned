/** @flow */

import React, {Component, PureComponent} from "react";
import {ScrollView, View, StyleSheet, Text, Button} from "react-native";
import {Link} from '../navigation/nav-import'
import {VIEW_ROUTINES_PATH} from '../navigation/constants'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {DEFAULT_ROUTINE_COLOR, getAvatarTextColor} from '../color-constants'
import {minutesToDisplayTime} from '../display-helpers'
import type {Goal, Routine} from '../redux/state'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

/* notes:
* - (?) only parentless routines can have color -- NOT IMPLEMENTED
* - sub-routines are called "contents" ex. a routine "friends" can contain friend names that act as tasks, rather than
 * a full blown routine
* */

function displaySingleRoutine(r: Routine, navigateDown, onSchedule) {
  const bgColor = r.color || DEFAULT_ROUTINE_COLOR;
  return (
  <View style={styles.card} key={r.id}>
    <Card expandable={true} expanded={false} onExpandChange={() => navigateDown(r)}>
      <CardHeader title={r.title} subtitle={r.description ? r.description : ""}
                  actAsExpander showExpandableButton avatar={
        <Avatar backgroundColor={bgColor} color={getAvatarTextColor(bgColor)}>
          {r.title.length > 0 ? r.title.charAt(0) : ""}
        </Avatar>
      }/>
      <CardText actAsExpander style={{paddingTop: 0, paddingBottom: 0}}>
        {displayGoals(r)}
        {r.defaultDuration && <Chip key="def-dur">usually lasts {minutesToDisplayTime(r.defaultDuration)}</Chip>}
      </CardText>
      <CardActions>
        <FlatButton label="Schedule" onTouchTap={() => {onSchedule(r.id)}} primary={true} />
      </CardActions>
    </Card>
  </View>
  )
}

function displayParentRoutine(r: Routine, navigateUp, onSchedule) {
  const bgColor = r.color || DEFAULT_ROUTINE_COLOR;
  return (
    <Card key={r.id} initiallyExpanded={true} showExpandableButton={false} expandable={false} style={{marginBottom: '10px'}}>
      <CardHeader title={r.title} subtitle={r.description ? r.description : ""} avatar={
        <Avatar backgroundColor={bgColor} color={getAvatarTextColor(bgColor)}>
          {r.title.length > 0 ? r.title.charAt(0) : ""}
        </Avatar>
      }/>
      <CardText>
        this is now in edit mode
      </CardText>
      <CardActions>
        <FlatButton label="Back" onTouchTap={navigateUp} />
        <FlatButton label="Schedule" onTouchTap={() => {onSchedule(r.id)}} primary={true} />
      </CardActions>
    </Card>
  )
}

function displayGoals(r: Routine) {
  if (r.goals.length === 0) {
    return (
      <Chip key="no-goal-chip">no goals</Chip>
    )
  } else {
    return r.goals.map(g => {
      return displayGoalChip(g.interval, g.quantity)
    })
  }
}

function displayGoalChip(interval: string, minutes: ?number) {
    return (
      <Chip key={interval} >
        {minutes &&
          [<Text key="time">{minutesToDisplayTime(minutes)}</Text>, <Text key="descr"> {interval} goal</Text>]
        }
        {!minutes && <Text>no {interval} goal</Text>}
      </Chip>
    )
}

function displayRoutinesList(routines: Array<Routine>, navigateDown: (r: Routine) => void, onSchedule) {
  return routines.map(r => {
    return displaySingleRoutine(r, navigateDown, onSchedule)
  })
}

export default function RoutinesDisplay(props) {
  const parentCard = props.parentRoutine && displayParentRoutine(props.parentRoutine, props.navigation.up, props.onSchedule)
  const parentCardView =
    <View style={styles.parentCardContainer}>
      {parentCard}
      <View>
        <RaisedButton primary={true} label="Create routine"/>
      </View>
    </View>;

  return (
    <View key="routines-list-holder" style={styles.outerContainer}>
      {props.parentRoutine && parentCardView}
      <View style={styles.routinesList}>
      {[
        ...displayRoutinesList(props.routineChildren, props.navigation.down, props.onSchedule)
      ]}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    flexShrink: 1
  },
  chipContainer: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-around',
    justifyContent: 'center',
  },
  chip: {
    flex: 1,
  },
  parentCardContainer: {
    flex: 1,
  },
  outerContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  routinesList : {
    flexDirection: 'row'
  }
})