import ButtonClose from "@components/atoms/button/ButtonClose"
import { useRouter } from "next/router"

interface IProps {
  name: string
  onOutRoom?: () => void
}
const TitleOutRoom = (props: IProps) => {
  const { name, onOutRoom } = props
  const router = useRouter()
  return (
    <div className=" my-[17.1px] flex items-center gap-1">
      <ButtonClose
        insideClassName="!w-[23px] !h-[23px]"
        className="!mx-2"
        onClick={() => (onOutRoom ? onOutRoom() : router.push("/"))}
      />
      <p className=" font-neue-machina text-xs uppercase text-neutral-500">
        {name}
      </p>
    </div>
  )
}
export default TitleOutRoom
