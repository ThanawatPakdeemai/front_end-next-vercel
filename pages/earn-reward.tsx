import React, { ReactElement } from "react"
import { ITEM_REWARD_CRUMB } from "@configs/crumb"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"

const ProfileLayout = dynamic(
  () => import("@components/templates/ProfileLayout"),
  {
    suspense: true
  }
)
const EarnRewardPage = dynamic(() => import("@feature/page/EarnRewardPage"), {
  suspense: true
})

export default function EarnReward() {
  return (
    <>
      <article className="flex h-full w-full justify-center">
        <EarnRewardPage />
      </article>
    </>
  )
}

EarnReward.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout _breadcrumb={ITEM_REWARD_CRUMB()}>{page}</ProfileLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
