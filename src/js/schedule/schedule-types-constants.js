/**
 * @flow
 * */
import type {RoutineColor} from '../color-constants'
import type {State, Plan, Routine, PlanRepetition, WeeklyPlanRepetition} from '../redux/state'
import {StyleSheet} from 'react-native'


export type Event = {
  +id: string, +type: 'single' | 'alternative',
  +dateTimeStart: Date, +dateTimeEnd: Date, +duration: number, isRoot: boolean, dom: Array
}

export type SingleEvent = Event & {
  parentPlanId: number, parentRepetitionId: string, parentEventId: string, type: 'single',
  title: string, routines: Array<Routine>, color: RoutineColor, editMode: boolean
}

export type AlternativeEvents =  Event & {
  alternatives: Array<Event>, type: 'alternative'
}

export const FREE_TIME_EVENT_TITLE = 'free time'


export const eventStyles = StyleSheet.create({
  outerContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: "flex-start"
  },
  innerContainer: {
    flexShrink: 1,
    flexGrow: 1,
  },
  colorBar: {
    flexShrink: 1,
    flexGrow: 0,
    width: 10,
    borderColor: "black",
    borderStyle: "solid"
  }
})