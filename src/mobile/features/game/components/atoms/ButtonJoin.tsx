import { Button } from "@mui/material"

interface IProps {
  onClick?: () => void
}
const ButtonJoin = ({ onClick }: IProps) => (
  <>
    <Button
      onClick={onClick}
      className=" !h-[40px] !min-w-[90px] rounded-[20px] bg-green-lemon text-sm text-neutral-800 hover:bg-green-lemon"
    >
      Join
    </Button>
  </>
)

export default ButtonJoin
