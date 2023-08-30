import { ReactNode, memo } from "react"
import dynamic from "next/dynamic"
import { isMobile } from "@hooks/useGlobal"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IProps {
  isOpen: boolean
  leftContent: string | ReactNode
  rightContent?: string | ReactNode
  className?: string
  hideDropdownIcon?: boolean
}
const ButtonDropdown = ({
  isOpen,
  className,
  leftContent,
  rightContent,
  hideDropdownIcon = false
}: IProps) => (
  <>
    <button
      type="button"
      aria-label="dropdown"
      className={`flex h-[40px] flex-1 flex-row items-center rounded-lg border-[1px] border-solid border-neutral-700 bg-neutral-800 p-3 text-[12px] text-black-default hover:text-white-primary ${className} ${
        isMobile ? "px-4" : "px-5"
      }`}
    >
      <div className="flex w-full items-center">
        {leftContent}
        {rightContent}
      </div>
      {!hideDropdownIcon && (
        <div
          className={`arrow-icon flex items-center justify-center ${
            isOpen
              ? "rotate-180 transition-all duration-300"
              : `rotate-0 transition-all
                duration-300`
          }`}
        >
          <Icomoon className="icon-Arrow-Down !text-[14px]" />
        </div>
      )}
    </button>
  </>
)
export default memo(ButtonDropdown)
