import { ReactElement } from "react"
import FromCreatePassword from "@feature/authentication/components/FromCreatePassword"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function CreatePassword() {
  return (
    <>
      <article className="h-full w-full">
        <FromCreatePassword />
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
