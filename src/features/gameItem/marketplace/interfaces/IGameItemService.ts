import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import { IFormatService } from "@interfaces/IHelper"

export interface ITypesGameItemServ extends IFormatService {
  data: IGameItemListData[]
}
