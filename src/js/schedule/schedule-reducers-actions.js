// @flow

import {State} from '../redux/state'
import {Action} from '../redux/actions'
import {initializeState, processEventsIntoState, createPlan} from './schedule-data-logic'
import {expandEvent, registerEventDom, enterCreatePlanMode} from './schedule-display-logic'

export const SCHEDULE_ACTION_PREFIX = "SCHEDULE_"

// export const REFRESH_SCHEDULE_ACTION = SCHEDULE_ACTION_PREFIX + "REFRESH"

export const PROCESS_EVENTS_INTO_STATE = SCHEDULE_ACTION_PREFIX + "PROCESS_EVENTS_INTO_STATE"

export const INITIALIZE_SCHEDULE_ACTION = SCHEDULE_ACTION_PREFIX + "INITIALIZE_SCHEDULE"

export const EXPAND_EVENT = SCHEDULE_ACTION_PREFIX + "EXPAND_EVENT"

export const REGISTER_EVENT_DOM = SCHEDULE_ACTION_PREFIX + "REGISTER_EVENT_DOM"

export const ENTER_CREATE_PLAN_MODE = SCHEDULE_ACTION_PREFIX + "ENTER_CREATE_PLAN_MODE"

export const CREATE_PLAN = SCHEDULE_ACTION_PREFIX + "CREATE_PLAN"

export function initializeAction() {
  return {type: INITIALIZE_SCHEDULE_ACTION}
}
export function processEventsIntoStateAction(rootEventId: ?number) {
  return {type: PROCESS_EVENTS_INTO_STATE, rootEventId: rootEventId}
}

export function expandEventAction(eventId, timeLineId) {
  return {type: EXPAND_EVENT, eventId: eventId, timeLineId: timeLineId}
}

export function registerEventDomAction(eventId, dom, remove) {
  return {type: REGISTER_EVENT_DOM, eventId: eventId, dom: dom, remove: remove}
}

export function enterCreatePlanModeAction(routineId) {
  return {type: ENTER_CREATE_PLAN_MODE, routineId: routineId}
}

export function createPlanAction(time: Date, timeLineId) {
  return {type: CREATE_PLAN, time: time, timeLineId: timeLineId}
}

export const scheduleReducer = (state: State, action: Action): Array<State.appState> => {
  switch (action.type) {
    case INITIALIZE_SCHEDULE_ACTION:
      return initializeState(state.appState);
    case PROCESS_EVENTS_INTO_STATE:
      const newState = processEventsIntoState(state, action.rootEventId)
      return newState
    case EXPAND_EVENT:
      return expandEvent(state, action.eventId, action.timeLineId)
    case REGISTER_EVENT_DOM:
      return registerEventDom(state, action.eventId, action.dom, action.remove)
    case ENTER_CREATE_PLAN_MODE:
      const newStateCem = enterCreatePlanMode(state, action.routineId)
      console.log(ENTER_CREATE_PLAN_MODE, newStateCem)
      return newStateCem
    default:
      (action: empty)
      return state.appState
  }
}

export const scheduleReducerFullState = (state: State, action: Action): Array<State> => {
  switch (action.type) {
    case CREATE_PLAN:
      let newStateCe = createPlan(state, action.time, action.timeLineId)
      const newAppState = processEventsIntoState(newStateCe, action.rootEventId)
      newStateCe = Object.assign({}, newStateCe, {appState: newAppState})
      console.log("create new plan reducer", newStateCe)
      return newStateCe
    default:
      (action: empty)
      return state
  }
}