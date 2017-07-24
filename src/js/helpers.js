// @flow

import type {Routine} from './redux/store'

export function getDurationInMinutes(start: Date, end: Date): number {
  return Math.round((end.valueOf() - start.valueOf()) / 1000 / 60)
}

export function getDateWithSetTime(onDate: Date, hour: number, minutes: number): Date {
  const timed = new Date(onDate.valueOf())
  timed.setHours(hour, minutes, 0, 0)
  return timed
}

export function getRoutineChildrenOrRoot(state: State, id: ?number): Array<Routine> {
  if (!id) {
    return state.routines.filter((r) => {
      return !r.parentId
    })
  }
  return state.routines.filter((r) => {return r.parentId === id} );
}

export function getRoutine(state: State, id: number): Routine {
  if (id) {
    return state.routines.find(r => (r.id === id))
  } else {
    return null
  }
}
