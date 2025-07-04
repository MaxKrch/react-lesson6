import { useEffect, useState } from 'react'
import getClockAngles from '../helpers/get-clock-angles'

const useWatch = (timeZoneShift: number) => {
  const [clockAngles, setClockAngles] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const setClockAnglesFn = () => {
      const now = new Date()
      const localDate = new Date(now.getTime() + timeZoneShift * 60 * 60 * 1000)

      setClockAngles(getClockAngles(localDate))
    }
    setClockAnglesFn()

    const interval = setInterval(() => setClockAnglesFn(), 1000)

    return () => clearInterval(interval)
  }, [timeZoneShift])

  return clockAngles
}

export default useWatch
