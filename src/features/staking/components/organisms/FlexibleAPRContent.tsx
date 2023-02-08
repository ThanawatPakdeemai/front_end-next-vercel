import useGlobalStaking from "@feature/staking/containers/hook/useGlobalStaking"
import React from "react"
import { v4 as uuid } from "uuid"
import { Box } from "@mui/material"
import StakingTitle from "../atoms/StakingTitle"
import StakingDetails from "./StakingDetails"
// import { IStakingBasicData, IUserStakedInfo } from "@src/types/staking"

const FlexibleAPRContent = () => {
  const { flexibleStaking } = useGlobalStaking()

  // const [stakeBasicInfo, setStakeBasicInfo] = useState<IStakingBasicData>()
  // const [useStakedInfo, setUseStakedInfo] = useState<IUserStakedInfo>()

  // State
  // const [open, setOpen] = useState<boolean>(false)
  // const handleOpen = () => setOpen(true)
  // const handleClose = () => setOpen(false)

  return (
    <>
      {flexibleStaking && (
        <Box component="section">
          {flexibleStaking.map((_item) =>
            _item.dataAPI.map((item) => (
              <div key={uuid()}>
                <StakingTitle title={`${item.title}`} />
                <StakingDetails
                  className="mb-10"
                  dataStaking={item}
                />
              </div>
            ))
          )}
        </Box>
      )}
      {/* <StakingModal
        open={open}
        handleClose={handleClose}
      /> */}
    </>
  )
}

export default FlexibleAPRContent
