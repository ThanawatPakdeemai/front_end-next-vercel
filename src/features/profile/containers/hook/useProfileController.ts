import { IProfile } from "@feature/profile/interfaces/IProfileService"
import useLoadingStore from "@stores/loading"
import useProfileStore from "@stores/profileStore"
import { useCallback } from "react"
import {
  getProfileByEmail,
  updateWalletAddress
} from "@feature/profile/containers/services/profile.service"
import toast from "react-hot-toast"

const useProfileController = () => {
  const { setClose, setOpen } = useLoadingStore()
  const { onSetProfileData, onSetProfileAddress } = useProfileStore()

  /**
   * @description Fetch profile by email
   */
  const fetchProfile = useCallback(
    async (_profile: IProfile, _refresh: boolean) => {
      await getProfileByEmail(_profile.email).then((_res) => {
        onSetProfileData(_res)
        onSetProfileAddress(_res.address)
        toast.dismiss()
        setClose()
        // setTimeout(() => {
        //   successToast(MESSAGES.success)
        // }, 500)
        if (_refresh) {
          setTimeout(() => {
            // eslint-disable-next-line no-use-before-define
            // handleConnectWallet()
            window.location.reload()
          }, 1000)
        }
      })
    },
    [onSetProfileData, onSetProfileAddress, setClose]
  )

  /**
   * @description Update wallet address if it's empty
   */
  const onUpdateWallet = useCallback(
    async (_profile: IProfile, _address: string) => {
      const data = {
        _email: _profile.email,
        _address
      }
      setOpen()
      await updateWalletAddress(data)
        .then(async (_resUpdate) => {
          if (_resUpdate) {
            await getProfileByEmail(_profile.email).then((_res) => {
              onSetProfileData(_res)
              onSetProfileAddress(_res.address)
              toast.dismiss()
              setClose()
              // setTimeout(() => {
              //   successToast(MESSAGES.success)
              // }, 500)
              setTimeout(() => {
                // eslint-disable-next-line no-use-before-define
                // handleConnectWallet()
                window.location.reload()
              }, 1000)
            })
          }
        })
        .catch(() => {
          setClose()
          toast.dismiss()
          // NOTE: Not necessary to show a response when error
          // setTimeout(() => {
          //   errorToast(err.message)
          // }, 1000)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSetProfileData, onSetProfileAddress]
  )

  return {
    fetchProfile,
    onUpdateWallet
  }
}

export default useProfileController
