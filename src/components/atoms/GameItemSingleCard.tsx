import React, { useCallback, useMemo } from "react"
import { Image } from "@components/atoms/image"
import Link from "next/link"
import { isMobile } from "@hooks/useGlobal"
import { useRouter } from "next/router"
import useGameStore from "@stores/game"

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
  const { GameHome, typeGame, slug } = router.query
  const game = useGameStore((state) => state.data)

  const isCheckLink = useCallback(() => {
    if (!showLink) return false
    if (GameHome && typeGame) {
      return true
    }
    if (router.asPath) {
      return true
    }
  }, [])

  const isGameNFT = useCallback(() => {
    if (
      game &&
      game.is_NFT &&
      typeGame === undefined &&
      GameHome === undefined &&
      slug
    ) {
      return true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, typeGame, GameHome, slug])

  const _pathname = useMemo(
    () =>
      isGameNFT()
        ? `/arcade-emporium/${slug}/roomlist?id=${itemId}`
        : `/${typeGame}/${GameHome}/roomlist?id=${itemId}`,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, game]
  )

  const renderContent = () => (
    <div
      className={`${
        isMobile
          ? "flex h-[100px] w-[70px] flex-col items-center justify-center"
          : "flex h-[144px] w-[144px] flex-col items-center justify-center rounded-xl border-[1px] border-neutral-800 bg-neutral-900"
      }`}
    >
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
  return isCheckLink() ? (
    <Link href={_pathname}>{renderContent()}</Link>
  ) : (
    renderContent()
  )
}

export default GameItemSingleCard
