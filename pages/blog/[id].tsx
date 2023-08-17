import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"

const BlogPageDetails = dynamic(
  () => import("@feature/page/blogs/BlogDetails"),
  {
    suspense: true,
    ssr: false
  }
)
const Layout = dynamic(() => import("@components/templates/Layout"), {
  suspense: true,
  ssr: false
})

export default function BlogDetails() {
  const router = useRouter()
  const { id } = router.query

  return <BlogPageDetails _blogId={id as string} />
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
