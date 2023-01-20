import React, { createContext, useContext } from "react"
import { IGameItem } from "@src/types/games"

interface Context {
  gameItemMultiple: IGameItem[]
  gameItemSelected: IGameItem | undefined
  setGameItemSelected: React.Dispatch<
    React.SetStateAction<IGameItem | undefined>
  >
  setGameItemMultiple: React.Dispatch<React.SetStateAction<IGameItem[]>>
}

const GameItemContext = createContext<Context>({
  gameItemMultiple: [],
  gameItemSelected: undefined,
  setGameItemSelected: () => undefined,
  setGameItemMultiple: () => []
})

export function useGameItemContext() {
  const context = useContext(GameItemContext)
  if (context === undefined) {
    throw new Error("Context must be used within a Provider")
  }
  return context
}
