/**
 * Managing routines and sub-routines (their prototypes, not actual events)
 */

import React, {Component, PureComponent} from "react";
import {ScrollView, View, StyleSheet, Text, Button} from "react-native";
// import {wrapWithLink, generateRoute} from '../navigation/helpers'
import {State} from '../redux/store'
import {addRoutine} from '../redux/actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Link} from '../navigation/nav-import'
import {VIEW_ROUTINES_PATH} from '../navigation/constants'

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

function displaySingleRoutine(r) {
  return (
    <Link key={r.id} to={`${VIEW_ROUTINES_PATH}${r.id}`}>
    <Text>{r.title}</Text>
  </Link>
  )
}

const displayRoutinesList = (routines) => {
  return routines.map(displaySingleRoutine)
};

const Routines = (props) => {
    return (
        <View>
          <ScrollView style={styles.container} contentContainerStyle={styles.innerContainer}>
            {[
              <Button key='button' title="add routine" onPress={() => props.onAddClick(props.parentId)}></Button>,
              ...displayRoutinesList(props.routineChildren)
            ]}
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