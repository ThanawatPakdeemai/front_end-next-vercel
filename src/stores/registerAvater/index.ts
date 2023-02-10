import { create } from "zustand"
import configZustandDevTools from "@src/utils/configDevtools"
import { devtools } from "zustand/middleware"

interface IZustandRegister {
  submitSuccess: boolean
  setRegisterSubmit: () => void
}

const useRegisterAvatarStore = create<IZustandRegister>()(
  devtools(
    (set) => ({
      submitSuccess: false,
      setRegisterSubmit: () => {
        set(() => ({ submitSuccess: true }))
      }
    }),
    configZustandDevTools("RegisterAvatar-Store")
  )
)

export default useRegisterAvatarStore
