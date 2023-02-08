import React, { memo, useEffect, useState } from "react"
import useGetNotification from "@feature/notification/containers/hooks/useGetNotification"
import { PaginationNaka } from "@components/atoms/pagination"
import useProfileStore from "src/stores/profileStore"
import { INotification } from "src/features/notification/interfaces/INotificationService"
import DropdownLimit from "src/features/transaction/components/atoms/DropdownLimit"
import {
  updateNotiStatusById,
  updateAllNotiStatus
} from "@feature/notification/containers/services/notification.service"
import { useRouter } from "next/router"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import NoticficationTable from "../../organisms/notificationTable"
import Nodata from "../../organisms/no_data"
import Header from "../../organisms/header"

const NotificationList = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [unread, setUnread] = useState<number>(0)
  const [sortBy, setSortBy] = useState<string>("dateDESC")
  const [data, setData] = useState<INotification[]>([])
  const [limit, setLimit] = useState<number>(12)
  const router = useRouter()
  const { errorToast } = useToast()
  const playerId = profile?.id || ""
  const { data: dataNoti } = useGetNotification({
    player_id: playerId
  })

  useEffect(() => {
    if (dataNoti && dataNoti.length > 0) {
      setTotalCount(dataNoti.length)
      const result = dataNoti.filter((item) => !item.read)
      setUnread(result.length)
      setData(dataNoti)
    }
  }, [dataNoti, unread])

  useEffect(() => {
    if (!dataNoti) return
    switch (sortBy) {
      case "dateDESC": {
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
      }
      case "dateASC": {
        data.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
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
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
      }
    }
  }, [data, dataNoti, sortBy])

  const handleLimit = (_limit: number) => {
    setLimit(_limit)
  }
  const onHandleClick = () => {
    if (unread) {
      updateAllNotiStatus(playerId).then(() => {
        setUnread(0)
      })
    }
  }
  const onHandleSortBy = (_sort: string) => {
    setSortBy(_sort)
  }
  const onHandleView = (element: INotification) => {
    if (profile) {
      updateNotiStatusById(element._id)
        .then(() => {
          if (element.type.toLowerCase() === "reward") {
            router.push(`/${element.path}/reward/${element._id}`)
          } else if (element.type.toLowerCase() === "tournament") {
            router.push(
              `/${element.path}/summary/${element.room_id}/${element._id}`
            )
          } else if (element.type.toLowerCase() === "reward_weekly") {
            router.push(`/${element.path}/reward/${element._id}`)
          } else if (element.type.toLowerCase() === "reward_game_pool") {
            router.push(`/${element.path}/reward/${element._id}`)
          } else if (element.type.toLowerCase() === "game_free") {
            router.push(
              `/${element.path}/summary/${element.room_id}/${element._id}`
            )
          } else {
            router.push(`/${element.path}/reward/${element._id}`)
          }
        })
        .catch(() => {
          errorToast(MESSAGES.cant_update_data)
        })
    } else {
      errorToast(MESSAGES.please_login)
    }
  }

  return (
    <div className="mx-auto w-full lg:w-3/4 xl:w-3/5">
      <Header
        unread={unread}
        onHandleClick={() => onHandleClick()}
      />
      {data[0] && data ? (
        <NoticficationTable
          data={data}
          page={page}
          limit={limit}
          sortBy={sortBy}
          onHandleView={onHandleView}
          onHandleSortBy={onHandleSortBy}
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
        <DropdownLimit
          defaultValue={limit}
          list={[6, 12, 24, 48, 64]}
          onChangeSelect={handleLimit}
        />
      </div>
    </div>
  )
}
export default memo(NotificationList)
