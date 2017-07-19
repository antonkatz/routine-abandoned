// @flow
import RoutinesDisplay from './routines-display'
import { connect } from 'react-redux'
import type {State, Routine} from '../redux/store'
import {addRoutine} from '../redux/actions'
import {navigateToRoutineChildren} from './routines-controls'

function getChildren(state: State, id: ?number) {
  if (!id) {
    return state.routines.filter((r) => {
      return !r.parentId
    })
  }
  return state.routines.filter((r) => {return r.parentId === id} );
}

function getRoutine(state: State, id: number): Routine {
  if (id) {
    return state.routines.find(r => (r.id === id))
  } else {
    return null
  }
}

function cleanRoutineId(dirtyId) {
  return dirtyId ? Number(dirtyId) : null
}

const mapStateToProps = (state: State, ownProps ) => {
  console.log("map state to props", state, ownProps)
  const parentId = cleanRoutineId(ownProps.match.params.id)
  return {
    parentId: parentId,
    parentRoutine: getRoutine(state, parentId),
    routineChildren: getChildren(state, parentId),
    navigation: {
      down: navigateToRoutineChildren(ownProps.history),
      up: () => (ownProps.history.goBack())
    }
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddClick: parentId => {
      dispatch(addRoutine(parentId, "new routine"))
    }
  }
}

const Routines = connect(mapStateToProps, mapDispatchToProps)(RoutinesDisplay)

export default Routines