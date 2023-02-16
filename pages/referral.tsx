import ServicesPageLayout from "@components/templates/ServicesPageLayout"
import ReferralProgramPage from "@feature/page/ReferralProgramPage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"

export default function ReferralProgram() {
  return (
    <>
      <article className="h-full w-full">
        <ReferralProgramPage />
      </article>
    </>
  )
}

ReferralProgram.getLayout = function getLayout(page: ReactElement) {
  return <ServicesPageLayout>{page}</ServicesPageLayout>
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
