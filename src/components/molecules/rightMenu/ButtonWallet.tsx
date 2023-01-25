import { memo } from "react"
import Image from "next/image"

interface IProp {
  handleButton: () => void
  title: string
}
const ButtonWallet = ({ handleButton, title }: IProp) => (
  <>
    <button
      type="button"
      className={`ml-2 flex rounded-3xl p-3 text-[#010101] ${
        title === "withdraw" ? "bg-[#F42728]" : "bg-[#3DCD95]"
      }`}
      onClick={() => handleButton()}
    >
      <Image
        src={`${
          title === "withdraw"
            ? "/images/Profile/Wallet/icon-withdeaw.png"
            : "/images/Profile/Wallet/icon-deposit.png"
        }`}
        alt=""
        width={20}
        height={20}
      />
      <p className="ml-4 mr-2 font-bold uppercase">{title}</p>
    </button>
  </>
)

export default memo(ButtonWallet)
