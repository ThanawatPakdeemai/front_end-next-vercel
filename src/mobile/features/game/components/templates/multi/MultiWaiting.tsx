import useWaitingMulti from "@feature/game/containers/hooks/useWaitingMulti"

const MultiWaiting = () => {
  const { gameData } = useWaitingMulti()
  return <>{gameData && <>SingleWaiting</>}</>
}

export default MultiWaiting
