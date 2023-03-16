import React, { useState } from "react"
import { CHAIN_LIST, IChainList } from "@configs/chain"
import { TGameType } from "@feature/game/interfaces/IGameService"
import useProfileStore from "@stores/profileStore"
import { useForm } from "react-hook-form"

export interface IFormJoinUsData {
  name: string
  email: string
  gameName: string
  gameType: TGameType
  gameDescription: string
  gameStatus: boolean
  chain: IChainList
  link: string
}

const useFormJoinUsController = () => {
  const profile = useProfileStore((state) => state.profile.data)

  // States
  const [valueRadio, setValueRadio] = useState<"yes" | "no">("yes")

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<IFormJoinUsData>({
    defaultValues: {
      name: profile ? profile.username : "",
      email: profile ? profile.email : "",
      gameName: "",
      gameType: "singleplayer",
      gameDescription: "",
      gameStatus: false,
      link: "",
      chain: CHAIN_LIST[0]
    }
  })

  /**
   * @description Handle change radio
   * @param event
   */
  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueRadio((event.target as HTMLInputElement).value as "yes" | "no")
    setValue("gameStatus", (event.target as HTMLInputElement).value === "yes")
  }

  /**
   * @description Handle submit form
   * @param _data
   */
  const onSubmitRegister = (_data: IFormJoinUsData) => {
    console.error("_data", _data)
  }

  return {
    onSubmitRegister,
    handleChangeRadio,
    valueRadio,
    setValueRadio,
    handleSubmit,
    register,
    setValue,
    control,
    errors
  }
}

export default useFormJoinUsController
