import React from "react"
import dynamic from "next/dynamic"

const Image = dynamic(
  () => import("@components/atoms/image/index").then((mod) => mod.Image),
  {
    suspense: true,
    ssr: true
  }
)

export interface IBlogBodyProps {
  image?: string
  description?: string
  content?: string
}

const BlogContent = ({ image, description, content }: IBlogBodyProps) => (
  <div className="mx-auto w-full p-[30px] md:max-w-[678px] lg:mx-0 lg:mt-10 lg:p-0 xl:mr-10 xl:p-5">
    <div className="h-auto justify-center">
      {image && (
        <Image
          src={image}
          alt={description || ""}
          width={1000}
          height={1000}
          className="rounded-2xl"
        />
      )}
    </div>
    {description && (
      <div className="my-[40px] text-left font-neue-machina text-default uppercase text-white-primary ">
        {description}
      </div>
    )}
    {content && (
      <div
        className="content-blog mb-24 text-left font-neue-machina text-default text-grey-neutral04"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: content || ""
        }}
      />
    )}
  </div>
)

export default BlogContent
