import React, { useState } from "react"

const useReview = () => {
  const [message, setMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  /**
   * @description Handle submit comment
   */
  const onSubmitComment = () => {
    // TODO: Call API to submit comment
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  /**
   * @description Handle input text
   */
  const handleInputMessage = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onSubmitComment()
    }
  }

  return {
    handleInputMessage,
    setMessage,
    message,
    onSubmitComment,
    setLoading,
    loading
  }
}

export default useReview
