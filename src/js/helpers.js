// @flow


export function getDateWithSetTime(onDate: Date, hour: number, minutes: number): Date {
  const timed = new Date(onDate.valueOf())
  timed.setHours(hour, minutes, 0, 0)
  return timed
}