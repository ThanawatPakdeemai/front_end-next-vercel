import React, { useCallback } from "react"
import toast from "react-hot-toast"
import { BaseToastComponent } from "../components"

const useToast = () => {
  const successToast = useCallback(
    (content: string) =>
      toast((t) => (
        <BaseToastComponent
          onClose={() => toast.dismiss(t.id)}
          status="success"
          text={content}
        />
      )),
    []
  )
  const infoToast = useCallback(
    (content: string) =>
      toast((t) => (
        <BaseToastComponent
          onClose={() => toast.dismiss(t.id)}
          status="info"
          text={content}
        />
      )),
    []
  )

  const warnToast = useCallback(
    (content: string) =>
      toast((t) => (
        <BaseToastComponent
          onClose={() => toast.dismiss(t.id)}
          status="warning"
          text={content}
        />
      )),
    []
  )

  const errorToast = useCallback(
    (content: string) =>
      toast((t) => (
        <BaseToastComponent
          onClose={() => toast.dismiss(t.id)}
          status="error"
          text={content}
        />
      )),
    []
  )

  const sampleToast = useCallback((content: string) => {
    toast((t) => (
      <BaseToastComponent
        onClose={() => toast.dismiss(t.id)}
        status="inherit"
        text={content}
      />
    ))
  }, [])

  return {
    successToast,
    infoToast,
    warnToast,
    errorToast,
    sampleToast
  }
}

export default useToast
