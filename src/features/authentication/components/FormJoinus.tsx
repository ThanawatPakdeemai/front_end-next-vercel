import React, { memo } from "react"
import {
  Box,
  Typography,
  Grid,
  Link,
  TextField,
  InputAdornment
} from "@mui/material"
import _ from "lodash"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import ButtonClose from "@components/atoms/button/ButtonClose"
// import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import FieldItem from "@components/molecules/FieldItem"
// import { useRouter } from "next/router"
import PortraitIcon from "@components/icons/PortraitIcon"
import useProfileStore from "@stores/profileStore"
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined"
import EnvelopeIcon from "@components/icons/EnvelopeIcon"
import useFormJoinUsController, {
  IFormJoinUsData
} from "../containers/hooks/useFormJoinUsController"
import useFormController from "../containers/hooks/useFormController"

export const StyledTextField = {
  "& .MuiOutlinedInput-root": {
    width: "100%",
    fontWeight: 400,
    fontSize: 14,
    fontWight: 700,
    fontFamily: "neueMachina"
  },
  "& .MuiInputLabel-root": {
    color: "#70727B",
    fontFamily: "neueMachina",
    textTransform: "uppercase"
  }
}

export const StyledTextField2 = {
  "& .MuiOutlinedInput-root": {
    width: "100%",
    fontWeight: 400,
    fontSize: 14,
    fontWight: 700,
    fontFamily: "neueMachina",
    height: "120px"
  },
  "& .MuiInputLabel-root": {
    color: "#70727B",
    fontFamily: "neueMachina",
    textTransform: "uppercase",
    fontSize: "1rem",
    top: "0",
    left: "0",
    transform: "translate(0, 0) scale(0.75)"
  }
}

const SignUpSchema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required(),
    code: yup.number().required().positive().integer(),
    subscription: yup.boolean().defined(),
    referralId: yup.string().defined()
  })
  .required()

const FormJoinus = () => {
  // const router = useRouter()
  const profile = useProfileStore((state) => state.profile.data)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormJoinUsData>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      name: profile ? profile.username : "",
      email: profile ? profile.email : "",
      gameName: "",
      gameType: "multiplayer",
      gameDescription: "",
      link: ""
    }
  })

  const { isEmail, emailCorrect, isName } = useFormController()
  const { onSubmitRegister } = useFormJoinUsController()
  // const { executeRecaptcha } = useGoogleReCaptcha()

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitRegister)}>
        <Box style={{ width: 423, height: 638 }}>
          <Box
            className="flex items-center rounded-lg"
            sx={{ height: "54px" }}
          >
            <div className="mb-6 flex flex-1 flex-row items-center border-b-[1px] border-b-neutral-700 pb-4">
              <Typography className="text-lg uppercase text-neutral-300">
                GAME DEVELOPERS Submit form
              </Typography>
            </div>
            <Link href="/">
              <ButtonClose onClick={() => {}} />
            </Link>
          </Box>
          <Grid
            container
            spacing={2.25}
          >
            <Grid
              item
              xs={6}
            >
              <FieldItem
                fieldType={
                  <TextField
                    className="w-full"
                    type="name"
                    placeholder="Name..."
                    label="Game developer name"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      isName(e.target.value.toString())
                    }}
                    {...register("name")}
                    sx={StyledTextField}
                    id="name"
                    size="medium"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PortraitIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                }
                formSubmitErrors={false}
                error={errors.email}
                statusError={emailCorrect}
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <FieldItem
                fieldType={
                  <TextField
                    className="w-full"
                    type="email"
                    placeholder="Email..."
                    label="Game developer email"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      isEmail(e.target.value.toString())
                    }}
                    {...register("email")}
                    sx={StyledTextField}
                    id="email"
                    size="medium"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EnvelopeIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                }
                formSubmitErrors={false}
                error={errors.email}
                statusError={emailCorrect}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2.25}
          >
            <Grid
              item
              xs={6}
            >
              <FieldItem
                fieldType={
                  <TextField
                    className="w-full"
                    type="text"
                    placeholder="Game Name..."
                    label="Game Name"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      isName(e.target.value.toString())
                    }}
                    {...register("gameName")}
                    sx={StyledTextField}
                    id="gameName"
                    size="medium"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SportsEsportsOutlinedIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                }
                formSubmitErrors={false}
                error={errors.email}
                statusError={emailCorrect}
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              {/* <FieldItem
                fieldType={
                  <>
                    {gameItemList &&
                      gameItemList.length > 0 &&
                      (gameItemList as IGameItemListData[]).sort(
                        (a, b) => a.price - b.price
                      ) && (
                        <Controller
                          name="item_id"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { ...field } }) => (
                            <DropdownListItem
                              {...field}
                              list={gameItemList as IGameItemListData[]}
                              className="w-[410px]"
                              // onChangeSelect={(_item) => {
                              //   setValue("item", _item)
                              //   setValue("item_id", _item.id)
                              //   updatePricePerItem()
                              // }}
                              // defaultValue={
                              //   (gameItemList[0] as IGameItemListData) ||
                              //   ({} as IGameItemListData)
                              // }
                            />
                          )}
                        />
                      )}
                  </>
                }
                formSubmitErrors={false}
                error={errors.email}
                statusError={emailCorrect}
              /> */}
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2.25}
          >
            <Grid
              item
              xs={12}
            >
              <FieldItem
                fieldType={
                  <TextField
                    className="w-full"
                    type="text"
                    placeholder="Description..."
                    label="Game description"
                    rows={4}
                    multiline
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      isName(e.target.value.toString())
                    }}
                    {...register("gameDescription")}
                    sx={StyledTextField2}
                    id="gameDescription"
                    size="medium"
                  />
                }
                formSubmitErrors={false}
                error={errors.email}
                statusError={emailCorrect}
              />
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  )
}
export default memo(FormJoinus)
