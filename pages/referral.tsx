import ServicesPageLayout from "@components/templates/ServicesPageLayout"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"
import ReferralProgramPage from "@feature/page/ReferralProgramPage"

export default function Referral() {
  return (
    <>
      {/* <article className="h-full w-full">COMMING SOON</article> */}
      <ReferralProgramPage />
    </>
  )
}

Referral.getLayout = function getLayout(page: ReactElement) {
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
