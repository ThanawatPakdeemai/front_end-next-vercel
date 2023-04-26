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

// FIXME Boy: เดี๋ยวกลับมาทำ ขอเอาขึ้นก่อน

const GameItemSingleCardCopy = ({
  itemId,
  image,
  name,
  width = 75,
  height = 75,
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
    <div className="flex h-[100px] w-[70px] flex-col items-center justify-center">
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

export default GameItemSingleCardCopy
