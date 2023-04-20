/* eslint-disable no-use-before-define */
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import useSubmitGenaralRreview from "@feature/authentication/containers/hooks/useSubmitGenaralReview"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import useFormController from "./useFormController"

export interface IFormJoinUsData {
  name: string
  player_type: string
  categories: Array<string>
  description: string
  short_detail: IProfileSubmitShort
  game_play_url: string
  how_to_play: string
  gameStatus: boolean
}

export interface IProfileSubmitShort {
  developer_name: string
  developer_email: string
  publisher: string
}

const useFormJoinUsController = () => {
  const { mutateSubmitGenaralReview } = useSubmitGenaralRreview()
  const { emailCorrect } = useFormController()
  const { errorToast, successToast } = useToast()

  // States
  const [valueRadio, setValueRadio] = useState<"yes" | "no">("yes")

  const JoinUsSchema = yup
    .object({
      name: yup.string().required(),
      player_type: yup.string().required(),
      categories: yup.array().min(1).required(),
      description: yup.string().required(),
      short_detail: yup.object().shape({
        developer_name: yup.string().required(),
        developer_email: yup.string().required(),
        publisher: yup.string().required()
      }),
      game_play_url: yup.string().required(),
      how_to_play: yup.string().required()
    })
    .required()

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors }
  } = useForm<IFormJoinUsData>({
    resolver: yupResolver(JoinUsSchema),
    defaultValues: {
      name: "",
      player_type: "singleplayer",
      categories: [],
      description: "",
      short_detail: {
        developer_name: "",
        developer_email: "",
        publisher: ""
      },
      game_play_url: "",
      how_to_play: "",
      gameStatus: false
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
  const onSubmitGenaralReview = (values: IFormJoinUsData) => {
    const {
      name,
      player_type,
      categories,
      description,
      short_detail,
      game_play_url,
      how_to_play
    } = values
    if (emailCorrect) {
      mutateSubmitGenaralReview({
        _name: name,
        _player_type: player_type,
        _categories: categories,
        _description: description,
        _short_detail: short_detail,
        _game_play_url: game_play_url,
        _how_to_play: how_to_play
      })
        .then((_res) => {
          if (_res) {
            successToast(MESSAGES.create_successful_user)
          }
        })
        .catch(() => {
          errorToast(MESSAGES.please_fill)
        })
    }
  }

  return {
    onSubmitGenaralReview,
    handleChangeRadio,
    valueRadio,
    setValueRadio,
    handleSubmit,
    register,
    setValue,
    control,
    watch,
    JoinUsSchema,
    errors
  }
}

export default useFormJoinUsController
