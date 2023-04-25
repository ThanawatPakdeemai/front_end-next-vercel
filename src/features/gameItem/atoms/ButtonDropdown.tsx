import { ReactNode, memo } from "react"
import DropdownIcon from "@components/icons/DropdownIcon"
import { isMobile } from "react-device-detect"

interface IProps {
  isOpen: boolean
  leftContent: string | ReactNode
  rightContent?: string | ReactNode
  className?: string
}
const ButtonDropdown = ({
  isOpen,
  className,
  leftContent,
  rightContent
}: IProps) => (
  <>
    <button
      type="button"
      className={`${className} mb-1 flex h-[40px] w-full flex-row items-center justify-between rounded-[13px] border-[1px] border-solid border-neutral-700 bg-neutral-800 text-[12px] text-black-default hover:text-white-primary ${
        isMobile ? "px-4" : "px-5"
      }`}
    >
      <div className="flex items-center justify-between">
        {leftContent}
        {rightContent}
      </div>
      <div
        className={`${
          isOpen
            ? "rotate-180 transition-all duration-300"
            : "rotate-0 transition-all duration-300"
        }`}
      >
        <DropdownIcon />
      </div>
    </button>
  </>
)
export default memo(ButtonDropdown)
