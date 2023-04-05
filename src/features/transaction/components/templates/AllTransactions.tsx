import React, { memo } from "react"
import useProfileStore from "@stores/profileStore"
import AllTransactionTable from "../organisms/AllTransactionTable"

const AllTransactions = () => {
  const profile = useProfileStore((state) => state.profile.data)

  return (
    <div className="mx-auto mt-5 max-w-[700px] md:mt-0">
      <AllTransactionTable profile={profile} />
    </div>
  )
}

export default memo(AllTransactions)
