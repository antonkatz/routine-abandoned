/**
 * @flow
 */

import type {RoutineColor} from '../routines/routine-colors'
import {ROUTINE_COLORS} from '../routines/routine-colors'

/* COMMON */
export type TimePoint = {+hour: number, +minute: number}

/* ROUTINES */

/**
 * @property defaultDuration in minutes
 * */
export type Routine = {
  +id: number, +title: string, +parentId: ?number, +color?: RoutineColor, +description?: string,
  +goals: Goals, +defaultDuration: ?number
}

export type Goals = Array<Goal>

/** for now there is only one type of goal by time */
export type GoalType = "TIME"
export type GoalInterval = "daily" | "weekly"
export type Goal = {
  +quantity: number, +interval: GoalInterval, type: GoalType
}

export type RoutineStatType = "complete" | "incomplete" | "pending"
export type RoutineStat = {
  +routineId: number, type: string
}
export type RoutineStats = Array<RoutineStat>


/* SCHEDULE */


export type Plan = {+id: number, +parentRoutineId: number, +title?: string, +repetition: Array<PlanRepetition>,
  +color?: RoutineColor, +includeRoutines: Array<number>, +excludeRoutines: Array<number>,
  +includePlans: Array<Plan>
}

export type PlanRepetition = {type: string, +duration: number} & (DailyPlanRepetition | WeeklyPlanRepetition | SinglePlanRepetition)
/** @property weekday 0 is sunday */
export type WeeklyPlanRepetition = TimePoint & {+type: "weekly", +weekday: number}
export type DailyPlanRepetition = TimePoint & {+type: "daily", +from: Date, +every: number}
export type SinglePlanRepetition = TimePoint & {+type: "single", +datetime: Date}

/* STATE */

export type State = {
  +settings: {
    dayLimits: {start: TimePoint, end: TimePoint}
  },
  +routines: Array<Routine>,
  +routineStats: RoutineStats,
  +plans: Array<Plan>
}

export const testData: State = {
  settings: {
    dayLimits: {start: {hour: 5, minute: 0}, end: {hour: 20, minute: 30}}
  },
  routines: [{id: 1, title: "health", parentId: null, goals: [{quantity: 61, interval: "daily", type: "TIME"}]},
    {id: 2, title: "yoga", parentId: 1, goals: [{quantity: 45, interval: "weekly", type: "TIME"}],
    },
    {id: 3, title: "qigong", parentId: 1, goals: [], defaultDuration: 20},
    {id: 4, title: "chores", parentId: null, goals: [], color: ROUTINE_COLORS[0],
    description: "stuff around the house"},
    {id: 5, title: "acro", description: "partner yoga/acrobatics", parentId: 2,
      goals: [{quantity: 35, interval: "daily", type: "TIME"}, {quantity: 205, interval: "weekly", type: "TIME"}], color: ROUTINE_COLORS[5]},
    {id: 6, title: "morning stretches", description: "fast paced flow for the morning", parentId: 2,
      goals: [], color: ROUTINE_COLORS[6]}
  ],
  plans: [
    {id: 1, parentRoutineId: 1, includeRoutines: [], excludeRoutines: [], includePlans: [], repetition: [
      {type: "weekly", weekday: 1, hour: 17, minute: 50, duration: 90}
    ]}
  ]
}

//description: "lets add a long description and see how that affects the layout"