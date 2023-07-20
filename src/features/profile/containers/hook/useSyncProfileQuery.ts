import {
  linkToDiscord,
  linkToFacebook,
  // linkToGoogle,
  linkToTelegram
} from "@feature/profile/containers/services/profile.service"
import { useMutation } from "@tanstack/react-query"

export const useLinkToTelegram = () => {
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

export const useLinkToFacebook = () => {
  const {
    data: dataLinkToFacebook,
    error: errorLinkToFacebook,
    isLoading: isLoadingLinkToFacebook,
    isError: isErrorLinkToFacebook,
    mutateAsync: mutateLinkToFacebook
  } = useMutation(linkToFacebook, {
    mutationKey: ["linkToFacebook"]
  })
  return {
    dataLinkToFacebook,
    errorLinkToFacebook,
    isLoadingLinkToFacebook,
    isErrorLinkToFacebook,
    mutateLinkToFacebook
  }
}

export const useLinkToDiscord = () => {
  const {
    data: dataLinkToDiscord,
    error: errorLinkToDiscord,
    isLoading: isLoadingLinkToDiscord,
    isError: isErrorLinkToDiscord,
    mutateAsync: mutateLinkToDiscord
  } = useMutation(linkToDiscord, {
    mutationKey: ["linkToDiscord"]
  })

  return {
    dataLinkToDiscord,
    errorLinkToDiscord,
    isLoadingLinkToDiscord,
    isErrorLinkToDiscord,
    mutateLinkToDiscord
  }
}

// export const useLinkToGoogle = () => {
//   const {
//     data: dataLinkToGoogle,
//     error: errorLinkToGoogle,
//     isLoading: isLoadingLinkToGoogle,
//     isError: isErrorLinkToGoogle,
//     mutateAsync: mutateLinkToGoogle
//   } = useMutation(linkToGoogle, {
//     mutationKey: ["linkToGoogle"]
//   })

//   return {
//     dataLinkToGoogle,
//     errorLinkToGoogle,
//     isLoadingLinkToGoogle,
//     isErrorLinkToGoogle,
//     mutateLinkToGoogle
//   }
// }
