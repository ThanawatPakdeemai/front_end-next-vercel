import { ReactNode, memo } from "react"
import DropdownIcon from "@components/icons/DropdownIcon"

interface IProps {
  isOpen: boolean
  leftContent: string | ReactNode
  rightContent?: string | ReactNode
  className?: string
  hideIcon?: boolean
}
const ButtonDropdown = ({
  isOpen,
  className,
  leftContent,
  rightContent,
  hideIcon = false
}: IProps) => (
  <>
    <button
      type="button"
      className={`flex h-[40px] flex-1 flex-row items-center justify-between rounded-lg border-[1px] border-solid border-neutral-700 bg-neutral-800 p-3 text-[12px] text-black-default hover:text-white-primary ${className}`}
    >
      <div className="flex w-full items-center justify-between">
        {leftContent}
        {rightContent}
      </div>
      {!hideIcon && (
        <div
          className={`${
            isOpen
              ? "rotate-180 transition-all duration-300"
              : "rotate-0 transition-all duration-300"
          }`}
        >
          <DropdownIcon />
        </div>
      )}
    </button>
  </>
)
export default memo(ButtonDropdown)
