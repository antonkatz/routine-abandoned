// @flow

import {State} from '../redux/state'
import {Action} from '../redux/actions'
import {initializeState, updateEvents} from './schedule-data-logic'
import {expandEvent} from './schedule-display-logic'

export const SCHEDULE_ACTION_PREFIX = "SCHEDULE_"

export const REFRESH_SCHEDULE_ACTION = SCHEDULE_ACTION_PREFIX + "REFRESH"

export const INITIALIZE_SCHEDULE_ACTION = SCHEDULE_ACTION_PREFIX + "INITIALIZE_SCHEDULE"

export const EXPAND_EVENT = SCHEDULE_ACTION_PREFIX + "EXPAND_EVENT"

export function initializeAction() {
  return {type: INITIALIZE_SCHEDULE_ACTION}
}
export function refreshAction() {
  return {type: REFRESH_SCHEDULE_ACTION}
}

export function expandEventAction(eventId, timeLineId) {
  return {type: EXPAND_EVENT, eventId: eventId, timeLineId: timeLineId}
}

export const scheduleReducer = (state: State = [], action: Action): Array<State.appState> => {
  switch (action.type) {
    case INITIALIZE_SCHEDULE_ACTION:
      return initializeState(state.appState);
    case REFRESH_SCHEDULE_ACTION:
      return updateEvents(state)
    case EXPAND_EVENT:
      return expandEvent(state, action.eventId, action.timeLineId)
    default:
      (action: empty)
      return state
  }
}