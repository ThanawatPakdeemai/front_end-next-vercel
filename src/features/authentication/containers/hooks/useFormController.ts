import { useState } from "react"

const useFormController = () => {
  // const patternCode = "[0-9]{1,6}"
  // const patternPasswordUppercase = /[A-Z]/
  const patternEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  // States
  const [emailCorrect, setEmailCorrect] = useState(true)

  /**
   * @description Check if email is correct
   * @param _email
   */
  const isEmail = (_email: string) => {
    if (patternEmail.test(_email)) {
      setEmailCorrect(true)
    } else {
      setEmailCorrect(false)
    }
  }

  const isName = (_name: string) => {
    if (_name.length > 0) {
      return true
    }
    return false
  }

  return { isEmail, emailCorrect, isName }
}

export default useFormController
