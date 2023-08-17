import dynamic from "next/dynamic"
import React from "react"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: "like" | "unlike"
  active: boolean
  disabled?: boolean
}

const ButtonLike = ({
  type,
  active = false,
  className,
  onClick,
  disabled = false
}: IProps) => {
  const btnStyled =
    "rounded-[8px] flex h-10 min-w-[90px] items-center justify-center border-[1px] border-neutral-800 capitalize text-sm font-neue-machina"

  if (type === "unlike") {
    return (
      <button
        type="button"
        aria-label="no"
        className={`${className} ${btnStyled} ${
          active ? "!border-error-main text-error-main" : "text-neutral-500"
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        <Icomoon
          className={`icon-Unlike ${
            active ? "text-error-main" : "text-neutral-500"
          } mr-2`}
        />
        <p>no</p>
      </button>
    )
  }
  return (
    <button
      type="button"
      aria-label="yes"
      className={`${className} ${btnStyled} ${
        active
          ? "border-varidian-default text-varidian-default"
          : "text-neutral-500"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <Icomoon
        className={`icon-Like ${
          active ? "text-varidian-default" : "text-neutral-500"
        } mr-2`}
      />
      <p>yes</p>
    </button>
  )
}

export default ButtonLike
