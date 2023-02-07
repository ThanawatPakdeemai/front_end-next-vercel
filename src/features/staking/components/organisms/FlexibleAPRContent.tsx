import useGlobalStaking from "@feature/staking/containers/hook/useGlobalStaking"
import React from "react"
import { v4 as uuid } from "uuid"
import { Box } from "@mui/material"
import StakingTitle from "../atoms/StakingTitle"
import StakingDetails from "./StakingDetails"

const FlexibleAPRContent = () => {
  const { flexibleStaking } = useGlobalStaking()

  // State
  // const [open, setOpen] = useState<boolean>(false)
  // const handleOpen = () => setOpen(true)
  // const handleClose = () => setOpen(false)

  return (
    <>
      {flexibleStaking && (
        <Box component="section">
          {flexibleStaking.map((_item) =>
            _item.data.map((item) => (
              <div key={uuid()}>
                <StakingTitle title={`${item.title}`} />
                <StakingDetails
                  dataStaking={item}
                  className="mb-10"
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
