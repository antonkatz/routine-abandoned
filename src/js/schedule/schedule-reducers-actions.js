// @flow

import {State} from '../redux/state'
import {Action} from '../redux/actions'
import {initializeState, updateEvents} from './schedule-data-logic'

export const SCHEDULE_ACTION_PREFIX = "SCHEDULE_"

export const REFRESH_SCHEDULE_ACTION = SCHEDULE_ACTION_PREFIX + "REFRESH"

export const INITIALIZE_SCHEDULE_ACTION = SCHEDULE_ACTION_PREFIX + "INITIALIZE_SCHEDULE"

export function initializeAction() {
  return {type: INITIALIZE_SCHEDULE_ACTION}
}
export function refreshAction() {
  return {type: REFRESH_SCHEDULE_ACTION}
}

export const scheduleReducer = (state: State = [], action: Action): Array<State.appState> => {
  switch (action.type) {
    case INITIALIZE_SCHEDULE_ACTION:
      return initializeState(state.appState);
    case REFRESH_SCHEDULE_ACTION:
      return updateEvents(state)
    default:
      (action: empty)
      return state
  }
}