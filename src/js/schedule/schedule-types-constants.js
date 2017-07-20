/**
 * @flow
 * */
import type {RoutineColor} from '../routines/routine-colors'
import type {State, Plan, Routine, PlanRepetition, WeeklyPlanRepetition} from '../redux/store'

export type Event = {
  +dateTimeStart: Date, dateTimeEnd: Date, title: string, routines: Array<Routine>, color: RoutineColor, duration: number
}

export const FREE_TIME_EVENT_TITLE = 'free time'