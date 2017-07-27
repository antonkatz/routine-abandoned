// @flow
import RoutinesDisplay from './routines-display'
import { connect } from 'react-redux'
import type {State, Routine} from '../redux/state'
import {addRoutine} from '../redux/actions'
import {navigateToRoutineChildren} from './routines-controls'
import {getRoutineChildrenOrRoot, getRoutine} from '../helpers'
import {enterCreatePlanModeAction} from '../schedule/schedule-reducers-actions'

function cleanRoutineId(dirtyId) {
  return dirtyId ? Number(dirtyId) : null
}

const mapStateToProps = (state: State, ownProps ) => {
  const parentId = cleanRoutineId(ownProps.match.params.id)
  return {
    parentId: parentId,
    parentRoutine: getRoutine(state, parentId),
    routineChildren: getRoutineChildrenOrRoot(state, parentId),
    navigation: {
      down: navigateToRoutineChildren(ownProps.history),
      up: () => (ownProps.history.goBack())
    }
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAddClick: parentId => {
      dispatch(addRoutine(parentId, "new routine"))
    },
    onSchedule: parentId => {
      dispatch(enterCreatePlanModeAction(parentId))
      ownProps.history.push("/")
    }
  }
}

const Routines = connect(mapStateToProps, mapDispatchToProps)(RoutinesDisplay)

export default Routines