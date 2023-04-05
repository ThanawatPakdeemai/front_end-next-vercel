/* eslint-disable no-unused-vars */
import ButtonSubmit from "@components/atoms/button/ButtonLink"
import CheckBoxNaka from "@components/atoms/checkBox/CheckBoxNaka"
import { Image } from "@components/atoms/image"
import IconArrowDownBorder from "@components/icons/ArrowDownBorderIcon"
import { IMAGES } from "@constants/images"
import { useToast } from "@feature/toast/containers"
import { Box, InputAdornment, TextField, Typography } from "@mui/material"
import useProfileStore from "@stores/profileStore"
import { memo, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import CalenderDropdown from "../atoms/CalenderDropdown"
import DataColumn from "../atoms/DataColumn"
import StakingStartEnd from "./StakingStartEnd"

interface IProp {
  userName?: string
  onCloseModal?: () => void
}

const FormStaking = ({ userName, onCloseModal }: IProp) => {
  const profile = useProfileStore((state) => state.profile.data)
  const [stakeAmount, setIsStakeAmount] = useState<boolean>(false)
  const [limit, setLimit] = useState<number>(180)
  const { errorToast, successToast } = useToast()
  const { t } = useTranslation()

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      _email: profile?.email,
      _stakeAmount: "",
      _avatar: profile?.avatar,
      _accept: Boolean(false),
      _country: profile?.country,
      _user_ip_address: profile?.user_ip_address
    }
  })

  const onSubmit = (data) => {
    if (data && profile) {
      //
    }
  }

  const slideTo = () => {}

  const handleLimit = (_limit: number) => {
    setLimit(_limit)
  }

  return (
    <Box className="h-auto max-h-[644px] overflow-y-auto">
      {profile && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-x-[25px] max-sm:gap-y-[25px] sm:grid-cols-2">
            <div className="left h-max rounded-[8px] border border-neutral-800 bg-neutral-780 p-6">
              <Typography className="mb-5 font-neue-machina-semi text-xs  uppercase text-neutral-400">
                Start staking with only 1 naka worth of assets and reap higher
                rewards and additional benefit
              </Typography>

              <Typography className="mb-1 mt-2 font-neue-machina-semi text-xs uppercase  text-neutral-500">
                Staking Period
              </Typography>
              <CalenderDropdown
                defaultValue={12}
                list={[15, 30, 60, 180, 240]}
                onChangeSelect={handleLimit}
              />
              <Typography className="mb-1 font-neue-machina-semi text-xs uppercase text-neutral-500">
                180 Days
                <span className="text-varidian-default">
                  {" "}
                  est apr 6,916.02%
                </span>
              </Typography>

              <Typography className="mb-1 mt-4 font-neue-machina-semi text-xs uppercase  text-neutral-500">
                Stake amount
              </Typography>
              <div className="stake-amount relative mb-2">
                <TextField
                  className="w-full"
                  required
                  type="text"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      width: "100%"
                    }
                  }}
                  value={watch("_stakeAmount")}
                  onChange={(event) => {
                    // eslint-disable-next-line prefer-const
                    let { value } = event.target
                    setValue("_stakeAmount", value)
                  }}
                  id="username-create"
                  placeholder={`NAKA ${stakeAmount || "0.00"}`}
                  size="medium"
                  InputProps={{
                    style: { fontFamily: "neueMachina" },
                    startAdornment: (
                      <InputAdornment position="start">
                        {/* <PermContactCalendarOutlinedIcon /> */}
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="start">
                        {/* <RepeatIcon /> */}
                      </InputAdornment>
                    )
                  }}
                />
                <Image
                  src={IMAGES.nakaLogoMaster.src}
                  width={IMAGES.nakaLogoMaster.width}
                  height={IMAGES.nakaLogoMaster.height}
                  alt={IMAGES.nakaLogoMaster.alt}
                  className="absolute bottom-0 right-[18px] top-0 m-[auto_0]"
                />
              </div>
              <Typography className="mb-1 font-neue-machina-semi text-xs uppercase text-neutral-500">
                Your total naka{" "}
                <span className="text-neutral-300">294,345</span>{" "}
                <span className="text-purple-primary">MAX</span>
              </Typography>
            </div>
            <div className="right rounded-[8px] border border-neutral-800 px-5 py-3 uppercase">
              <DataColumn
                title="EST. APR"
                value="6,916.02%"
              />
              <DataColumn
                title="EST. Interests"
                value="0 NAKA"
              />
              <DataColumn
                title="Price per busd"
                value="2.3 BUSD"
                valueColor="text-neutral-300"
              />
              <DataColumn
                title="Staking Period"
                value="180 Days"
                valueColor="text-neutral-300"
              />

              <StakingStartEnd
                startDate="20 seb 2023"
                startTime="07:00 am"
                endDate="29 nov 2023"
                endTime="23:00 am"
              />

              <CheckBoxNaka
                value={watch("_accept")}
                onHandle={() => setValue("_accept", !watch("_accept"))}
                text={
                  t("i_acknowledge_that") ||
                  "I acknowledge that I have read and fully understand the above information"
                }
                className="my-5"
                color="error"
                fontStyle="text-xs"
              />
              <ButtonSubmit
                icon={<IconArrowDownBorder />}
                size="large"
                color="error"
                className="mb-2 h-[40px] !min-w-[100%] text-sm !capitalize !text-neutral-200"
                href=""
                onClick={() => {}}
                text="Stake Now"
                type="submit"
                variant="contained"
              />
            </div>
          </div>

          <div className="mt-6 rounded-[13px] border border-purple-primary bg-[#110A1C] px-4 py-2 font-neue-machina text-sm uppercase text-neutral-500 text-purple-primary shadow-[0px_4px_4px_rgba(0,0,0,0.18)]">
            The NAKA Coins that staked by players will be obtained from
            Metamask. If players need to check whether NAKA is successfully
            staking. please check the Metamask
          </div>
        </form>
      )}
    </Box>
  )
}

export default memo(FormStaking)
