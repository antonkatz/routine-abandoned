//@flow

export function minutesToDisplayTime(minutes: number): string {
  const fullHours = Math.floor(minutes / 60)
  const leftOverMinutes = minutes % 60
  const hoursStr = fullHours >= 1 ? fullHours + "h " : ""
  return hoursStr + leftOverMinutes + "min"
}