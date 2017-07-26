// @flow

import {State} from '../redux/state'
import {Action} from '../redux/actions'
import {initializeState, processEventsIntoState} from './schedule-data-logic'
import {expandEvent, registerEventDom} from './schedule-display-logic'

export const SCHEDULE_ACTION_PREFIX = "SCHEDULE_"

// export const REFRESH_SCHEDULE_ACTION = SCHEDULE_ACTION_PREFIX + "REFRESH"

export const PROCESS_EVENTS_INTO_STATE = SCHEDULE_ACTION_PREFIX + "PROCESS_EVENTS_INTO_STATE"

export const INITIALIZE_SCHEDULE_ACTION = SCHEDULE_ACTION_PREFIX + "INITIALIZE_SCHEDULE"

export const EXPAND_EVENT = SCHEDULE_ACTION_PREFIX + "EXPAND_EVENT"

export const REGISTER_EVENT_DOM = SCHEDULE_ACTION_PREFIX + "REGISTER_EVENT_DOM"

export function initializeAction() {
  return {type: INITIALIZE_SCHEDULE_ACTION}
}
export function processEventsIntoStateAction(rootEventId: ?number) {
  return {type: PROCESS_EVENTS_INTO_STATE, rootEventId: rootEventId}
}

export function expandEventAction(eventId, timeLineId) {
  return {type: EXPAND_EVENT, eventId: eventId, timeLineId: timeLineId}
}

export function registerEventDomAction(eventId, dom) {
  return {type: REGISTER_EVENT_DOM, eventId: eventId, dom: dom}
}

export const scheduleReducer = (state: State = [], action: Action): Array<State.appState> => {
  switch (action.type) {
    case INITIALIZE_SCHEDULE_ACTION:
      return initializeState(state.appState);
    case PROCESS_EVENTS_INTO_STATE:
      const newState = processEventsIntoState(state, action.rootEventId)
      console.log("process events into state", newState)
      return newState
    case EXPAND_EVENT:
      return expandEvent(state, action.eventId, action.timeLineId)
    case REGISTER_EVENT_DOM:
      return registerEventDom(state, action.eventId, action.dom)
    default:
      (action: empty)
      return state
  }
}