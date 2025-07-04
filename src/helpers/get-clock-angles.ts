const getClockAngles = (date: Date) => {
  const hours = date.getUTCHours() % 12
  const minutes = date.getUTCMinutes()
  const seconds = date.getUTCSeconds()

  return {
    hours: hours * 30 + minutes * (30 / 60),
    minutes: minutes * 6 + seconds * (6 / 60),
    seconds: seconds * 6,
  }
}

export default getClockAngles
