/**
 * Created by anton on 18/07/17.
 */

export type Routine = {
  +id: number, +title: string, +parent: number, +children: Array<number>
}

export type State = {
  +routines: Array<Routine>
}

export const testData: State = {
  routines: [{id: 1, title: "routine test", parent: null, children: [2, 3]},
    {id: 2, title: "rt ch 2", parent: 1, children: []},
    {id: 3, title: "rt ch 3", parent: 1, children: []}],
}