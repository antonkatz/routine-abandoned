//@flow
/**
 * Created by anton on 18/07/17.
 */

const ADD_ROUTINE = 'ADD_ROUTINE';

export type AddRoutineAction = {type: ADD_ROUTINE, title: string};

export type Action = AddRoutineAction

function addRoutine(title: string): AddRoutineAction {
  return {type: ADD_ROUTINE, title: title}
}

export {ADD_ROUTINE, addRoutine}