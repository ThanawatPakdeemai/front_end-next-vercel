import { useRouter } from "next/router"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import { INotification } from "@feature/notification/interfaces/INotificationService"
import {
  updateNotiStatusById
  // updateAllNotiStatus
} from "@feature/notification/containers/services/notification.service"

const useNotificationController = () => {
  const router = useRouter()
  const { errorToast } = useToast()
  // const dispatch = useDispatch();
  // const { notifications } = useSelector((state: RootState) => state.notification);
  // const addNotification = (notification: Notification) => {
  //   dispatch(addNotificationAction(notification));
  // };
  // const removeNotification = (id: string) => {
  //   dispatch(removeNotificationAction(id));
  // };
  // return {
  //   notifications,
  //   addNotification,
  //   removeNotification,
  // };

  /**
   * @description Handle click on notification
   */
  const onHandleClick = () => {
    // if (unread) {
    //   updateAllNotiStatus(playerId).then(() => {
    //     setUnread(0)
    //   })
    // }
  }

  /**
   * @description Handle sort by...
   */
  const onHandleSortBy = (_sort: string) => {
    // setSortBy(_sort)
  }
  const onHandleView = (element: INotification, playerId: string) => {
    if (playerId) {
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

  return {
    onHandleView,
    onHandleClick,
    onHandleSortBy
  }
}

export default useNotificationController
