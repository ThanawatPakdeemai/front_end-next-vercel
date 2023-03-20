import React, { ReactElement } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

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
  // console.log("router", email, token)

  return (
    <>
      <article className="h-full w-full">
        <FromCreatePassword
          email={email as string}
          token={token as string}
        />
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
