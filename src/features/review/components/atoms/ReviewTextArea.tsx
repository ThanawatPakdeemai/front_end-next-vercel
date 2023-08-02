import { Button, Chip, Rating, Typography } from "@mui/material"
import React, { useCallback } from "react"
import StarIcon from "@mui/icons-material/Star"

interface IProps {
  onSubmit: ({ _text, _star }: { _text: string; _star: number }) => Promise<{
    _status: boolean
  }>
}

const min_star = 0.5

const ReviewTextArea = ({ onSubmit }: IProps) => {
  const [text, setText] = React.useState<string>("")
  const [star, setStar] = React.useState<number>(0)
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      const { _status } = await onSubmit({ _text: text, _star: star })
      if (_status) {
        setText("")
        setStar(0)
      }
      setTimeout(() => setLoading(false), 1000)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSubmit, star, text]
  )

  const onStarChanged = React.useCallback(
    (event: React.SyntheticEvent<Element, Event>, value: number | null) => {
      let _value: number = Number(value)
      if (_value <= min_star) _value = min_star
      setStar(_value)
    },
    []
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-[22px]"
    >
      <div className="flex w-full flex-row items-center justify-between">
        <Typography
          variant="h6"
          className="font-neue-machina text-base font-bold capitalize text-white-primary"
        >
          your rating:
        </Typography>
        <div className="flex w-fit flex-row items-center gap-x-1">
          <Rating
            sx={{
              "& .MuiSvgIcon-root": {
                color: "#A0ED61",
                width: "20px"
              }
            }}
            size="small"
            name="read-only"
            value={star}
            defaultValue={1}
            precision={0.5}
            onChange={(e, newValue) => {
              onStarChanged(e, newValue)
            }}
          />
          <Chip
            label={star}
            color="success"
            variant="filled"
            size="small"
            className="!h-[20px] !w-[38px] !bg-green-lemon !p-0"
          />
        </div>
      </div>
      <textarea
        style={{
          "resize": "none",
          outline: "none"
        }}
        className="h-44 w-full rounded-[8px] border border-neutral-800 bg-neutral-900 p-[10px] focus:placeholder:text-transparent"
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck="false"
        placeholder="Enter your text here..."
      />
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        className="!h-10 rounded-[20px] text-sm capitalize"
        disabled={loading || star <= 0}
      >
        {loading ? "sending..." : "submit review"}
      </Button>
      <div className="h-6 text-sm">
        <span
          className={`flex h-full w-fit flex-row gap-x-1 normal-case ${
            star < min_star ? " text-error-main" : "text-green-card"
          }`}
        >
          <StarIcon className="text-base text-green-lemon" />
          <p>Review rate must be more than {min_star} .</p>
        </span>
      </div>
    </form>
  )
}

export default ReviewTextArea
