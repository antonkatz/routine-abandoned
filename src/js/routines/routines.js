/**
 * Managing routines and sub-routines (their prototypes, not actual events)
 */

import React, {Component, PureComponent} from "react";
import {ScrollView, View, StyleSheet, Text, Button} from "react-native";
import {wrapWithLink, generateRoute} from '../navigation/helpers'
import {State} from '../redux/store'
import {addRoutine} from '../redux/actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function getChildren(state: State, dirtyId) {
  const id: number = Number(dirtyId);
  if (!id) {
    return state.routines.filter((r) => {
      return !r.parentId
    })
  }
  return state.routines.filter((r) => {return r.parentId === id} );
}

const mapStateToProps = (state: State, ownProps ) => {
  console.log("map state to props", state, ownProps)
  return {
    parentId: Number(ownProps.match.params.id),
    routineChildren: getChildren(state, ownProps.match.params.id)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddClick: parentId => {
      dispatch(addRoutine(parentId, "new routine"))
    }
  }
}

const RoutinesList = (props) => {
  return (
    <View>
      {props.routineChildren.map((c) => {
        return (
          wrapWithLink(<Text>{c.title}</Text>, c.id, `/routine/${c.id}`)
        )
      })}
    </View>
  )
}

const Routines = (props) => {
    return (
        <View>
          <ScrollView style={styles.container} contentContainerStyle={styles.innerContainer}>
            <Button title="add routine" onPress={() => props.onAddClick(props.parentId)}></Button>
            <RoutinesList routineChildren={props.routineChildren}/>
          </ScrollView>
        </View>
    )
}

export default ConnectedRoutines = connect(mapStateToProps, mapDispatchToProps)(Routines)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 200,
    // backgroundColor: 'black'
    // alignSelf: 'flex-start'
  },
  innerContainer: {
    // flexWrap: 'no-wrap',
    // flexDirection: 'column'
  }
})