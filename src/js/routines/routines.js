/**
 * Managing routines and sub-routines (their prototypes, not actual events)
 */

import React, {Component, PureComponent} from "react";
import {ScrollView, View, StyleSheet, Text, Button} from "react-native";
import {wrapWithLink, generateRoute} from '../navigation/helpers'
import {State} from '../redux/store'
import { connect } from 'react-redux'

function getChildren(state: State, dirtyId) {
  const id: number = Number(dirtyId);
  if (!id) {
    return state.routines.filter((r) => {
      return !r.parent
    })
  }
  const routine = state.routines.find((r) => {return r.id === id} );
  const children = routine.children;
  return state.routines.filter((r) => {
    return children.includes(r.id)
  })
}

const mapStateToProps = (state, ownProps )=> {
  console.log("map state to props", state, ownProps)
  return {
    routineChildren: getChildren(state, ownProps.match.params.id)
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

class Routines extends Component {
  render() {
    return (
        <View>
          <ScrollView style={styles.container} contentContainerStyle={styles.innerContainer}>
            <Button title="add routine" onPress={() => {}}></Button>
            <RoutinesList routineChildren={this.props.routineChildren}/>
          </ScrollView>
        </View>
    )
  }
}

export default ConnectedRoutines = connect(mapStateToProps)(Routines)

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