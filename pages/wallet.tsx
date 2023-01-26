import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import ProfiileLayout from "@components/template/ProfiileLayout"
import WalletPage from "@feature/page/WalletPage"

export default function Wallet() {
  return (
    <>
      <article className="h-full w-full">
        <WalletPage />
      </article>
    </>
  )
}

Wallet.getLayout = function getLayout(page: ReactElement) {
  return <ProfiileLayout>{page}</ProfiileLayout>
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
