import React, { memo, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import dynamic from "next/dynamic"
import { IGameCategory } from "@feature/game/interfaces/IGameService"
import useFavoriteGameContoller from "@feature/favourite/containers/hooks/useFavoriteGameContoller"
import useProfileStore from "@stores/profileStore"
import useGlobalControllerMobile from "@mobile/features/game/containers/hooks/useGlobalControllerMobile"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: true
})
const ImageCustom = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})
const RemoveWishlistModal = dynamic(
  () => import("../organisms/modal/RemoveWishlistModal"),
  {
    suspense: true,
    ssr: true
  }
)

interface IProps {
  gameId: string
  name: string
  imageCategoryList: string
  categoryList: IGameCategory[]
  href: string
  favourite: boolean
  type: string
  gameMode: string
}

const GameCardMobile = ({
  gameId,
  imageCategoryList,
  name,
  categoryList,
  href,
  favourite,
  type,
  gameMode
}: IProps) => {
  const profile = useProfileStore((state) => state.profile.data)
  const { onClickFavouriteButton } = useFavoriteGameContoller({
    playerId: profile?.id ?? "",
    gameId
  })
  const { handleClickOpenLoading } = useGlobalControllerMobile()

  // State
  const [toggleRemove, setToggleRemove] = useState(false)

  return (
    <>
      <motion.div
        className="game-section__list flex flex-col gap-3"
        initial="init"
        whileHover="onHover"
        animate="animate"
      >
        <div className="relative w-full overflow-hidden rounded-[20px] pt-[84%]">
          {profile && (
            <div className="game-favorite absolute right-3 top-3 z-[1]">
              {favourite ? (
                <button
                  type="button"
                  aria-label="Favourite"
                  onClick={() => setToggleRemove(true)}
                  className="text-error-main"
                >
                  <Icomoon className="icon-app-bold icon-Heart" />
                </button>
              ) : (
                <button
                  type="button"
                  aria-label="Favourite"
                  onClick={() => onClickFavouriteButton()}
                  className="text-white-primary"
                >
                  <Icomoon className="icon-Heart" />
                </button>
              )}
            </div>
          )}

          <Link
            href={href}
            onClick={() => {
              handleClickOpenLoading()
            }}
          >
            <ImageCustom
              src={imageCategoryList}
              alt={name}
              width={200}
              height={200}
              className="absolute left-0 top-0 h-full w-full object-cover object-center"
            />
          </Link>
        </div>
        <Link href={href}>
          <h2 className="line-clamp-2 font-urbanist text-[20px] font-semibold text-white-primary">
            {name}
          </h2>
          <div className="flex gap-2">
            {categoryList && categoryList.length > 0 && (
              <div className="flex flex-wrap gap-2 text-[14px]">
                {categoryList.map((_category) => (
                  <div key={_category.id}>{_category.name}</div>
                ))}
              </div>
            )}
          </div>
        </Link>
      </motion.div>
      <RemoveWishlistModal
        src={imageCategoryList}
        name={name}
        type={type}
        gameMode={gameMode}
        playedId={profile?.id ?? ""}
        gameId={gameId}
        open={toggleRemove}
        setOpen={(_toggle) => setToggleRemove(_toggle)}
      />
    </>
  )
}

export default memo(GameCardMobile)
