import React, { useEffect } from "react"
import useFormLoginController from "@feature/authentication/containers/hooks/useFormLoginController"
import useLoginTypeStore from "@stores/loginTypes"
import { useSession } from "next-auth/react"

const LoginManage = () => {
  const { getClickLoginTypes: loginTypes } = useLoginTypeStore()
  const { data: session, status } = useSession()
  const { googleLogin, discordLogin, twitterLogin, facebookLogin } =
    useFormLoginController()
  const handleLogin = () => {
    if (session && status === "authenticated" && loginTypes !== "") {
      switch (loginTypes) {
        case "google":
          googleLogin()
          break
        case "discord":
          discordLogin()
          break
        case "twitter":
          twitterLogin()
          break
        case "facebook":
          facebookLogin()
          break
        default:
          // Handle unknown login type
          break
      }
    }
  }

  useEffect(() => {
    let load = false
    if (!load) {
      handleLogin()
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status, loginTypes])

  return <></>
}

export default LoginManage
