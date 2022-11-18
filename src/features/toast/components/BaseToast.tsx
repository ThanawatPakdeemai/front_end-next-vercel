import React from "react"

interface IToastProps {
  type?: "success" | "info" | "warning" | "error" | "default"
  onClose?: () => void
  typeIcon: React.ReactNode
  closeButtonIcon: React.ReactNode
  content: string
}
function BaseToastComponent({
  type = "default",
  onClose,
  typeIcon: iconType,
  closeButtonIcon: iconCloseButton,
  content
}: IToastProps) {
  const toastTyoe: Record<typeof type, string> = {
    "success": "border-[#189661] bg-primary-02 text-neutral-07",
    "info": "border-[#1A4ED3] bg-primary-01 text-neutral-01",
    "warning": "border-[#c39a09] bg-primary-04 text-neutral-07",
    "error": "border-primary-03 bg-[#FA4339] text-neutral-01",
    "default": "border-neutral-03 bg-neutral-00 text-neutral-07"
  }
  return (
    <div
      className={`xxl:min-w-[225px] rounded-5xl flex h-auto min-h-[56px] min-w-[125px] max-w-[564px] justify-between gap-4 border-2 py-4 px-6 xl:min-w-[175px] ${toastTyoe[type]}`}
    >
      <div className="h-7 w-7 ">{iconType}</div>
      <div className="text-base1-demi flex-grow text-lg">{content}</div>
      {onClose && (
        <div className="flex h-7 w-7 items-center justify-center ">
          <button
            type="button"
            onClick={() => onClose()}
            className="transition-all hover:scale-110"
          >
            {iconCloseButton}
          </button>
        </div>
      )}
    </div>
  )
}

export default BaseToastComponent
