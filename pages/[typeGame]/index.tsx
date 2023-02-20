import { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"

const index = () => <></>

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const validTypeGames = [
    "play-to-earn-games",
    "free-to-play-games",
    "story-mode-games"
  ]

  const validParams = validTypeGames.some((_game) =>
    ctx.params?.typeGame?.includes(_game)
  )

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, ["common"]))
    },
    redirect: {
      destination: !validParams ? "/404" : (ctx.params?.typeGame as string),
      permanent: true
    }
  }
}

export default index
