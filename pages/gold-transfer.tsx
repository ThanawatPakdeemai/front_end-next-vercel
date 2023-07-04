import ProfileLayout from "@components/templates/ProfileLayout"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import { ReactElement } from "react"

const GoldTransferPage = dynamic(
  () => import("@feature/page/GoldTransferPage"),
  {
    suspense: true,
    ssr: false
  }
)
export default function GoldTransfer() {
  return (
    <article className="h-full w-full px-2 md:w-[calc(100%-220px)] md:px-0 xl:pl-[10%]">
      <GoldTransferPage />
    </article>
  )
}

GoldTransfer.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
