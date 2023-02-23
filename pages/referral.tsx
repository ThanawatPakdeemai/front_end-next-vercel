import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"
import dynamic from "next/dynamic"

const ReferralProgramPage = dynamic(
  () => import("@feature/page/ReferralProgramPage")
)
const ServicesPageLayout = dynamic(
  () => import("@components/templates/ServicesPageLayout")
)

export default function Referral() {
  return (
    <>
      <article className="h-full w-full">
        <ReferralProgramPage />
      </article>
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
