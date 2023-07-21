import { useMutation } from "@tanstack/react-query"
import { submitGenaralReview } from "../services/auth.service"

const useSubmitGenaralReview = () => {
  const {
    data: _profile,
    error,
    isLoading,
    isError,
    mutateAsync: mutateSubmitGenaralReview
  } = useMutation(submitGenaralReview, {
    mutationKey: ["submitGenaralReview"],
    retry: false,
    onSuccess(res) {
      if (res) {
        // router.push("/game-developer")
        const mode = `${process.env.NEXT_PUBLIC_GAME_DEVELOPER}`
        window.location.href = mode
      }
    }
  })

  return {
    _profile,
    error,
    isLoading,
    isError,
    mutateSubmitGenaralReview
  }
}

export default useSubmitGenaralReview
