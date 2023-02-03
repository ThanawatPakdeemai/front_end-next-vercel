import React, { memo, useEffect, useState } from "react"
import useGetNoticfication from "@feature/notification/containers/hooks/useGetNoticfication"
import { PaginationNaka } from "@components/atoms/pagination"
import useProfileStore from "src/stores/profileStore"
import { TextField, InputAdornment } from "@mui/material"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import Header from "../../organisms/header"
import Nodata from "../../organisms/no_data"
import NoticficationTable from "../../organisms/noticficationTable"

const NotificationList = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [unread, setUnread] = useState<number>(0)
  const [sortBy, setSortBy] = useState<string>("nameDESC")
  const limit = 10
  const playerId = profile?.id || ""
  const { data } = useGetNoticfication({
    player_id: playerId
  })

  // const data = [
  //   {
  //     createdAt: "2022-12-08T11:52:34.110Z",
  //     detail: "Game Free Calculate Score.",
  //     game_id: "6364ec14c81000f1fbb2c0b4",
  //     game_name: "Bubble Shooter free to play",
  //     naka_for_player: 0,
  //     path: "bubble-shooter-free-to-play",
  //     player_id: "63886503aee6350f00de1a30",
  //     read: false,
  //     room_id: "638f2b78cf8e5541bd8bbcb2",
  //     type: "GAME_FREE",
  //     _id: "6391d00219144777f3124613"
  //   },
  //   {
  //     createdAt: "2022-12-08T11:52:34.110Z",
  //     detail: "Game Free Calculate Score.",
  //     game_id: "6364ec14c81000f1fbb2c0b3",
  //     game_name: "Bubble Shooter free to play",
  //     naka_for_player: 0,
  //     path: "bubble-shooter-free-to-play",
  //     player_id: "63886503aee6350f00de1a30",
  //     read: true,
  //     room_id: "638f2b78cf8e5541bd8bbcb2",
  //     type: "GAME_FREE",
  //     _id: "6391d00219144777f3124669"
  //   },
  //   {
  //     createdAt: "2022-12-08T11:52:34.110Z",
  //     detail: "Game Free Calculate Score.",
  //     game_id: "6364ec14c81000f1fbb2c0b4",
  //     game_name: "Bubble Shooter free to play",
  //     naka_for_player: 0,
  //     path: "bubble-shooter-free-to-play",
  //     player_id: "63886503aee6350f00de1a30",
  //     read: true,
  //     room_id: "638f2b78cf8e5541bd8bbcb2",
  //     type: "GAME_FREE",
  //     _id: "6391d00219144777f3124613"
  //   },
  //   {
  //     createdAt: "2022-12-08T11:52:34.110Z",
  //     detail: "Game Free Calculate Score.",
  //     game_id: "6364ec14c81000f1fbb2c0b3",
  //     game_name: "Bubble Shooter free to play",
  //     naka_for_player: 0,
  //     path: "bubble-shooter-free-to-play",
  //     player_id: "63886503aee6350f00de1a30",
  //     read: true,
  //     room_id: "638f2b78cf8e5541bd8bbcb2",
  //     type: "GAME_FREE",
  //     _id: "6391d00219144777f3124669"
  //   },
  //   {
  //     createdAt: "2022-12-08T11:52:34.110Z",
  //     detail: "Game Free Calculate Score.",
  //     game_id: "6364ec14c81000f1fbb2c0b4",
  //     game_name: "Bubble Shooter free to play",
  //     naka_for_player: 0,
  //     path: "bubble-shooter-free-to-play",
  //     player_id: "63886503aee6350f00de1a30",
  //     read: true,
  //     room_id: "638f2b78cf8e5541bd8bbcb2",
  //     type: "GAME_FREE",
  //     _id: "6391d00219144777f3124613"
  //   },
  //   {
  //     createdAt: "2022-12-08T11:52:34.110Z",
  //     detail: "Game Free Calculate Score.",
  //     game_id: "6364ec14c81000f1fbb2c0b3",
  //     game_name: "Bubble Shooter free to play",
  //     naka_for_player: 0,
  //     path: "bubble-shooter-free-to-play",
  //     player_id: "63886503aee6350f00de1a30",
  //     read: true,
  //     room_id: "638f2b78cf8e5541bd8bbcb2",
  //     type: "GAME_FREE",
  //     _id: "6391d00219144777f3124669"
  //   },
  //   {
  //     createdAt: "2022-12-08T11:52:34.110Z",
  //     detail: "Game Free Calculate Score.",
  //     game_id: "6364ec14c81000f1fbb2c0b4",
  //     game_name: "Bubble Shooter free to play",
  //     naka_for_player: 0,
  //     path: "bubble-shooter-free-to-play",
  //     player_id: "63886503aee6350f00de1a30",
  //     read: true,
  //     room_id: "638f2b78cf8e5541bd8bbcb2",
  //     type: "GAME_FREE",
  //     _id: "6391d00219144777f3124613"
  //   },
  //   {
  //     createdAt: "2022-12-08T11:52:34.110Z",
  //     detail: "Game Free Calculate Score.",
  //     game_id: "6364ec14c81000f1fbb2c0b4",
  //     game_name: "Bubble Shooter free to play",
  //     naka_for_player: 0,
  //     path: "bubble-shooter-free-to-play",
  //     player_id: "63886503aee6350f00de1a30",
  //     read: true,
  //     room_id: "638f2b78cf8e5541bd8bbcb2",
  //     type: "GAME_FREE",
  //     _id: "6391d00219144777f3124613"
  //   },
  //   {
  //     createdAt: "2022-12-08T11:52:34.110Z",
  //     detail: "Game Free Calculate Score.",
  //     game_id: "6364ec14c81000f1fbb2c0b3",
  //     game_name: "Bubble Shooter free to play",
  //     naka_for_player: 0,
  //     path: "bubble-shooter-free-to-play",
  //     player_id: "63886503aee6350f00de1a30",
  //     read: true,
  //     room_id: "638f2b78cf8e5541bd8bbcb2",
  //     type: "GAME_FREE",
  //     _id: "6391d00219144777f3124669"
  //   },
  //   {
  //     createdAt: "2022-12-08T11:52:34.110Z",
  //     detail: "Game Free Calculate Score.",
  //     game_id: "6364ec14c81000f1fbb2c0b4",
  //     game_name: "Bubble Shooter free to play",
  //     naka_for_player: 0,
  //     path: "bubble-shooter-free-to-play",
  //     player_id: "63886503aee6350f00de1a30",
  //     read: true,
  //     room_id: "638f2b78cf8e5541bd8bbcb2",
  //     type: "GAME_FREE",
  //     _id: "6391d00219144777f3124613"
  //   },
  //   {
  //     createdAt: "2022-12-08T11:52:34.110Z",
  //     detail: "Game Free Calculate Score.",
  //     game_id: "6364ec14c81000f1fbb2c0b3",
  //     game_name: "Bubble Shooter free to play",
  //     naka_for_player: 0,
  //     path: "bubble-shooter-free-to-play",
  //     player_id: "63886503aee6350f00de1a30",
  //     read: true,
  //     room_id: "638f2b78cf8e5541bd8bbcb2",
  //     type: "GAME_FREE",
  //     _id: "6391d00219144777f3124669"
  //   },
  //   {
  //     createdAt: "2022-12-08T11:52:34.110Z",
  //     detail: "Game Free Calculate Score.",
  //     game_id: "6364ec14c81000f1fbb2c0b4",
  //     game_name: "Bubble Shooter free to play",
  //     naka_for_player: 0,
  //     path: "bubble-shooter-free-to-play",
  //     player_id: "63886503aee6350f00de1a30",
  //     read: true,
  //     room_id: "638f2b78cf8e5541bd8bbcb2",
  //     type: "GAME_FREE",
  //     _id: "6391d00219144777f3124613"
  //   },
  //   {
  //     createdAt: "2022-12-08T11:52:34.110Z",
  //     detail: "Game Free Calculate Score.",
  //     game_id: "6364ec14c81000f1fbb2c0b3",
  //     game_name: "Bubble Shooter free to play",
  //     naka_for_player: 0,
  //     path: "bubble-shooter-free-to-play",
  //     player_id: "63886503aee6350f00de1a30",
  //     read: true,
  //     room_id: "638f2b78cf8e5541bd8bbcb2",
  //     type: "GAME_FREE",
  //     _id: "6391d00219144777f3124669"
  //   },
  //   {
  //     createdAt: "2022-12-08T11:52:34.110Z",
  //     detail: "Game Free Calculate Score.",
  //     game_id: "6364ec14c81000f1fbb2c0b4",
  //     game_name: "Bubble Shooter free to play",
  //     naka_for_player: 0,
  //     path: "bubble-shooter-free-to-play",
  //     player_id: "63886503aee6350f00de1a30",
  //     read: true,
  //     room_id: "638f2b78cf8e5541bd8bbcb2",
  //     type: "GAME_FREE",
  //     _id: "6391d00219144777f3124613"
  //   },
  //   {
  //     createdAt: "2022-12-08T11:52:34.110Z",
  //     detail: "Game Free Calculate Score.",
  //     game_id: "6364ec14c81000f1fbb2c0b4",
  //     game_name: "Bubble Shooter free to play",
  //     naka_for_player: 0,
  //     path: "bubble-shooter-free-to-play",
  //     player_id: "63886503aee6350f00de1a30",
  //     read: true,
  //     room_id: "638f2b78cf8e5541bd8bbcb2",
  //     type: "GAME_FREE",
  //     _id: "6391d00219144777f3124613"
  //   },
  //   {
  //     createdAt: "2022-12-08T11:52:34.110Z",
  //     detail: "Game Free Calculate Score.",
  //     game_id: "6364ec14c81000f1fbb2c0b3",
  //     game_name: "Bubble Shooter free to play",
  //     naka_for_player: 0,
  //     path: "bubble-shooter-free-to-play",
  //     player_id: "63886503aee6350f00de1a30",
  //     read: true,
  //     room_id: "638f2b78cf8e5541bd8bbcb2",
  //     type: "GAME_FREE",
  //     _id: "6391d00219144777f3124669"
  //   }
  // ]

  useEffect(() => {
    if (data && data.length > 0) {
      setTotalCount(data.length)
      const result = data.filter((item) => !item.read)
      setUnread(result.length)
    }
  }, [data])

  useEffect(() => {
    if (!data) return
    switch (sortBy) {
      case "dateDESC": {
        data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
      }
      case "dateASC": {
        data.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        break
      }
      case "read": {
        data.sort((a, b) => {
          if (a.read === b.read) {
            return 0
          }
          if (a.read) {
            return -1
          }
          return 1
        })
        break
      }
      case "unread": {
        data.sort((a, b) => {
          if (a.read === b.read) {
            return 0
          }
          if (a.read) {
            return 1
          }
          return -1
        })
        break
      }
      case "nameASC": {
        data.sort((a, b) => a.game_name.localeCompare(b.game_name))
        break
      }
      case "nameDESC": {
        data.sort((a, b) => b.game_name.localeCompare(a.game_name))
        break
      }
      default: {
        data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
      }
    }
  }, [sortBy, data])

  const onHandleClick = () => {
    setUnread(0)
  }
  const onHandleSortBy = (_sort: string) => {
    setSortBy(_sort)
  }

  return (
    <div className="mx-auto w-full lg:w-3/4 xl:w-3/5">
      <Header
        unread={unread}
        onHandleClick={() => onHandleClick()}
      />
      {data ? (
        <NoticficationTable
          data={data}
          onHandleSortBy={(_text: string) => onHandleSortBy}
        />
      ) : (
        <Nodata />
      )}
      <div className="flex justify-between">
        <PaginationNaka
          totalCount={totalCount}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <TextField
          className="ml-3"
          select
          placeholder="Show 6"
          value="6"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VisibilityOutlinedIcon />
              </InputAdornment>
            )
          }}
        />
      </div>
    </div>
  )
}
export default memo(NotificationList)
