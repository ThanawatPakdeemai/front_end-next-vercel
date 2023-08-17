import React, { memo, useEffect, useState } from "react"

import {
  Box,
  Typography,
  Grid,
  Link,
  TextField,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl
} from "@mui/material"
import _ from "lodash"
import { Controller } from "react-hook-form"
import InsertLinkIcon from "@mui/icons-material/InsertLink"
import dynamic from "next/dynamic"
import { DROPDOWN_GAMETYPE } from "@configs/gameType"
import { getCategories } from "@feature/dropdown/containers/services/dropdown.service"
import { IGameCategory } from "@feature/dropdown/interfaces/IDropdownService"
import { useToast } from "@feature/toast/containers"
import { StyledFormLabel } from "@styles/themes/partial/components/muiTypography"
import DropdownListCategories from "@feature/dropdown/components/molecules/DropdownListCategories"
import useFormJoinUsController from "../containers/hooks/useFormJoinUsController"
import useFormController from "../containers/hooks/useFormController"

const ButtonClose = dynamic(
  () => import("@components/atoms/button/ButtonClose"),
  {
    suspense: true,
    ssr: false
  }
)
const FieldItem = dynamic(() => import("@components/molecules/FieldItem"), {
  suspense: true,
  ssr: false
})
const ButtonToggleIcon = dynamic(
  () => import("@components/molecules/gameSlide/ButtonToggleIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const Editor = dynamic(() => import("@components/molecules/Editor"), {
  suspense: true,
  ssr: false
})
const DropdownListGameType = dynamic(
  () => import("@feature/dropdown/components/molecules/DropdownListGameType"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

export const StyledTextField = {
  "& .MuiOutlinedInput-root": {
    width: "100%",
    fontWeight: 400,
    fontSize: "14px",
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
    fontSize: "14px",
    fontWight: 700,
    fontFamily: "neueMachina",
    height: "120px"
  },
  "& .MuiInputLabel-root": {
    color: "#70727B",
    fontFamily: "neueMachina",
    textTransform: "uppercase",
    fontSize: "14px",
    top: "0",
    left: "0",
    transform: "none"
  }
}

const StyledRadio = {
  "&.Mui-checked": {
    color: "#70727B"
  }
}

const FormJoinus = () => {
  const { isEmail, isName } = useFormController()
  const [gameCategoriesData, setGameCategoriesData] = useState<IGameCategory[]>(
    []
  )
  const { errorToast } = useToast()
  const {
    onSubmitGenaralReview,
    valueRadio,
    handleChangeRadio,
    handleSubmit,
    register,
    setValue,
    control,
    errors
  } = useFormJoinUsController()

  const onCategories = () => {
    getCategories()
      .then((res) => {
        res.splice(0, 0, {
          id: "",
          name: "Select...",
          createdAt: "",
          updatedAt: "",
          detail: "",
          slug: "",
          color_code: "",
          image_list: "",
          image_banner: "",
          is_active: true,
          _id: ""
        })
        setGameCategoriesData(res)
      })
      .catch((error) => {
        errorToast(error.message)
      })
  }

  useEffect(() => {
    let load = false

    if (!load) {
      onCategories()
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmitGenaralReview)}>
      <Box
        component="div"
        style={{
          width: 423,
          height: "auto"
        }}
      >
        <Box
          component="div"
          className="flex rounded-lg"
          sx={{ height: "54px" }}
        >
          <div className="mb-6 flex flex-1 flex-row items-center border-b-[1px] border-b-neutral-700 pb-4">
            <Typography className="text-lg uppercase text-neutral-300">
              PLEASE FILL THIS FORM
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
                  label="Developer name"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    isName(e.target.value.toString())
                    setValue("short_detail.developer_name", e.target.value)
                  }}
                  {...(register("short_detail.developer_name"),
                  { required: true })}
                  sx={StyledTextField}
                  id="name"
                  size="medium"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icomoon className="icon-User-Pass" />
                      </InputAdornment>
                    )
                  }}
                />
              }
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
                  label="Developer email"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    isEmail(e.target.value.toString())
                    setValue("short_detail.developer_email", e.target.value)
                  }}
                  {...(register("short_detail.developer_email"),
                  { required: true })}
                  sx={StyledTextField}
                  id="email"
                  size="medium"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icomoon className="icon-Mail-Closed" />
                      </InputAdornment>
                    )
                  }}
                />
              }
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
                    setValue("name", e.target.value)
                  }}
                  {...(register("name"), { required: true })}
                  sx={StyledTextField}
                  id="gameName"
                  size="medium"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icomoon className="icon-Joystick" />
                      </InputAdornment>
                    )
                  }}
                />
              }
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
                  type="text"
                  placeholder="Publisher..."
                  label="Developer publisher"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue("short_detail.publisher", e.target.value)
                  }}
                  {...(register("short_detail.publisher"), { required: true })}
                  sx={StyledTextField}
                  id="publisher"
                  size="medium"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icomoon className="icon-User-Pass" />
                      </InputAdornment>
                    )
                  }}
                />
              }
            />
          </Grid>

          <Grid
            item
            xs={6}
          >
            <FieldItem
              fieldType={
                <>
                  {gameCategoriesData && gameCategoriesData.length > 0 && (
                    <>
                      <Controller
                        name="categories"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { ...field } }) => (
                          <>
                            <DropdownListCategories
                              {...field}
                              list={gameCategoriesData}
                              label="Game categories"
                              onChangeSelect={(_item) => {
                                if (_item.id) {
                                  setValue("categories", [`${_item.id}`])
                                } else {
                                  setValue("categories", [])
                                }
                              }}
                              register={register}
                            />
                            {errors.categories && (
                              <span className="text-sm text-error-main">
                                * {errors.categories.message}
                              </span>
                            )}
                          </>
                        )}
                      />
                    </>
                  )}
                </>
              }
            />
          </Grid>

          <Grid
            item
            xs={6}
          >
            <FieldItem
              fieldType={
                <>
                  {DROPDOWN_GAMETYPE && DROPDOWN_GAMETYPE.length > 0 && (
                    <Controller
                      name="player_type"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { ...field } }) => (
                        <DropdownListGameType
                          {...field}
                          list={DROPDOWN_GAMETYPE}
                          label="Game type"
                          onChangeSelect={(_item) => {
                            setValue("player_type", _item.title)
                          }}
                        />
                      )}
                    />
                  )}
                </>
              }
            />
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
                <FormControl>
                  <FormLabel
                    sx={StyledFormLabel}
                    id="gameStatus-label"
                  >
                    {`Is the game playable already? Please specify when if it's not ready yet.`}
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="gameStatus-label"
                    name="controlled-radio-buttons-group"
                    value={valueRadio}
                    onChange={handleChangeRadio}
                    className="flex flex-row items-center"
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio sx={StyledRadio} />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio sx={StyledRadio} />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              }
            />
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
                  placeholder="Game Link..."
                  label="Game Link"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue("game_play_url", e.target.value)
                  }}
                  {...(register("game_play_url"), { required: true })}
                  sx={StyledTextField}
                  id="link"
                  size="medium"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <InsertLinkIcon />
                      </InputAdornment>
                    )
                  }}
                />
              }
            />
            <FormLabel sx={StyledFormLabel}>
              {`Please enter some link that about video games like video trailers `}
            </FormLabel>
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
                <>
                  <Controller
                    name="how_to_play"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { ...field } }) => (
                      <>
                        <Editor
                          {...field}
                          placeholder="How To Play..."
                          className="h-[180px] !pt-[70px]"
                          toolbarClassName="top-1 max-w-[415px] left-0 right-0 mx-auto"
                          id="how_to_play"
                          label="Game how to play *"
                          onChangeInput={(_value: string) =>
                            setValue("how_to_play", _value)
                          }
                          {...(register("how_to_play"), { required: true })}
                        />
                        {errors.how_to_play && (
                          <span className="text-sm text-error-main">
                            * {errors.how_to_play.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </>
              }
            />
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
                <>
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { ...field } }) => (
                      <>
                        <Editor
                          {...field}
                          placeholder="Description..."
                          className="h-[180px] !pt-[70px]"
                          toolbarClassName="top-1 max-w-[415px] left-0 right-0 mx-auto"
                          id="gameDescription"
                          label="Game description *"
                          onChangeInput={(_value: string) =>
                            setValue("description", _value)
                          }
                          {...(register("description"), { required: true })}
                        />
                        {errors.description && (
                          <span className="text-sm text-error-main">
                            * {errors.description.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </>
              }
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={12}
            className="flex justify-center"
          >
            <ButtonToggleIcon
              type="submit"
              startIcon={<Icomoon className="icon-Ballpen" />}
              text="Register"
              className="btn-rainbow-theme h-[40px] !w-[209px] bg-secondary-main font-bold capitalize text-white-default"
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  )
}
export default memo(FormJoinus)
