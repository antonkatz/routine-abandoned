/** @flow */

import React, {Component, PureComponent} from "react";
import {ScrollView, View, StyleSheet, Text, Button} from "react-native";
import {Link} from '../navigation/nav-import'
import {VIEW_ROUTINES_PATH} from '../navigation/constants'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {DEFAULT_ROUTINE_COLOR, getAvatarTextColor} from './routine-colors'
import {minutesToDisplayTime} from '../display-helpers'
import type {Goal, Routine} from '../redux/store'
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

/* notes:
* - (?) only parentless routines can have color -- NOT IMPLEMENTED
* - sub-routines are called "contents" ex. a routine "friends" can contain friend names that act as tasks, rather than
 * a full blown routine
* */

function displaySingleRoutine(r: Routine, navigateDown) {
  const bgColor = r.color || DEFAULT_ROUTINE_COLOR;
  return (
    <Card key={r.id} expandable={true} onExpandChange={() => navigateDown(r)}>
      <CardHeader title={r.title} subtitle={r.description ? r.description : ""}
                  actAsExpander showExpandableButton avatar={
        <Avatar backgroundColor={bgColor} color={getAvatarTextColor(bgColor)}>
          {r.title.length > 0 ? r.title.charAt(0) : ""}
        </Avatar>
      }/>
      <CardText actAsExpander>
        {displayGoals(r)}
        {r.defaultDuration && <Chip key="def-dur">usually lasts {minutesToDisplayTime(r.defaultDuration)}</Chip>}
      </CardText>
    </Card>
  )
}

function dispalyParentRoutine(r: Routine, navigateUp) {
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
      </CardActions>
    </Card>
  )
}

function displaySubRoutineActions(r: Routine, navigateDown: (Routine) => void) {
  return (
  <CardActions>
    <FlatButton label="Sub-routines" onTouchTap={() => {navigateDown(r)}} />
    <FlatButton label="Edit" onTouchTap={() => {}} />
  </CardActions>
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

function displayRoutinesList(routines: Array<Routine>, navigateDown: (r: Routine) => void) {
  return routines.map(r => {
    //displaySubRoutineActions(r,navigateDown)
    return displaySingleRoutine(r, navigateDown)
  })
}

export default function RoutinesDisplay(props) {
  const parentCard = props.parentRoutine && dispalyParentRoutine(props.parentRoutine, props.navigation.up)
    return (
      <View key="routines-list-holder">
        {[
          parentCard,
          ...displayRoutinesList(props.routineChildren, props.navigation.down)]
        }
      </View>
    )
}

//               <Button key='button' title="add routine" onPress={() => props.onAddClick(props.parentId)}></Button>,


const styles = StyleSheet.create({
  card: {
    flex: 1,
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
  container: {
    flex: 1,
    // backgroundColor: 'black'
    // alignSelf: 'flex-start'
  },
  innerContainer: {
    // flexWrap: 'no-wrap',
    // flexDirection: 'column'
  }
})