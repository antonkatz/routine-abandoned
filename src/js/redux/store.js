/**
 * @flow
 */

import type {RoutineColor} from '../routines/routine-colors'
import {ROUTINE_COLORS} from '../routines/routine-colors'

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

export type State = {
  +routines: Array<Routine>,
  +routineStats: RoutineStats
}

export const testData: State = {
  routines: [{id: 1, title: "yoga", parentId: null, goals: [{quantity: 61, interval: "daily", type: "TIME"}]},
    {id: 2, title: "vinyasa", parentId: 1, goals: [{quantity: 45, interval: "weekly", type: "TIME"}],
    },
    {id: 3, title: "hatha", parentId: 1, goals: [], defaultDuration: 20},
    {id: 4, title: "chores", parentId: null, goals: [], color: ROUTINE_COLORS[0],
    description: "stuff around the house"},
    {id: 5, title: "sun salutations", description: "fast paced flow for the morning", parentId: 2,
      goals: [{quantity: 35, interval: "daily", type: "TIME"}, {quantity: 205, interval: "weekly", type: "TIME"}], color: ROUTINE_COLORS[5]},

  ],
}

//description: "lets add a long description and see how that affects the layout"