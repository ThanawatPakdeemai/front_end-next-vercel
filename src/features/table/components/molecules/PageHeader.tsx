import React from "react"

interface IPageHeaderTableProps {
  title: string
  subtitle: string
  children?: React.ReactNode
}

const PageHeader = ({ title, subtitle, children }: IPageHeaderTableProps) => (
  <div className="page-header mb-8 flex items-center justify-between">
    <div className="page-header__title">
      <h2 className="my-1 font-neue-machina text-default uppercase text-primary-contrastText">
        {title}
      </h2>
      <p className="font-neue-machina text-xs uppercase text-neutral-600">
        {subtitle}
      </p>
    </div>
    <div className="page-header__actions">{children}</div>
  </div>
)
export default PageHeader
