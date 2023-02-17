import create from "zustand"
import configZustandDevTools from "@src/utils/configDevtools"
import { devtools } from "zustand/middleware"

interface IZustandRegister {
  onSubmitClickRegister: boolean
  setOnSubmitClickRegister: (_toggle: boolean) => void
}

const useRegisterAvatarStore = create<IZustandRegister>()(
  devtools(
    (set) => ({
      onSubmitClickRegister: false,
      setOnSubmitClickRegister: (_toggle: boolean) => {
        set(() => ({ onSubmitClickRegister: _toggle }))
      }
    }),
    configZustandDevTools("RegisterAvatar-Store")
  )
)

export default useRegisterAvatarStore
