import React, { useCallback, useEffect, useState } from "react"

interface IShakeIcone {
  iconArray: React.ReactNode[]
  second: number
}

export const ShakeIcon = ({ iconArray, second }: IShakeIcone) => {
  const [newImage, setnewImage] = useState<React.ReactNode>()

  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * iconArray.length)
    setnewImage(iconArray[index])
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      shuffle()
    }, second)

    return () => clearInterval(interval)
  }, [])
  return <div>{newImage}</div>
}
