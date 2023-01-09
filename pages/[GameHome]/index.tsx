import React, { useEffect, useState } from "react"
import Head from "next/head"
import { Layout } from "@components/template"
import GameSlide from "@feature/slider/components/templates/GameSlide"
import { getAllGames } from "@feature/game/containers/services/game.service"
import { useRouter } from "next/router"
import useGameStore from "@src/stores/game/index"
import shallow from "zustand/shallow"
import SkeletonBanner from "@components/atoms/skeleton/SkeletonBanner"

export default function Gamehome() {
  const [gameHome, setGameHome] = useState()
  const router = useRouter()
  const Path = router.asPath.split("/")
  const setGame = useGameStore((state) => state.setGame)
  const datagame = useGameStore(
    (state) => ({
      data: state.data
    }),
    shallow
  )

  const fetchGameAll = async () => {
    // eslint-disable-next-line no-async-promise-executor
    const { data }: any = await getAllGames()
    const gamefilter = data.filter((data) => data.game_url.includes(Path[1]))
    setGameHome(gamefilter)
    setGame(gamefilter)
  }
  useEffect(() => {
    fetchGameAll()
  }, [])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <link
          rel="shortcut icon"
          href="favicon.ico"
          type="image/x-icon"
        />
      </Head>
      <Layout>{gameHome ? <GameSlide /> : <SkeletonBanner />}</Layout>
    </>
  )
}
