/**
*
* @flow
* */

import {State} from '../redux/state'
import {SingleEvent} from './schedule-types-constants'

export function expandEvent(state: State, eventId, timeLineId): State.appState {
  // remove timelines that are after the current one
  let timeLines = []
  let nextId = 1
  if (timeLineId) {
    timeLines = state.appState.additionalTimeLines.filter(t => (t.timeLineId <= timeLineId))
    nextId += timeLineId
  }

  // push a new one
  const event: Event = state.appState.events.find(e => (e.id === eventId))
  // can happen in case of free time events, or alternative events
  if (!event) {
    return state.appState
  }
  const childEvents = state.appState.events.filter(e => (e.parentEventId === eventId))
  if (childEvents.length > 0 || event.routines.length > 0) {
    const nextTimeLine = {
      startTime: event.dateTimeStart, endTime: event.dateTimeEnd, timeLineId: nextId,
      events: childEvents, routines: event.routines, parentEventId: event.id,
      matchOffset: getTimeLineOffsetToMatch(event)
    }

    timeLines.push(nextTimeLine)
  }
  const appState = Object.assign({}, state.appState, {additionalTimeLines: timeLines})
  return appState
}

function getTimeLineOffsetToMatch(event: Event) {
  const offsets = event.dom.map(d => (d.getBoundingClientRect().top))
  return Math.min(...offsets)
}


// fixme. these will need to unregister as well
export function registerEventDom(state: State, eventId, dom, remove) {
  let eventIndex = state.appState.events.findIndex(e => (e.id === eventId))
  if (eventIndex < 0) {
    return state.appState
  }
  const event = state.appState.events[eventIndex]
  let domArray = []
  if (!remove) {
    domArray.push(dom)
  }
  if (event.dom) {
    domArray = [...domArray, ...event.dom.filter(d => (d !== dom))]
  }
  const newEvent = Object.assign({}, state.appState.events[eventIndex], {dom: domArray})
  const events = [...state.appState.events]
  events.splice(eventIndex, 1, newEvent)
  const newState = Object.assign({}, state.appState, {events: events})
  return newState
}

export function enterCreateEventMode(state, routineId) {
  return Object.assign({}, state.appState, {createEventMode: {on: true, routineId: routineId}})
}