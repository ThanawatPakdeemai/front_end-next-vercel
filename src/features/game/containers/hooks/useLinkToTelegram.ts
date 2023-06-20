import { useMutation } from "@tanstack/react-query"
import { linkToTelegram } from "../services/game.service"

const useLinkToTelegram = () => {
  const {
    data: linkTelegramData,
    error,
    isLoading,
    isError,
    mutateAsync: mutateLinkToTelegram
  } = useMutation(linkToTelegram, {
    mutationKey: ["linkToTelegram"]
  })
  return {
    linkTelegramData,
    error,
    isLoading,
    isError,
    mutateLinkToTelegram
  }
}

export default useLinkToTelegram

// const useCreateNewPassword = () => {
//   const {
//     data: response,
//     error,
//     isLoading,
//     isError,
//     mutateAsync: mutateCreateNewPassword
//   } = useMutation(createNewPassword, {
//     mutationKey: ["createNewPassword"]
//   })

//   return {
//     response,
//     error,
//     isLoading,
//     isError,
//     mutateCreateNewPassword
//   }
// }

// export default useCreateNewPassword
