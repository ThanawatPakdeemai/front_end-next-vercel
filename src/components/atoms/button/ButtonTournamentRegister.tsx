import React from "react"
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined"
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined"

interface IProp {
  time: boolean
  handleButton: () => void
}
const ButtonTournamentRegister = ({ time, handleButton }: IProp) => (
  <button
    onClick={() => handleButton()}
    type="button"
    className={`mb-4 flex w-full items-center
            justify-center rounded-full ${
              time
                ? "bg-secondary-main hover:bg-secondary-main "
                : "border-2 border-neutral-600   bg-neutral-780"
            }
             p-4  text-center text-[#E1E2E2] hover:rotate-0 `}
  >
    {time ? <CreateOutlinedIcon /> : <ClearOutlinedIcon />}
    <p className="ml-4 uppercase">Register</p>
  </button>
)
export default ButtonTournamentRegister
