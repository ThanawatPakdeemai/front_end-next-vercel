/* eslint-disable no-nested-ternary */
/* eslint-disable radix */
/* eslint-disable no-use-before-define */

import dayjs from "dayjs"
import { memo, useEffect, useMemo, useState } from "react"

export interface ITimer {
  start_time: Date
  end_time: Date
  showDay?: boolean
  // showIcon?: boolean
  className?: string
  showDayNumber?: boolean
}

const Timer = ({
  start_time,
  end_time,
  showDay,
  // showIcon = false,
  className,
  showDayNumber = false
}: ITimer) => {
  const [countdownTime, setCountdownTime] = useState(0)
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
  const [daysLeft, setDaysLeft] = useState<number>(0)
  // eslint-disable-next-line no-unused-vars
  const [hoursLeft, setHoursLeft] = useState<number>(0)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let timeOutId: any = 0
  const timeValue = useMemo(() => {
    let diffInSeconds =
      Math.abs(end_time.getTime() - start_time.getTime()) / 1000

    // calculate hour
    const hours = Math.floor(diffInSeconds / 3600) % 24
    diffInSeconds -= hours * 3600

    setHoursLeft(hours)

    const days = dayjs(end_time).diff(dayjs(start_time), "days")
    setDaysLeft(days)

    // calculate minutes
    const minutes = Math.floor(diffInSeconds / 60) % 60
    diffInSeconds -= minutes * 60

    // calculate second
    const seconds = Math.floor(diffInSeconds / 1)

    const timerValue: { hours: number; minutes: number; seconds: number } = {
      hours,
      minutes,
      seconds
    }
    return timerValue
  }, [start_time, end_time])

  function calculateTimeLeft() {
    const currDate = new Date().getTime()
    const difference = end_time.getTime() - currDate
    const timeDiff: { hours: string; minutes: string; seconds: string } = {
      hours: (difference > 0
        ? showDay || showDayNumber
          ? Math.floor((difference / (1000 * 60 * 60)) % 24)
          : Math.floor(difference / (1000 * 60 * 60))
        : 0
      ).toString(),
      minutes: (difference > 0
        ? Math.floor((difference / 1000 / 60) % 60)
        : 0
      ).toString(),
      seconds: (difference > 0
        ? Math.floor((difference / 1000) % 60)
        : 0
      ).toString()
    }
    timeDiff.hours =
      parseInt(timeDiff.hours) < 10 ? `0${timeDiff.hours}` : `${timeDiff.hours}`
    timeDiff.minutes =
      parseInt(timeDiff.minutes) < 10
        ? `0${timeDiff.minutes}`
        : `${timeDiff.minutes}`
    timeDiff.seconds =
      parseInt(timeDiff.seconds) < 10
        ? `0${timeDiff.seconds}`
        : `${timeDiff.seconds}`
    return timeDiff
  }

  useEffect(() => {
    setTimeLeft(calculateTimeLeft())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start_time, end_time])

  useEffect(() => {
    let expectedTime = new Date().getTime()
    const { hours, minutes, seconds } = timeValue
    expectedTime += hours > 0 ? hours * 3600000 : 0
    expectedTime += minutes > 0 ? minutes * 60000 : 0
    expectedTime += seconds > 0 ? seconds * 1000 : 0
    setCountdownTime(expectedTime)
    return () => {
      expectedTime = 0
    }
  }, [timeValue])

  useEffect(() => {
    if (countdownTime > new Date().getTime()) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeOutId = setTimeout(() => {
        setTimeLeft(calculateTimeLeft())
      }, 1000)
    }
    return () => {
      clearTimeout(timeOutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [new Date()])

  return (
    <>
      {showDay && daysLeft > 1 && (
        <p className="days font-dogicapixel text-md text-white m-0 mx-2 h-auto p-0 text-center">{`${daysLeft} days`}</p>
      )}
      <div className={className}>
        <span className="days">{`${
          daysLeft.toString().length === 1 ? `0${daysLeft}` : daysLeft
        } Day ${daysLeft > 1 ? "s" : ""}: `}</span>
        <span className="hours">{`${timeLeft.hours}:`}</span>
        <span className="minutes">{`${timeLeft.minutes}:`}</span>
        <span className="seconds">{`${timeLeft.seconds}`}</span>
      </div>
    </>
  )
}

export default memo(Timer)
