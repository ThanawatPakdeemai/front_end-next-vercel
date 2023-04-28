import React, { ReactElement } from "react"
import { ITEM_REWARD_CRUMB } from "@configs/crumb"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import { BrowserView, MobileView } from "react-device-detect"

const ProfileLayout = dynamic(
  () => import("@components/templates/ProfileLayout"),
  {
    suspense: true,
    ssr: false
  }
)
const EarnRewardPage = dynamic(() => import("@feature/page/EarnRewardPage"), {
  suspense: true,
  ssr: false
})
const EarnRewardPageMobile = dynamic(
  () => import("@src/mobile/features/pages/EarnRewardPageMobile"),
  {
    suspense: true,
    ssr: false
  }
)

export default function EarnReward() {
  return (
    <>
      <article className="flex h-full w-full justify-center">
        <BrowserView>
          <EarnRewardPage />
        </BrowserView>
        <MobileView>
          <EarnRewardPageMobile />
        </MobileView>
      </article>
    </>
  )
}

EarnReward.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <ProfileLayout _breadcrumb={ITEM_REWARD_CRUMB()}>{page}</ProfileLayout>
    </>
  )
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
