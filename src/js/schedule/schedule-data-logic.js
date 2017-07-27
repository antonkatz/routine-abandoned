/**
 * @flow
 * */

import type {State, Plan, Routine, PlanRepetition, WeeklyPlanRepetition} from '../redux/state'
import type {RoutineColor} from '../color-constants'
import { connect } from 'react-redux'
import {Event, AlternativeEvents, SingleEvent} from './schedule-types-constants'
import {getRoutineChildrenOrRoot, filterEventsByDate, getDurationInMinutes, getDateWithSetTime} from '../helpers'
import {DEFAULT_ROUTINE_COLOR} from '../color-constants'
import {FREE_TIME_EVENT_TITLE} from './schedule-types-constants'

/* Initialization */

export function initializeState(state: State.appState) {
  return Object.assign({}, state, {daysToDisplay: getDatesOfWeek()})
}

function getDatesOfWeek() {
  let dates = new Array(7).fill(null);
  dates = dates.map((v, i) => {
    let date = new Date();
    date.setDate(date.getDate() + i);
    return date
  });
  return dates
}

/* Converting plans into concrete events */

export function processEventsIntoState(state: State, rootEventId: ?number): State.appState {
  function getParentRoutineById (routineId): Routine {
    const found = state.routines.find(r => (r.id === routineId))
    return found ? found : null
  }

  function getPlanById(planId): Plan {
    return state.plans.find(p => (p.id === planId))
  }

  function getRoutineChildren(routineId): Array<Routine> {
    return getRoutineChildrenOrRoot(state, routineId)
  }

  const events = processStatePlansToEvents(state.plans, getParentRoutineById, getRoutineChildren, getPlanById)

  const appState = Object.assign({}, state.appState, {events: events})
  return appState
}

function processStatePlansToEvents(plans: Array<Plan>, routineFinder: (id: number) => Routine,
routineChildFinder: (id: number) => Array<Routine>): Array<Event> {
  if (plans.length === 0) {
    return []
  }
  // making sure that a plan is not processed before a parent plan's events are not created
  const sortedPlans = []
  const unsortedPlans = [...plans]
  while (unsortedPlans.length > 0) {
    const p = unsortedPlans.splice(0, 1)[0]
    this.setTimeout(1000)
    if (!p.parentPlanId || sortedPlans.findIndex(sorted => (sorted.id === p.parentPlanId)) > -1) {
      sortedPlans.push(p)
    } else {
      unsortedPlans.push(p)
    }
  }

  const events = []
  // processing plans into individual events
  sortedPlans.forEach(p => {
    // each plan can have multiple repetitions
    const dates = getDates(p, events)
    dates.forEach(d => {
      let event: SingleEvent = {
        id: '' + p.id + d.end.valueOf() + d.end.valueOf(),
        parentPlanId: p.id,
        parentRepetitionId: d.repetitionId,
        parentEventId: d.parentEventId,
        isRoot: !p.parentPlanId,
        dateTimeStart: d.start,
        dateTimeEnd: d.end,
        duration: d.duration,
        title: getTitle(p, routineFinder),
        routines: getRoutines(p, routineChildFinder),
        color: getColor(p, routineFinder),
        type: 'single'
      };
      events.push(event)
    })
  })

  // thus the events have to be reduced
  return events
}

/** different plans have different types of repetition such as weekly (on the same week day) or daily (every _n_ days)
 * given a plan, returns start date, end date, and duration in minutes */
function getDates(plan: Plan, allEvents: Array<Event>): Array<{start: Date, end: Date, duration: number}> {
  const nestedRepetitions = plan.repetition.map((r: PlanRepetition) => {
    if (r.type === "weekly") {
      const start = getDateForWeeklyRepetition(r)
      const end = new Date(start.valueOf() + r.duration * 60 * 1000)
      return [{start: start, end: end, duration: r.duration, parentRepetitionId: r.repetitionId, parentEventId: null}]
    } else if (r.type === "parent" && r.timePositionType === 'relative') {
      const parentEvents = allEvents.filter(e => (plan.parentPlanId === e.parentPlanId))
      return parentEvents.map(pEv => {
        let start = new Date(pEv.dateTimeStart.valueOf())
        start.setHours(start.getHours() + r.hour, start.getMinutes() + r.minute)
        let end = new Date(start.valueOf() + r.duration * 60 * 1000)
        return {start: start, end: end, duration: r.duration, parentRepetitionId: r.repetitionId, parentEventId: pEv.id}
      })
    } else {
      throw new Error("Not supported")
    }
  })

  return nestedRepetitions.reduce((a,b) => ([...a, ...b]))
}

function getDateForWeeklyRepetition(r: WeeklyPlanRepetition): Date {
  const today = new Date()
  const dayOfWeek = today.getDay();
  const diff = r.weekday - dayOfWeek
  let projectBy = diff > 0 ? diff : (7 + diff)
  if (diff === 0) {
    projectBy = 0
  }
  const repeatOn = new Date()
  repeatOn.setDate(today.getDate() + projectBy)
  repeatOn.setHours(r.hour, r.minute, 0, 0)
  return repeatOn
}

export function convertConflictsIntoAlternatives(events: Array<Event>): {
  events: Array<Event>, alternativeEvents: Array<AlternativeEvents>
} {
  if (events.length === 0) {
    return events
  }
  let updatedEvents: Array<Array<Event>> = events.map(e => {
    // finding conflicting events
    const startWithin = events.filter(inConflict => (
      e.dateTimeStart.valueOf() <= inConflict.dateTimeStart.valueOf() && e.dateTimeEnd.valueOf() >= inConflict.dateTimeStart &&
        e.id !== inConflict.id
    ))
    const endWithin = events.filter(inConflict => (
      e.dateTimeStart.valueOf() <= inConflict.dateTimeStart.valueOf() && e.dateTimeEnd.valueOf() >= inConflict.dateTimeStart &&
      e.id !== inConflict.id
    ))

    // if no there are no conflicts, continue
    if (startWithin.length === 0 && endWithin.length === 0) {
      return [e]
    }

    // figuring out at which points to split the original event
    let splitAt = []
    startWithin.forEach(inConflict => {
      splitAt.push(inConflict.dateTimeStart.valueOf())
    })
    endWithin.forEach(inConflict => {
      splitAt.push(inConflict.dateTimeEnd.valueOf())
    })
    // adding original start and end for convenience
    if(!splitAt.includes(e.dateTimeStart.valueOf())) {
      splitAt.push(e.dateTimeStart.valueOf())
    }
    if(!splitAt.includes(e.dateTimeEnd.valueOf())) {
      splitAt.push(e.dateTimeEnd.valueOf())
    }
    // sorting so that the splitting can be simple
    splitAt = splitAt.sort((a,b) => a - b)

    // splitting
    const newEvents = []
    for (let i=0; i < splitAt.length -1; i++) {
      const start = new Date(splitAt[i])
      const end = new Date(splitAt[i+1])
      const duration = getDurationInMinutes(start, end)
      const newEvent: Event = Object.assign({}, e, {id: e.id,
        dateTimeStart: start, dateTimeEnd: end, duration: duration})
      newEvents.push(newEvent)
    }
    return newEvents
  })

  // condensing into 1d array
  updatedEvents = updatedEvents.reduce((a,b) => [...a, ...b])

  // grouping
  let ungrouped = [...updatedEvents]
  let alternativeEvents: Array<AlternativeEvents> = []
  let normalEvents = []
  while(ungrouped.length > 0) {
    const e = ungrouped.pop()
    const alternatives = ungrouped.filter(alt =>
      (alt.dateTimeEnd.valueOf() == e.dateTimeEnd.valueOf() && alt.dateTimeStart.valueOf() == e.dateTimeStart.valueOf()))
    if (alternatives.length > 0) {
      ungrouped = ungrouped.filter(alt => (!alternatives.includes(alt)))
      const group = [...alternatives, e]
      alternativeEvents.push({
        id: group.map(ge => (ge.id)).join(''),
        dateTimeStart: e.dateTimeStart,
        dateTimeEnd: e.dateTimeEnd,
        duration: getDurationInMinutes(e.dateTimeStart, e.dateTimeEnd),
        alternatives: group,
        type: "alternative"
      })
    } else {
      normalEvents.push(e)
    }
  }

  return [...normalEvents, ...alternativeEvents]
}

export function fillNonEventTime(events: Array<Event>, start: Date, end: Date): Array<Event> {
    let upperPoint = start
    let currentPoint: Date = upperPoint
    const lowestPoint = end

    const freeTimeBlocks = []
    if (events.length === 0) {
      freeTimeBlocks.push(createFreeEvent(upperPoint, lowestPoint))
    } else {
      while (currentPoint.valueOf() < lowestPoint.valueOf()) {
        const nextSortedEvents = events.map(e => (
          Object.assign({}, {diff: e.dateTimeStart.valueOf() - currentPoint.valueOf()}, e)
        ))
        // filtering out events that happen before the current point
          .filter(e => (e.diff >= 0))
          .sort((eA, eB) => (
            eA.diff - eB.diff
          ))
        if (nextSortedEvents.length === 0) {
          break
        }

        const closestEvent = nextSortedEvents[0]
        if (nextSortedEvents[0].diff === 0) {
          currentPoint = closestEvent.dateTimeEnd
          continue
        }

        freeTimeBlocks.push(createFreeEvent(currentPoint, closestEvent.dateTimeStart))

        // figuring out where to start next
        currentPoint = closestEvent.dateTimeEnd
        // seeing if any events start within the time of the closest event
        for (let i = 1; i < nextSortedEvents.length; i++) {
          const e = nextSortedEvents[i]
          if (e.dateTimeStart.valueOf() < currentPoint.valueOf()) {
            currentPoint = e.dateTimeEnd
          }
        }
      }

      if (currentPoint.valueOf() < lowestPoint.valueOf()) {
        freeTimeBlocks.push(createFreeEvent(currentPoint, lowestPoint))
      }
    }

    return freeTimeBlocks
}

function createFreeEvent(start: Date, end: Date) {
  const duration = Math.floor((end.valueOf() - start.valueOf()) / 1000 / 60)
  return {
    id: FREE_TIME_EVENT_TITLE + start.valueOf() + end.valueOf(), parentPlanId: null,
    dateTimeStart: start, dateTimeEnd: end, title: FREE_TIME_EVENT_TITLE,
    routines: [], color: "rgba(255,255,255,255)", duration: duration,
    type: 'single', isFreeTime: true}
}

function getRoutines(plan: Plan, routineChildFinder): Array<Routine> {
  return routineChildFinder(plan.parentRoutineId)
}

function getTitle(plan: Plan, routineFinder): string {
  return plan.title ? plan.title : routineFinder(plan.parentRoutineId).title
}

function getColor(plan: Plan, routineFinder): RoutineColor {
  const c = plan.color ? plan.color : routineFinder(plan.parentRoutineId).color
  return c ? c : DEFAULT_ROUTINE_COLOR
}