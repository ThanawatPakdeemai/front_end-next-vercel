import React from "react"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"

const RefreshIcon = dynamic(() => import("@mui/icons-material/Refresh"), {
  suspense: true,
  ssr: false
})
const ImageCustom = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

interface ICardBuyItemHeaderProps {
  image: string
  name: string
  itemSize: string
  title?: string
  refresh?: () => void
}
const CardBuyItemHeader = ({
  image,
  name,
  itemSize,
  title,
  refresh
}: ICardBuyItemHeaderProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex h-10 w-10 flex-1 items-center justify-center rounded-lg bg-primary-main p-[10px]">
        <ImageCustom
          src={image}
          alt={name}
          width={60}
          height={60}
          className="h-full w-full object-contain opacity-50"
        />
      </div>
      <div className="h-10 w-[calc(100%-50px)] flex-1 rounded-xl bg-primary-main first-letter:my-2">
        <div className="flex w-[285px] items-center gap-1 p-[10px_14px] font-neue-machina-semi text-[14px] uppercase text-white-default">
          {title || t("my")}
          <div className="flex items-center text-purple-primary">
            <span className="ml-1">{itemSize}</span>
            <span className="ml-1">{t(name)}</span>
          </div>
          {refresh && (
            <RefreshIcon
              className="m-auto cursor-pointer"
              onClick={refresh}
            />
          )}
          {/* {t("bag")} */}
        </div>
      </div>
    </div>
  )
}

export default CardBuyItemHeader
