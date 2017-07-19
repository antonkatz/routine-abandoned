// @flow
import RoutinesDisplay from './routines-display'
import { connect } from 'react-redux'
import {State} from '../redux/store'
import {addRoutine} from '../redux/actions'

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

const Routines = connect(mapStateToProps, mapDispatchToProps)(RoutinesDisplay)

export default Routines