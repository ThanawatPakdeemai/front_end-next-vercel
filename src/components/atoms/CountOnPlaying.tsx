import React from "react"

interface IProps {
  count?: number
}
const CountOnPlaying = ({ count }: IProps) => (
  <>
    <div className="my-2 w-fit rounded-less border border-neutral-700 p-1 uppercase">
      play : {count ?? 0}
    </div>
  </>
)

export default CountOnPlaying
