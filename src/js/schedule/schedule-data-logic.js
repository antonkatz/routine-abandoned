/**
 * @flow
 * */

import type {State, Plan, Routine, PlanRepetition, WeeklyPlanRepetition} from '../redux/store'
import type {RoutineColor} from '../color-constants'
import Schedule from './schedule'
import { connect } from 'react-redux'
import {Event, AlternativeEvents, SingleEvent} from './schedule-types-constants'
import {getRoutineChildrenOrRoot, getRoutine, getDurationInMinutes} from '../helpers'
import {DEFAULT_ROUTINE_COLOR} from '../color-constants'

function processStatePlansToEvents(plans: Array<Plan>, routineFinder: (id: number) => Routine,
routineChildFinder: (id: number) => Array<Routine>): Array<Event> {
  const nestedEvents: Array<Array<SingleEvent>> = plans.map(p => {
    // each plan can have multiple repetitions
    return getDates(p).map(d => {
      const event: SingleEvent = {
        id: '' + p.id + d.end.valueOf() + d.end.valueOf(),
        parentPlanId: p.id,
        dateTimeStart: d.start,
        dateTimeEnd: d.end,
        duration: d.duration,
        title: getTitle(p, routineFinder),
        routines: getRoutines(p, routineChildFinder),
        color: getColor(p, routineFinder),
        type: 'single'
      };
      return event

    })
  })

  // thus the events have to be reduced
  const events = nestedEvents.reduce((a,b) => {
    return a.concat(b)
  })

  const withAlternatives = convertConflictsIntoAlternatives(events)
  return [...withAlternatives.alternativeEvents, ...withAlternatives.events]
}

function convertConflictsIntoAlternatives(events: Array<Event>): {
  events: Array<Event>, alternativeEvents: Array<AlternativeEvents>
} {
  let updatedEvents: Array<Array<Event>> = events.map(e => {
    // finding conflicting events
    const startWithin = events.filter(inConflict => (
      e.dateTimeStart.valueOf() <= inConflict.dateTimeStart.valueOf() && e.dateTimeEnd.valueOf() >= inConflict.dateTimeStart
    ))
    const endWithin = events.filter(inConflict => (
      e.dateTimeStart.valueOf() <= inConflict.dateTimeStart.valueOf() && e.dateTimeEnd.valueOf() >= inConflict.dateTimeStart
    ))

    // if no there are no conflicts, continue
    if (startWithin.length === 0 && endWithin.length === 0) {
      return []
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
      const newEvent: Event = {id: e.id + i, parentPlanId: e.parentPlanId,
        dateTimeStart: start, dateTimeEnd: end, type: 'single',
        title: e.title, routines: e.routines, color: e.color, duration: duration}
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

  return {events: normalEvents, alternativeEvents: alternativeEvents}
}

function getRoutines(plan: Plan, routineChildFinder): Array<Routine> {
  return routineChildFinder(plan.parentRoutineId)
}

function getDates(plan: Plan): Array<{start: Date, end: Date, duration: number}> {
  return plan.repetition.map((r: PlanRepetition) => {
    if (r.type === "weekly") {
      const start = getDateForWeeklyRepetition(r)
      const end = new Date(start.valueOf() + r.duration * 60 * 1000)
      return {start: start, end: end, duration: r.duration}
    } else {
      throw new Error("Not supported")
    }
  })
}
function getDateForWeeklyRepetition(r: WeeklyPlanRepetition): Date {
  const today = new Date()
  const dayOfWeek = today.getDay();
  const diff = r.weekday - dayOfWeek
  let projectBy = diff > 0 ? diff : (7 + diff)
  if (diff == 0) {
    projectBy = 0
  }
  const repeatOn = new Date()
  repeatOn.setDate(today.getDate() + projectBy)
  repeatOn.setHours(r.hour, r.minute, 0)
  return repeatOn
}

function getTitle(plan: Plan, routineFinder): string {
  return plan.title ? plan.title : routineFinder(plan.parentRoutineId).title
}

function getColor(plan: Plan, routineFinder): RoutineColor {
  const c = plan.color ? plan.color : routineFinder(plan.parentRoutineId).color
  return c ? c : DEFAULT_ROUTINE_COLOR
}


/* Redux */

function mapStateToProps(state: State) {
  function getParentRoutineById (routineId): Routine {
    const found = state.routines.find(r => (r.id === routineId))
    return found ? found : null
  }

  function getRoutineChildren(routineId): Array<Routine> {
    return getRoutineChildrenOrRoot(state, routineId)
  }

  return {
    dayStart: state.settings.dayLimits.start,
    dayEnd: state.settings.dayLimits.end,
    events: processStatePlansToEvents(state.plans, getParentRoutineById, getRoutineChildren)
  }
}

const ConnectedSchedule = connect(mapStateToProps)(Schedule)

export default ConnectedSchedule