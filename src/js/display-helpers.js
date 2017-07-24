//@flow

export function minutesToDisplayTime(minutes: number): string {
  const fullHours = Math.floor(minutes / 60)
  const leftOverMinutes = minutes % 60
  const hoursStr = fullHours >= 1 ? fullHours + "h " : ""
  return hoursStr + leftOverMinutes + "min"
}

export function dayOfWeekToText(day: number): string {
  switch (day) {
    case 0: return "Sun"
    case 1: return "Mon"
    case 2: return "Tues"
    case 3: return "Wed"
    case 4: return "Thurs"
    case 5: return "Fri"
    case 6: return "Sat"
    default: return ""
  }

}

export function displayTimePoint(date: Date): string {
  let minutes = date.getMinutes()
  let hours = date.getHours()
  minutes = (minutes < 10) ? "0" + minutes : minutes + ""
  hours = hours < 10 ? "0" + hours : "" + hours
  return (hours + ":" + minutes)
}