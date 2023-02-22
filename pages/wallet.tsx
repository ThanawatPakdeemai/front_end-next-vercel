import React, { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import ProfileLayout from "@components/templates/ProfileLayout"
import WalletPage from "@feature/page/WalletPage"

export default function Wallet() {
  return (
    <article className="h-full w-full md:pl-[10%]">
      <WalletPage />
    </article>
  )
}

Wallet.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
