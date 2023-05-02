import useWaitingSingle from "@feature/game/containers/hooks/useWaitingSingle"

const SingleWaiting = () => {
  const { gameData } = useWaitingSingle()
  return <>{gameData && <>SingleWaiting</>}</>
}

export default SingleWaiting
