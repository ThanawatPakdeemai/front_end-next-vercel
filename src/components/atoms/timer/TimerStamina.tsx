import dayjs from "dayjs"
import React, { useEffect, useState } from "react"

interface IProps {
  time: Date
  show: boolean
  setShow: (_value: boolean) => void
}

const TimerStamina = ({ time, show, setShow }: IProps) => {
  const [timer, setTimer] = useState<string | null>(null)

  const displayTimer = (_time: number) => {
    if (_time > 9) {
      return `${_time}`
    }
    return `0${_time}`
  }

  const onTimeChanged = () => {
    const date1 = dayjs(time)
    const date2 = dayjs()

    const hour = date2.diff(date1, "hours")
    const hours = hour * -1

    const mins = date2.diff(date1, "minutes")
    const minutes = (mins % 60) * -1

    const sec = date2.diff(date1, "seconds")
    const seconds = (sec % 60) * -1

    if (seconds >= 0) {
      setTimer(
        `${displayTimer(hours)}:${displayTimer(minutes)}:${displayTimer(
          seconds
        )}`
      )
      setShow(true)
    } else {
      setShow(false)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      onTimeChanged()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return show ? (
    <div className="flex w-fit items-center justify-center rounded-less border-[1px] border-grey-900 px-2 tracking-wider">
      {timer}
    </div>
  ) : (
    <></>
  )
}
export default TimerStamina
