import LogoIcon from "@components/icons/LogoIcon"
import { Button } from "@mui/material"
import useProfileStore from "@stores/profileStore"

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
          {showIcon && (
            <LogoIcon
              className="fill-gray-opacity-logo mr-2"
              width={32}
              height={15}
              fill="rgba(0, 0, 0, 0.261)"
            />
          )}
          {text}
        </Button>
      )}
    </>
  )
}
export default ButtonGold
