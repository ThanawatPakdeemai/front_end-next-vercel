import ButtonIcon from "@components/atoms/button/ButtonIcon"
import MinusIcon from "@components/icons/CountIcon/MinusIcon"
import PlusIcon from "@components/icons/CountIcon/PlusIcon"
import SkullIcon from "@components/icons/CountIcon/SkullIcon"
import { iconmotion } from "@components/organisms/Footer"
import { TextField } from "@mui/material"
import useCountStore from "@stores/countComponant"
import React from "react"

const CountItem = () => {
  const minusItem = useCountStore((state: any) => state.decrease)
  const addItem = useCountStore((state: any) => state.increase)
  const item = useCountStore((state: any) => state.count)
  return (
    <div className="flex items-center">
      <ButtonIcon
        onClick={minusItem}
        variants={iconmotion}
        whileHover="hover"
        transition={{ type: "spring", stiffness: 400, damping: 4 }}
        icon={<MinusIcon />}
        className="m-1 flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-secondary-main"
      />
      <TextField
        className="mx-1"
        sx={{
          input: {
            textAlign: "center"
          },
          // "& .MuiInput-root": {
          // "&:before": {
          //   borderBottom: "1px solid grey"
          // },
          // "&:after": {
          //   borderBottom: "2px solid white"
          // },
          // "&:hover fieldset": {
          //   borderColor: "grey"
          // }
          // "&.Mui-focused fieldset": {
          //   borderColor: "yellow"
          // }
          "& label.Mui-focused": {
            color: "white"
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "white",
              border: "none"
            }
          }
        }}
        value={item}
        InputProps={{
          readOnly: true,
          endAdornment: <SkullIcon />,
          style: {
            width: "200px",
            fontSize: 14,
            paddingLeft: 30,
            fontFamily: "neueMachina"
          }
        }}
        focused={false}
      />
      <ButtonIcon
        onClick={addItem}
        variants={iconmotion}
        whileHover="hover"
        transition={{ type: "spring", stiffness: 400, damping: 4 }}
        icon={<PlusIcon />}
        className="m-1 flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-secondary-main"
      />
    </div>
  )
}

export default CountItem
