import React, { useMemo, useState } from "react"

const GameStatOverview = () => {
  const [data, setData] = useState<string>("")
  useMemo(() => {
    setData("This is test setting state")
  }, [])
  return (
    <div>
      <p>{data}</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
    </div>
  )
}

export default GameStatOverview
