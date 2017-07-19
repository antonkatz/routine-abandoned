/** @flow */

import React, {Component, PureComponent} from "react";
import {ScrollView, View, StyleSheet, Text, Button} from "react-native";
import {Link} from '../navigation/nav-import'
import {VIEW_ROUTINES_PATH} from '../navigation/constants'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {DEFAULT_ROUTINE_COLOR, getAvatarTextColor} from './routine-colors'
import {Routine} from '../redux/store'

/* notes:
* - (?) only parentless routines can have color -- NOT IMPLEMENTED
* */

function displaySingleRoutine(r: Routine) {
  const bgColor = r.color || DEFAULT_ROUTINE_COLOR;
  return (
    <Card>
      <CardHeader title={r.title} actAsExpander showExpandableButton avatar={
        <Avatar backgroundColor={bgColor} color={getAvatarTextColor(bgColor)}>
          {r.title.length > 0 ? r.title.charAt(0) : ""}
        </Avatar>
      }/>
    </Card>

    // <Link key={r.id} to={`${VIEW_ROUTINES_PATH}${r.id}`}>
    //  <Text>{r.title}</Text>
    // </Link>
  )
}

function displayRoutinesList(routines) {
  return routines.map(displaySingleRoutine)
}

export default function RoutinesDisplay(props) {
    return (
          <ScrollView style={styles.container} contentContainerStyle={styles.innerContainer}>
            {[
              <Button key='button' title="add routine" onPress={() => props.onAddClick(props.parentId)}></Button>,
              ...displayRoutinesList(props.routineChildren)
            ]}
          </ScrollView>
    )
}


const styles = StyleSheet.create({
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