import React from "react"

interface IHeaderSyncAccountProps {
  target: string
}

const HeaderSyncAccount = ({ target }: IHeaderSyncAccountProps) => (
  <div className="fixed left-0 top-0 z-[2] w-full bg-[#18181C] p-2 text-center font-urbanist text-[12px] text-[#616161]">
    {`Seem your account haven't sycn with ${target}, please click `}
    <button
      className="font-bold"
      type="button"
    >
      Setting
    </button>{" "}
    to complete your profile.
  </div>
)

export default HeaderSyncAccount
