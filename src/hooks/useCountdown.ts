import { useEffect, useState } from "react"

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / 86400000)
  const hours = Math.floor((countDown % 86400000) / 3600000)
  const minutes = Math.floor((countDown % 3600000) / 60000)
  const seconds = Math.floor((countDown % 60000) / 1000)

  return [days, hours, minutes, seconds]
}

const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime()

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [countDownDate])

  return getReturnValues(countDown)
}

export { useCountdown }
