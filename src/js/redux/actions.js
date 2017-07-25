//@flow
/**
 * Created by anton on 18/07/17.
 */

const ADD_ROUTINE = 'ADD_ROUTINE';

export type AddRoutineAction = {type: 'ADD_ROUTINE', title: string, parentId: number};

export type Action = {type: string}

function addRoutine(parentId: number, title: string): AddRoutineAction {
  return {type: ADD_ROUTINE, title: title, parentId: parentId}
}

export {ADD_ROUTINE, addRoutine}