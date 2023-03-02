import type { GetServerSideProps, NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const P2PLandPage: NextPage = () => <></>

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await serverSideTranslations(ctx.locale!, ["common"]))
  },
  redirect: {
    source: "/marketplace/p2p",
    destination: `/${ctx.locale!}/marketplace/p2p/land`,
    permanent: true
  }
})

export default P2PLandPage
