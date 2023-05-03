import { Image } from "@components/atoms/image"
import { CurrentPlayer } from "@feature/game/interfaces/IGameService"
import useProfileStore from "@stores/profileStore"

interface IProps {
  players: CurrentPlayer[]
}
const PlayerCardMobile = ({ players }: IProps) => {
  const profile = useProfileStore((state) => state.profile.data)

  return (
    <>
      <div className=" custom-scroll grid w-full grid-cols-4 flex-wrap items-center justify-center overflow-y-auto px-[20px]">
        {players &&
          players.map((player: CurrentPlayer, index) =>
            player ? (
              <div
                key={player?._id}
                className="relative pt-3"
              >
                <div
                  className={` m-auto flex h-[59px] w-[59px] flex-row items-center justify-center rounded-[8px] border-2 ${
                    profile?.id === player.player_id
                      ? "border-secondary-main"
                      : "border-error-main"
                  } bg-neutral-780 p-[3px]`}
                >
                  <Image
                    src={player?.avatar}
                    alt={player?.username}
                    width={45}
                    height={45}
                    className="h-auto w-full"
                  />
                  <Image
                    src={`/images/gamePage/rank/${player.rank}.svg`}
                    alt={player?.username}
                    width={45}
                    height={45}
                    className="absolute right-0 top-0 h-auto w-[35px]"
                  />
                  <div
                    className={`${
                      player.status === "inroom" ? " bg-warning-light" : ""
                    } ${player.status === "ready" ? " bg-green-lemon" : ""} ${
                      player.status === "playing" ? " bg-error-light" : ""
                    } absolute bottom-[70px] flex h-[16px] items-center justify-center rounded bg-info-main px-1 font-neue-machina text-[8px] uppercase  text-primary-main`}
                  >
                    {player?.status || ""}
                  </div>
                </div>
                <div className="m-auto mb-4 mt-3 h-8 w-[55px]">
                  <p className=" truncate text-center text-sm uppercase text-neutral-300">
                    {player?.username}
                  </p>
                  <p
                    className={`${
                      profile && profile?.id === player?.player_id
                        ? " text-secondary-main "
                        : " text-error-main "
                    } truncate  text-center text-xs uppercase `}
                  >
                    {profile && profile?.id === player?.player_id
                      ? "me"
                      : "player"}
                  </p>
                </div>
              </div>
            ) : (
              <div
                key={Number(index)}
                className="pt-3"
              >
                <div className=" m-auto flex h-[59px]  w-[59px] items-center justify-center rounded-[8px] border-2 border-neutral-780 p-[3px] ">
                  <div className=" flex h-full w-full items-center justify-center rounded-[8px] bg-neutral-780">
                    <Image
                      src="/images/home/logoNakaMaster.svg"
                      alt="logoNakaMaster"
                      width={29}
                      height={22}
                    />
                  </div>
                </div>
                <div className="mb-4 mt-3 h-8" />
              </div>
            )
          )}
      </div>
    </>
  )
}

export default PlayerCardMobile
