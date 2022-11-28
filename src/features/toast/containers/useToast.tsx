import IconInfo from "@components/icons/InfoIcon"
import CloseCircledIcon from "@components/icons/CloseCircledIcon"
import React, { useCallback } from "react"
import toast from "react-hot-toast"
import { BaseToastComponent } from "../components"

const useToast = () => {
  const successToast = useCallback((content: string) => {
    toast(
      (t) => (
        <BaseToastComponent
          type="success"
          onClose={() => toast.dismiss(t.id)}
          typeIcon={<IconInfo.Ori className="fill-neutral-07" />}
          closeButtonIcon={<CloseCircledIcon.Ori className="fill-neutral-07" />}
          content={content}
        />
      ),
      {
        id: `success-${new Date()}`
      }
    )
  }, [])
  const infoToast = useCallback((content: string) => {
    toast(
      (t) => (
        <BaseToastComponent
          type="info"
          onClose={() => toast.dismiss(t.id)}
          typeIcon={<IconInfo.Ori className="fill-neutral-01" />}
          closeButtonIcon={<CloseCircledIcon.Ori className="fill-neutral-01" />}
          content={content}
        />
      ),
      {
        id: `success-${new Date()}`
      }
    )
  }, [])

  const warnToast = useCallback((content: string) => {
    toast(
      (t) => (
        <BaseToastComponent
          type="warning"
          onClose={() => toast.dismiss(t.id)}
          typeIcon={<IconInfo.Ori className="fill-neutral-07" />}
          closeButtonIcon={<CloseCircledIcon.Ori className="fill-neutral-07" />}
          content={content}
        />
      ),
      {
        id: `success-${new Date()}`
      }
    )
  }, [])

  const errorToast = useCallback((content: string) => {
    toast(
      (t) => (
        <BaseToastComponent
          type="error"
          onClose={() => toast.dismiss(t.id)}
          typeIcon={<IconInfo.Ori className="fill-neutral-01" />}
          closeButtonIcon={<CloseCircledIcon.Ori className="fill-neutral-01" />}
          content={content}
        />
      ),
      {
        id: `success-${new Date()}`
      }
    )
  }, [])

  const sampleToast = useCallback((content: string) => {
    toast(
      (t) => (
        <BaseToastComponent
          type="default"
          onClose={() => toast.dismiss(t.id)}
          typeIcon={<IconInfo.Ori className="fill-neutral-07" />}
          closeButtonIcon={<CloseCircledIcon.Ori className="fill-neutral-07" />}
          content={content}
        />
      ),
      {
        id: `success-${new Date()}`
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
