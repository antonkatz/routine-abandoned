/**
 * @flow
 */

import { combineReducers } from 'redux'
import {ADD_ROUTINE} from "./actions";
import type {Action, AddRoutineAction} from "./actions";
import type {Routine, Plan, State} from './state'
import {SCHEDULE_ACTION_PREFIX, scheduleReducer} from '../schedule/schedule-reducers-actions'

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
      console.log("new state", newState)
      return newState
    default:
      (action: empty)
      return state.appState
  }
}

const routineApp = function (state: State, action: Action) {
  if (!action) {
    return state
  }
  const newState = {
    routines: routines(state.routines, action),
    plans: plans(state.plans, action),
    settings: settings(state.settings, action),
    appState: state.appState
  }
  const withAppState = Object.assign({}, newState, {appState: appState(newState, action)})
  return withAppState
}

export {routineApp}