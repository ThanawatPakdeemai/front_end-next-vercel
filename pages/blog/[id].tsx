import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Layout } from "@components/template"
import { useRouter } from "next/router"
import BlogPageDetails from "@feature/page/blogs/BlogDetails"

export default function BlogDetails() {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <BlogPageDetails _blogId={id as string} />
    </>
  )
}

BlogDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
