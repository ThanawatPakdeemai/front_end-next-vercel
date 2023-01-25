import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import BlogLayout from "@components/template/BlogLayout"
import BlogListPage from "@feature/page/BlogListPage"

export default function BlogPage() {
  return (
    <>
      <article className="h-full w-full">
        <BlogListPage />
      </article>
    </>
  )
}

BlogPage.getLayout = function getLayout(page: ReactElement) {
  return <BlogLayout>{page}</BlogLayout>
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
