import { create } from "zustand"
import { devtools } from "zustand/middleware"
import configZustandDevTools from "@utils/configDevtools"

interface IEvent {
  _id: string
  name: string | undefined
}
export interface IEventStore {
  event: IEvent
  getEvent: () => IEvent
  onReset: () => void
  setEventData: (_event: IEvent) => void
}

const useEventStore = create<IEventStore>()(
  devtools(
    (set, get) => ({
      event: {
        _id: "",
        name: ""
      },
      getEvent: () => get().event,
      onReset: () =>
        set({
          event: {
            _id: "",
            name: ""
          }
        }),
      setEventData: (_event) => {
        set(() => ({ event: _event }), false, "Event/setEventData")
      }
    }),
    configZustandDevTools("Event-Store")
  )
)

export default useEventStore
