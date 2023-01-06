import { ReactElement, useEffect, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import GameRoomLayout from "@components/template/GameRoomLayout"
import GameDetailsPage from "@feature/page/gameDetailsPage"
import useGameStore from "@stores/game"

export default function GameDetails() {
  return (
    <>
      <GameDetailsPage />
    </>
  )
}

GameDetails.getLayout = function getLayout(page: ReactElement) {
  return <GameRoomLayout>{page}</GameRoomLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
