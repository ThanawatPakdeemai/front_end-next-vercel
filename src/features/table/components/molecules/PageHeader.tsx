import React from "react"

interface IPageHeaderTableProps {
  title?: string | null
  subtitle?: string | null
  children?: React.ReactNode
  button?: React.ReactNode
}

const PageHeader = ({
  title,
  subtitle,
  children,
  button
}: IPageHeaderTableProps) => (
  <div className="page-header my-2 flex items-center justify-center md:my-0 md:mb-8 md:justify-between">
    <div className="page-header__title max-w-md">
      {title && (
        <h2 className="my-1 font-neue-machina text-default uppercase text-primary-contrastText">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="font-neue-machina text-xs uppercase text-neutral-600">
          {subtitle}
        </p>
      )}
    </div>
    <div className="page-header__actions">
      {children || null}
      {button || null}
    </div>
  </div>
)
export default PageHeader
