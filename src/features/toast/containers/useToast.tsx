import React, { useCallback } from "react"
import toast from "react-hot-toast"
import { BaseToastComponent } from "../components"

const useToast = () => {
  const successToast = useCallback(
    (content: string) =>
      toast(
        (t) => (
          <BaseToastComponent
            onClose={() => toast.dismiss(t.id)}
            status="success"
            text={content}
          />
        ),
        {
          className: "toast toast--success"
        }
      ),
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
      toast(
        (t) => (
          <BaseToastComponent
            onClose={() => toast.dismiss(t.id)}
            status="warning"
            text={content}
          />
        ),
        {
          className: "toast toast--warning"
        }
      ),
    []
  )

  const errorToast = useCallback(
    (content: string) =>
      toast(
        (t) => (
          <BaseToastComponent
            onClose={() => toast.dismiss(t.id)}
            status="error"
            text={content}
          />
        ),
        {
          className: "toast toast--error"
        }
      ),
    []
  )

  const sampleToast = useCallback((content: string) => {
    toast(
      (t) => (
        <BaseToastComponent
          onClose={() => toast.dismiss(t.id)}
          status="inherit"
          text={content}
        />
      ),
      {
        className: "toast toast--sample"
      }
    )
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
