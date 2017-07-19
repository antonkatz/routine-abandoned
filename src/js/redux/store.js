//@flow
/**
 * Created by anton on 18/07/17.
 */

export type Routine = {
  +id: number, +title: string, +parentId: ?number
}

export type State = {
  +routines: Array<Routine>
}

export const testData: State = {
  routines: [{id: 1, title: "yoga", parentId: null},
    {id: 2, title: "rt ch 2", parentId: 1},
    {id: 3, title: "rt ch 3", parentId: 1}],
}