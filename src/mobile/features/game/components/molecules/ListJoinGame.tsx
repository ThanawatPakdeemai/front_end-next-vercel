import { Image } from "@components/atoms/image/index"
import { Chip } from "@mui/material"
import RoomListBox from "@components/molecules/roomList/RoomListBox"
import StopwatchIcon from "@components/icons/StopwatchIcon"
import ButtonJoin from "../atoms/ButtonJoin"

interface IProps {
  image?: string
  name?: string
  desc?: string
  onClick?: () => void
  textChip?: string
  descChip1?: string
  descChip2?: string
  time?: string
  text?: string
}
const ListJoinGame = ({
  image,
  name,
  desc,
  onClick,
  textChip,
  descChip1,
  descChip2,
  time,
  text
}: IProps) => (
  <>
    <div className="max-h-[393px] w-full border-b border-neutral-700">
      <div className="m-[16px]">
        <div className="mb-[10px] flex items-center justify-between gap-2">
          <div className="w-[55px] flex-none">
            <Image
              src={image || ""}
              width={52}
              height={52}
              alt="image-list-room"
              className="h-[52px] w-[52px] rounded-sm border border-success-contrastText  bg-success-contrastText object-cover"
            />
          </div>
          <div className="grow">
            <p className=" font-neue-machina text-xs capitalize text-secondary-main">
              {time ? (
                <RoomListBox
                  type="timer"
                  timer={{
                    time: new Date(time),
                    onExpire: () => null
                  }}
                  color="green"
                  shade="lemon"
                  borderColor="border-0 !p-0 !h-[20px]"
                  classNameText=" text-xs"
                  showClock={
                    <StopwatchIcon
                      stroke="#A0ED61"
                      className="mr-[-7px] w-[12px]"
                    />
                  }
                />
              ) : (
                name
              )}
            </p>
            <p className=" font-neue-machina text-sm capitalize text-neutral-300">
              {desc}
            </p>
          </div>
          <div className=" w-[90px] flex-none">
            <ButtonJoin
              onClick={onClick}
              text={text}
            />
          </div>
        </div>
        <div className=" flex h-[36px] items-center gap-[16px] overflow-hidden rounded-[12px] border border-neutral-800 bg-neutral-780 p-[8px]">
          <Chip
            color="error"
            label={textChip}
            size="small"
            className="!h-[20px] capitalize"
          />
          <p className=" font-neue-machina text-sm text-secondary-main">
            {descChip1}
          </p>
          <p className=" font-neue-machina text-sm text-secondary-main">
            {descChip2}
          </p>
        </div>
      </div>
    </div>
  </>
)
export default ListJoinGame
