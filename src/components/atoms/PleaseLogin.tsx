import RightMenuNotLogIn from "@components/molecules/rightMenu/RightMenuNotLogIn"
import { memo } from "react"

const PleaseLogin = () => (
  <>
    <div className=" flex w-full items-center justify-center">
      <div>
        <p className="py-5 text-center">Wait design. Login Please</p>
        <RightMenuNotLogIn />
      </div>
    </div>
  </>
)

export default memo(PleaseLogin)
