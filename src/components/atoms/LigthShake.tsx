import React, { useCallback, useEffect, useState } from "react"

interface IShakeIcone {
  iconArray: React.ReactNode[]
  second: number
}

const ShakeIcon = ({ iconArray, second }: IShakeIcone) => {
  const [newImage, setnewImage] = useState<React.ReactNode>()

  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * iconArray.length)
    setnewImage(iconArray[index])
  }, [iconArray])

  useEffect(() => {
    const interval = setInterval(() => {
      shuffle()
    }, second)

    return () => clearInterval(interval)
  }, [second, shuffle])
  return <div>{newImage}</div>
}

export default ShakeIcon
