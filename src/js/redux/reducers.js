//@flow
/**
 * Created by anton on 18/07/17.
 */

import { combineReducers } from 'redux'
import {ADD_ROUTINE} from "./actions";
import type {Action, AddRoutineAction} from "./actions";
import type {Routine, Plan} from './store'

const routines = (state: Array<Routine> = [], action: Action): Array<Routine> => {
  switch (action.type) {
    case ADD_ROUTINE:
      const a = (action: AddRoutineAction);
      return [...state, {id: 4, title: a.title, parentId: a.parentId}];
    default:
      (action: empty);
      return state
  }
}

const plans = (state: Array<Plan> = [], action: Action): Array<Routine> => {
  switch (action.type) {
    default:
      (action: empty)
      return state
  }
}

const settings = (state: Array<Plan> = [], action: Action): Array<Routine> => {
  switch (action.type) {
    default:
      (action: empty)
      return state
  }
}


const routineApp = combineReducers({routines, plans, settings})


export {routineApp}