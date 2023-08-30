import React, { ReactElement } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

const FromCreatePassword = dynamic(
  () => import("@feature/authentication/components/FromCreatePassword"),
  {
    suspense: true,
    ssr: false
  }
)

export default function CreatePassword() {
  const router = useRouter()
  const { email, token } = router.query

  return (
    <>
      <article className="h-full w-full">
        <GoogleReCaptchaProvider
          reCaptchaKey={`${process.env.NEXT_PUBLIC_KEY_RECAPTCHA}`}
          scriptProps={{
            async: true,
            defer: false,
            appendTo: "head",
            nonce: undefined
          }}
        >
          <FromCreatePassword
            email={email as string}
            token={token as string}
          />
        </GoogleReCaptchaProvider>
      </article>
    </>
  )
}

CreatePassword.getLayout = function getLayout(page: ReactElement) {
  return page
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
