const useNotificationController = () => {
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
  const onHandleView = () => {}

  return {
    onHandleClick,
    onHandleSortBy,
    onHandleView
  }
}

export default useNotificationController
