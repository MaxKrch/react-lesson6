import getClockAngles from './get-clock-angles'

describe('Helper: getClockAngles ', () => {
  it('should return correctly angles for date 12:00:00', () => {
    const date = new Date('2020-01-01T12:00:00Z') // 12 часов
    const angles = getClockAngles(date)
    expect(angles).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
  })

  it('should return correctly angles for date 3:15:30', () => {
    const date = new Date('2020-01-01T03:15:30Z')
    const angles = getClockAngles(date)

    // часы: 3 * 30 + 15 * (30 / 60) = 90 + 7.5 = 97.5
    // минуты: 15 * 6 + 30 * (6 / 60) = 90 + 3 = 93
    // секунды: 30 * 6 = 180

    expect(angles).toEqual({
      hours: 97.5,
      minutes: 93,
      seconds: 180,
    })
  })
})
