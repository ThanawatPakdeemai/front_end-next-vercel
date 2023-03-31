import React, { memo } from "react"
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
import ButtonClose from "@components/atoms/button/ButtonClose"
import FieldItem from "@components/molecules/FieldItem"
import PortraitIcon from "@components/icons/PortraitIcon"
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined"
import EnvelopeIcon from "@components/icons/EnvelopeIcon"
import { CHAIN_LIST } from "@configs/chain"
import DropdownListChainList from "@feature/dropdown/components/molecules/DropdownListChainList"
import { DROPDOWN_GAMETYPE } from "@configs/gameType"
import DropdownListGameType, {
  StyledFormLabel
} from "@feature/dropdown/components/molecules/DropdownListGameType"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import IEdit from "@components/icons/Edit"
import InsertLinkIcon from "@mui/icons-material/InsertLink"
import useFormController from "../containers/hooks/useFormController"
import useFormJoinUsController from "../containers/hooks/useFormJoinUsController"

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
  const {
    onSubmitRegister,
    valueRadio,
    handleChangeRadio,
    handleSubmit,
    register,
    setValue,
    control,
    errors
  } = useFormJoinUsController()

  return (
    <form onSubmit={handleSubmit(onSubmitRegister)}>
      <Box style={{ width: 423, height: 638 }}>
        <Box
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
                  label="Game developer name"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    isName(e.target.value.toString())
                    setValue("name", e.target.value)
                  }}
                  {...(register("name"), { required: true })}
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
                    setValue("email", e.target.value)
                  }}
                  {...(register("email"), { required: true })}
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
                    setValue("gameName", e.target.value)
                  }}
                  {...(register("gameName"), { required: true })}
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
              error={errors.name}
              statusError={errors.name?.message}
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
                      name="chain"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { ...field } }) => (
                        <DropdownListGameType
                          {...field}
                          list={DROPDOWN_GAMETYPE}
                          label="Game type"
                          onChangeSelect={(_item) => {
                            setValue("gameType", _item.title)
                            // updatePricePerItem()
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
                <>
                  {CHAIN_LIST && CHAIN_LIST.length > 0 && (
                    <Controller
                      name="chain"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { ...field } }) => (
                        <DropdownListChainList
                          {...field}
                          list={CHAIN_LIST}
                          label="Blockchain"
                          onChangeSelect={(_item) => {
                            setValue("chain", _item)
                            // updatePricePerItem()
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
                    setValue("link", e.target.value)
                  }}
                  {...(register("link"), { required: true })}
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
                    setValue("gameDescription", e.target.value)
                  }}
                  {...(register("gameDescription"), { required: true })}
                  sx={StyledTextField2}
                  id="gameDescription"
                  size="medium"
                />
              }
            />
          </Grid>
          <Grid container>
            <Grid
              item
              xs={12}
              className="flex justify-center"
            >
              <ButtonToggleIcon
                type="submit"
                startIcon={<IEdit />}
                text="Regiter"
                className="btn-rainbow-theme h-[40px] !w-[209px] bg-secondary-main font-bold capitalize text-white-default"
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </form>
  )
}
export default memo(FormJoinus)
