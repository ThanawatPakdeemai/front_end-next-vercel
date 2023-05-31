import React, { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import BecomeDeveloperTemplate from "@components/templates/BecomeDeveloperTemplate"

const BecomeDeveloperPage = dynamic(
  () => import("@feature/page/BecomeDeveloperPage")
)

const BecomeDeveloper = () => <BecomeDeveloperPage />

BecomeDeveloper.getLayout = function getLayout(page: ReactElement) {
  return <BecomeDeveloperTemplate>{page}</BecomeDeveloperTemplate>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  // const mode = process.env.NEXT_PUBLIC_MODE
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
    // redirect: {
    //   destination: mode === "production" ? "/" : "/become-developer"
    // }
  }
}

export default BecomeDeveloper
