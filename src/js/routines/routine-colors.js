/** @flow */
import {
  red900, pink900, purple900, deepPurple900, indigo900, blue900, cyan900, teal900, green900, lightGreen900,
  lime900, yellow900, orange900, deepOrange900, brown900, blueGrey900, grey800, black, white
} from 'material-ui/styles/colors';

export type RoutineColor = string

export const ROUTINE_COLORS: Array<RoutineColor> = [red900, pink900, purple900, deepPurple900, indigo900, blue900, cyan900, teal900, green900, lightGreen900,
  lime900, yellow900, orange900, deepOrange900, brown900, blueGrey900, grey800, black, white];

export const DEFAULT_ROUTINE_COLOR = white

export function getAvatarTextColor(color: RoutineColor) {
  if (color === white) {
    return black
  } else {
    return white
  }
}