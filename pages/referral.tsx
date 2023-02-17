import ServicesPageLayout from "@components/templates/ServicesPageLayout"
import { REFERRAL_BANNER } from "@constants/servicesBanner"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"

export default function Referral() {
  return (
    <>
      <article className="h-full w-full">COMMING SOON</article>
    </>
  )
}

Referral.getLayout = function getLayout(page: ReactElement) {
  return (
    <ServicesPageLayout banner={REFERRAL_BANNER}>{page}</ServicesPageLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
