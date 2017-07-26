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
    timeLines = state.appState.additionalTimeLines.filter(t => (t.timeLineId > timeLineId))
    nextId += timeLineId
  }

  // push a new one
  const event: Event = state.appState.events.find(e => (e.id === eventId))
  const nextTimeLine = {startTime: event.dateTimeStart, endTime: event.dateTimeEnd, timeLineId: nextId,
    events: event.includes, routines: event.routines, offsetTop: 0}

  timeLines.push(nextTimeLine)
  const appState = Object.assign({}, state.appState, {additionalTimeLines: timeLines})
  return appState
}