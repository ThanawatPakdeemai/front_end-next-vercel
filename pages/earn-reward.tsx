import { Layout } from "@components/template"
import EarnRewardPage from "@feature/page/EarnRewardPage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactElement } from "react"

export default function EarnReward() {
  return (
    <>
      <article className="h-full w-full">
        <EarnRewardPage />
      </article>
    </>
  )
}

EarnReward.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
