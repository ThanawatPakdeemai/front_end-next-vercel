import {
  linkToFacebook,
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
