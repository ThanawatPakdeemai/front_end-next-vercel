import React from "react"
import { Button } from "@mui/material"
import useProfileStore from "@stores/profileStore"
import dynamic from "next/dynamic"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IProps {
  onClick: () => void
  text: string
  className?: string
  showIcon?: boolean
}
const ButtonGold = ({ onClick, text, className, showIcon = false }: IProps) => {
  const profile = useProfileStore((state) => state.profile.data)
  return (
    <>
      {profile && (
        <Button
          className={`bg-transfer-gold flex h-[50px] items-center justify-center gap-2 text-primary-main hover:shadow-none ${className}`}
          onClick={onClick}
        >
          {showIcon && <Icomoon className="icon-Naka" />}
          {text}
        </Button>
      )}
    </>
  )
}
export default ButtonGold
