import GamePageLayout from "@components/templates/GamePageLayout"
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
  return <GamePageLayout>{page}</GamePageLayout>
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
