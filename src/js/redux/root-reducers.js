/**
 * @flow
 */

import { combineReducers } from 'redux'
import {ADD_ROUTINE} from "./actions";
import type {Action, AddRoutineAction} from "./actions";
import type {Routine, Plan, State} from './state'
import {SCHEDULE_ACTION_PREFIX, scheduleReducer, scheduleReducerFullState} from '../schedule/schedule-reducers-actions'

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

const plans = (state: Array<Plan> = [], action: Action): Array<Plan> => {
  switch (action.type) {
    default:
      (action: empty)
      return state
  }
}

const settings = (state: Array<State.settings> = [], action: Action): Array<State.settings> => {
  switch (action.type) {
    default:
      (action: empty)
      return state
  }
}

const appState = (state: State, action: Action): Array<State.appState> => {
  switch (action.type.startsWith(SCHEDULE_ACTION_PREFIX)) {
    case true:
      const newState = scheduleReducer(state, action)
      // console.log("root schedule reducer", newState, action)
      return newState
    default:
      (action: empty)
      return state.appState
  }
}


const fullState = (state: State, action: Action): Array<State> => {
  switch (action.type.startsWith(SCHEDULE_ACTION_PREFIX)) {
    case true:
      const newState = scheduleReducerFullState(state, action)
      // console.log("root full state schedule reducer", newState, action)
      return newState
    default:
      (action: empty)
      return state
  }
}

const routineApp = function (state: State, action: Action) {
  if (!action) {
    return state
  }
  let newState = {
    routines: routines(state.routines, action),
    plans: plans(state.plans, action),
    settings: settings(state.settings, action),
    appState: state.appState
  }
  newState = Object.assign({}, newState, {appState: appState(newState, action)})
  newState = Object.assign({}, newState, fullState(newState, action))
  return newState
}

export {routineApp}