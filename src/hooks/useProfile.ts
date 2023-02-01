import axios from "axios"
import toast from "react-hot-toast"
// import { getAuth } from "firebase/auth"
// import { initializeApp } from "@firebase/app"

interface ILoginProvider {
  email: string | null
  provider: string
  providerUUID: string
  referral?: string | string[]
  prevPath?: string
}

interface IGameStatus {
  attribute: string
  value: number
  _id: string
}

interface IProfileRank {
  name: string
  score: number
  _id: string
  rank_id: string
  game_id: string
}

interface IProfile {
  game_status: IGameStatus[] | null | undefined
  status: number
  createdAt: Date
  updatedAt: Date
  banned: []
  ban_time: Date
  friend: []
  email: string
  nonce: number
  role: string
  is_active: boolean
  avatar: string
  username: string
  address: string
  ranks: IProfileRank[]
  id: string
  jwtToken: string
  subscription: boolean
  stamina_point: number
  total_stamina: number
  recovery_stamina_time: Date
  country: string
  user_ip_address: string
  max_exp: number
  exp: number
  level: number
}

interface IProfileResponse {
  status: number
  data: IProfile
  message: string
}

export const fetchProfile = async () =>
  axios
    .get<IProfileResponse>(`/profile/${localStorage.getItem("email")}`)
    .then((res) => ({
      data: res.data,
      status: true
    }))
    .catch((err) => ({
      data: err,
      status: false
    }))

const useProfile = () => {
  // const config = {
  //   apiKey: "AIzaSyAszETPfcbQt0gd2Ifpep83_C05zOt_k1c",
  //   authDomain: "able-study-326414.firebaseapp.com",
  //   projectId: "able-study-326414",
  //   storageBucket: "able-study-326414.appspot.com",
  //   messagingSenderId: "104862138123",
  //   appId: "1:104862138123:web:2e7578e0d8a80277052c0e",
  //   measurementId: "G-4NN0JPG9X4"
  // }

  // const app = initializeApp(config)
  // const auth = getAuth(app)

  /*
   * Call api user login
   */

  // eslint-disable-next-line global-require
  const _axios = require("axios").default

  const loginProvider = (data: ILoginProvider) => {
    // eslint-disable-next-line no-console
    console.log("test-loginProvider-data", data)

    _axios
      .fetch("post", `/auth/signin/with_provider`, { ...data }, null)
      ?.then(async (response: IProfileResponse) => {
        if (response.status === 200) {
          // eslint-disable-next-line no-console
          console.log("test-Logged in successfully")

          // toast.success("Logged in successfully")
          // localStorage.setItem("token", response.data.jwtToken)
          // localStorage.setItem("email", response.data.email)
          // localStorage.setItem("time", moment().format("YYYY-MM-DD HH:mm"))
          // axios.setBearer(response.data.jwtToken)

          // dispatch(LOGIN_USER())

          if (response) {
            const email = localStorage.getItem("email")
            if (email) {
              const _profile = await fetchProfile()
              if (_profile.status && _profile.data) {
                if (!_profile.data.user_ip_address) {
                  const _data = {
                    email: _profile.data.email,
                    username: _profile.data.username,
                    avatar: _profile.data.avatar,
                    subscription: _profile.data.subscription
                  }
                  // create(_data)
                  // eslint-disable-next-line prettier/prettier, no-console
                  console.log("test-call-func-create")
                }
                // await dispatch(LOGIN_USER_SUCCESS(_profile.data))
                // eslint-disable-next-line no-console
                console.log("test-redux-LOGIN_USER_SUCCESS")
              }
            }
          }

          if (
            response.data.avatar === undefined ||
            response.data.username === undefined
          ) {
            setTimeout(() => {
              // history.push("/create")
            }, 1000)
          } else {
            //   // history.push("/");
            await (window.location.href = data.prevPath
              ? `${data.prevPath}`
              : "/")
            // await history.push({
            //   ...history.location,
            //   pathname: data.prevPath ? `${data.prevPath}` : "/"
            // });
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 500) {
            toast.error("Something wrong")
          }
        } else if (error.request) {
          toast.error("Website is being updated. Please refresh in a moment.")
        } else {
          // If cannot login show error messages
          toast.error(error.message)
        }
      })
  }

  return {
    loginProvider
  }
}

export default useProfile
