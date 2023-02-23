import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"
import dynamic from "next/dynamic"

const ServicesPageLayout = dynamic(
  () => import("@components/templates/ServicesPageLayout")
)
const CouponPage = dynamic(() => import("@feature/page/CouponPage"))

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
