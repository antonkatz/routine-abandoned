/**
 * @flow
 * */

import type {State, Plan, Routine, PlanRepetition, WeeklyPlanRepetition} from '../redux/store'
import type {RoutineColor} from '../routines/routine-colors'
import Schedule from './schedule'
import { connect } from 'react-redux'
import {Event} from './schedule-types-constants'

function processStatePlansToEvents(plans: Array<Plan>, routineFinder: (id: number) => Routine): Array<Event> {
  const nestedEvents: Array<Array<Event>> = plans.map(p => {
    // each plan can have multiple repetitions
    return getDates(p).map(d => {
      const event: Event = {
        dateTimeStart: d.start,
        dateTimeEnd: d.end,
        duration: d.duration,
        title: getTitle(p, routineFinder),
        routines: [],
        color: getColor(p, routineFinder)
      };
      return event

    })
  })

  // thus the events have to be reduced
  return nestedEvents.reduce((a,b) => {
    return a.concat(b)
  })
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
  const projectBy = diff > 0 ? diff : (7 + diff)
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
  return c ? c : 'rgba(0,0,0,0)'
}


/* Redux */

function mapStateToProps(state: State) {
  function getParentRoutineById (routineId): Routine {
    const found = state.routines.find(r => (r.id === routineId))
    return found ? found : null
  }

  return {
    dayStart: state.settings.dayLimits.start,
    dayEnd: state.settings.dayLimits.end,
    events: processStatePlansToEvents(state.plans, getParentRoutineById)
  }
}

const ConnectedSchedule = connect(mapStateToProps)(Schedule)

export default ConnectedSchedule