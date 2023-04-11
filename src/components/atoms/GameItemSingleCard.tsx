import React, { useMemo } from "react"
import { Image } from "@components/atoms/image"
import Link from "next/link"
import { useRouter } from "next/router"

interface IGameItemSingleCardProp {
  itemId: string
  image: string
  name: string
  width?: number
  height?: number
  description?: string
  showLink?: boolean
}
const GameItemSingleCard = ({
  itemId,
  image,
  name,
  width = 100,
  height = 100,
  description,
  showLink
}: IGameItemSingleCardProp) => {
  const router = useRouter()
  const { GameHome, typeGame } = router.query

  const _pathname = useMemo(
    () => `/${typeGame}/${GameHome}/roomlist?id=${itemId}`,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.query]
  )

  const renderContent = () => (
    <div className="flex h-[144px] w-[144px] flex-col items-center justify-center rounded-xl border-[1px] border-neutral-800 bg-neutral-900">
      <Image
        src={image}
        alt={name}
        width={name === "Bullet" ? 35 : width}
        height={height}
      />
      {description && (
        <div className="mt-3 text-sm uppercase">{description}</div>
      )}
    </div>
  )
  return showLink ? (
    <Link href={_pathname}>{renderContent()}</Link>
  ) : (
    renderContent()
  )
}

export default GameItemSingleCard
