/**
 * Created by anton on 19/07/17.
 * @flow
 */

import React from 'react';
import RaisedButton from "material-ui/RaisedButton"
import {Link} from '../navigation/nav-import'
import {VIEW_ROUTINES_PATH} from '../navigation/constants'
import type {Goal, Routine} from '../redux/state'

const OpenRoutines = () => {
  return (
  <Link to={VIEW_ROUTINES_PATH}>
    <RaisedButton label="routines" primary={true}/>
  </Link>
  )
}

export const navigateToRoutineChildren = (routerHistory) => (r: Routine) => {
  routerHistory.push(`${VIEW_ROUTINES_PATH}${r.id}`)
}


export {OpenRoutines}