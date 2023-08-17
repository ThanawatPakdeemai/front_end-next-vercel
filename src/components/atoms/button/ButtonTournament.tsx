import React from "react"
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined"

const ButtonTournament = ({ time }: any) => (
  <button
    type="button"
    aria-label="Register Button"
    className={`mb-4 flex w-full items-center justify-center
            rounded-[19px] p-4 ${
              time
                ? "bg-error-main  hover:bg-error-main"
                : "border-2   border-neutral-700 bg-neutral-800"
            }
             text-center  text-[#E1E2E2] hover:rotate-0 `}
  >
    <NoteAddOutlinedIcon />
    <p className="ml-4 uppercase">
      {time ? "Registration now open!" : "Registration Closed!"}
    </p>
  </button>
)
export default ButtonTournament
