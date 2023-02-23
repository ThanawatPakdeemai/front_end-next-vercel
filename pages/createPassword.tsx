import dynamic from "next/dynamic"
import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"

const FromCreatePassword = dynamic(
  () => import("@feature/authentication/components/FromCreatePassword")
)
export default function CreatePassword() {
  const router = useRouter()
  const { email, token } = router.query
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
