/**
 * @flow
 */

import routineColors from '../routines/routine-colors'

export type Routine = {
  +id: number, +title: string, +parentId: ?number, +color?: routineColors, +description?: string,
  +goals: Goals
}

export type Goals = Array<Goal>

export type Goal = {
  daily: number, weekly: number
}

export type State = {
  +routines: Array<Routine>
}

export const testData: State = {
  routines: [{id: 1, title: "yoga", parentId: null},
    {id: 2, title: "rt ch 2", parentId: 1},
    {id: 3, title: "rt ch 3", parentId: 1}],
}