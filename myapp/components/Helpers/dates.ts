export function getWeeksBetween(d1, d2) {
  return Math.abs(Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000)))
}

export function getDaysBetween(d1, d2) {
  return Math.abs(Math.round((d2 - d1) / (24 * 60 * 60 * 1000)))
}

export function getHoursBetween(d1, d2) {
  return Math.abs(Math.round((d2 - d1) / (60 * 60 * 1000)))
}

export function getMinutesBetween(d1, d2) {
  return Math.abs(Math.round((d2 - d1) / (60 * 1000)))
}

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export function getDateAddedFormatted(d1, dateAdded) {
  const d2 = new Date(dateAdded)
  const minutesBetween = getMinutesBetween(d1, d2)
  if (minutesBetween < 60) {
    return minutesBetween + ' minutes ago'
  }
  const hoursBetween = getHoursBetween(d1, d2)
  if (hoursBetween < 24) {
    return hoursBetween + ' hours ago'
  }
  const daysBetween = getDaysBetween(d1, d2)
  if (daysBetween < 7) {
    return daysBetween + ' days ago'
  }
  const weeksBetween = getWeeksBetween(d1, d2)
  if (weeksBetween < 4) {
    return weeksBetween + ' weeks ago'
  }

  const date = dateAdded.split('T')[0]
  const [year, month, day] = date.split('-')
  return monthNames[month - 1] + ' ' + day + ', ' + year
}

export function getDateAddedFormattedShort(d1, dateAdded) {
  const d2 = new Date(dateAdded)
  const minutesBetween = getMinutesBetween(d1, d2)
  if (minutesBetween < 60) {
    return minutesBetween + ' m'
  }
  const hoursBetween = getHoursBetween(d1, d2)
  if (hoursBetween < 24) {
    return hoursBetween + ' hr'
  }
  const daysBetween = getDaysBetween(d1, d2)
  if (daysBetween < 7) {
    return daysBetween + ' d'
  }
  const weeksBetween = getWeeksBetween(d1, d2)
  if (weeksBetween < 4) {
    return weeksBetween + ' w'
  }

  const date = dateAdded.split('T')[0]
  const [year, month, day] = date.split('-')
  return monthNames[month - 1] + ' ' + day + ', ' + year
}
