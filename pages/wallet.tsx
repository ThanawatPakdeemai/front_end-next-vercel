import React, { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import LeftSidebarLayout from "@components/template/LeftSidebarLayout"
import TransactionTable from "@feature/transaction/components/molecules/TransactionTable"

export default function Wallet() {
  return (
    <article className="h-full w-full">
      <TransactionTable />
    </article>
  )
}

Wallet.getLayout = function getLayout(page: ReactElement) {
  return <LeftSidebarLayout>{page}</LeftSidebarLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
