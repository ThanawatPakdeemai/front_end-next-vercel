import { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"

const index = () => <></>
export const validTypeGames = ["play-to-earn", "free-to-play", "story-mode"]
export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
