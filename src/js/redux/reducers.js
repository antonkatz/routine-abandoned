//@flow
/**
 * Created by anton on 18/07/17.
 */

import { combineReducers } from 'redux'
import {Action, ADD_ROUTINE, AddRoutineAction} from "./actions";
import Routine from './store'

const routines = (state: Array<Routine> = [], action: Action): Array<Routine> => {
  switch (action.type) {
    case ADD_ROUTINE:
      (action: AddRoutineAction);
      return [...state, {id: 4, title: action.title, parent: null, children: []}];
    default:
      (action: empty);
      return state
  }
}

const routineApp = combineReducers(routines)


export {routineApp}