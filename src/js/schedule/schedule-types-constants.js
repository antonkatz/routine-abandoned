/**
 * @flow
 * */
import type {RoutineColor} from '../color-constants'
import type {State, Plan, Routine, PlanRepetition, WeeklyPlanRepetition} from '../redux/store'



export type Event = {
  +id: string, +type: 'single' | 'alternative',
  +dateTimeStart: Date, +dateTimeEnd: Date, +duration: number
}

export type SingleEvent = Event & {
  parentPlanId: ?number, type: 'single',
  title: string, routines: Array<Routine>, color: RoutineColor
}

export type AlternativeEvents =  Event & {
  alternatives: Array<Event>, type: 'alternative'
}

export const FREE_TIME_EVENT_TITLE = 'free time'
