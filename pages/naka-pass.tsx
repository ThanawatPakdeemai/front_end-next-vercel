import React, { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import GamePageLayout from "@components/template/GamePageLayout"
import NakaPassPage from "@feature/page/NakaPassPage"

export default function NakaPass() {
  return (
    <article className="h-full w-full">
      <NakaPassPage />
    </article>
  )
}

NakaPass.getLayout = function getLayout(page: ReactElement) {
  return <GamePageLayout>{page}</GamePageLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
