import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"

const Page = () => <></>

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    },
    redirect: {
      source: "/marketplace/inventory",
      destination: `/${locale}/marketplace/inventory/land`,
      permanent: true
    }
  }
}

export default Page
