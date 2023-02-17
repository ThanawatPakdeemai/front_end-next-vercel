import ServicesPageLayout from "@components/templates/ServicesPageLayout"
import { COUPON_BANNER } from "@constants/servicesBanner"
import CouponPage from "@feature/page/CouponPage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"

export default function Coupon() {
  return (
    <>
      <article className="h-full w-full">
        <CouponPage />
      </article>
    </>
  )
}

Coupon.getLayout = function getLayout(page: ReactElement) {
  return <ServicesPageLayout banner={COUPON_BANNER}>{page}</ServicesPageLayout>
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
