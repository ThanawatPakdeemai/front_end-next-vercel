/* eslint-disable no-nested-ternary */
import { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"

const index = () => <></>
export const validTypeGames = [
  "play-to-earn",
  "free-to-play",
  "story-mode",
  "arcade-emporium"
]
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const validParams = validTypeGames.some((_game) =>
    ctx.params?.typeGame?.includes(_game)
  )

  // Check if the url is old
  // It's occurs when the user click from OpenSea
  const isOldParams =
    ctx.resolvedUrl === "/brawler-master" || ctx.resolvedUrl === "/goal-rush"

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, ["common"]))
    },
    redirect: {
      destination: isOldParams
        ? `/arcade-emporium/${ctx.resolvedUrl}`
        : !validParams
        ? "/404"
        : (ctx.params?.typeGame as string),
      permanent: true
    }
  }
}

export default index
