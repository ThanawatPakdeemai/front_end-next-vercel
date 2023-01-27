import ProfileLayout from "@components/template/ProfileLayout"
import { ITEM_REWARD_CRUMB } from "@configs/crumb"
import EarnRewardPage from "@feature/page/EarnRewardPage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactElement } from "react"

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
