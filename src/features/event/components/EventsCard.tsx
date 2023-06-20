import Link from "next/link"
import dayjs from "dayjs"
import { Chip, Typography } from "@mui/material"
import { ImageCustom } from "@components/atoms/image/Image"

interface IEventCardProps {
  event_id: string
  title: string
  image: string
  date_start: Date
  date_end?: Date
  status: string
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning"
  variant?: "outlined" | "filled"
}

const EventCard = ({
  event_id,
  title,
  image,
  date_start,
  date_end,
  status,
  variant = "filled",
  color = "primary"
}: IEventCardProps) => (
  <div className="mx-auto w-full md:mx-0 xl:w-[218px]">
    <Link
      href={`/events/${event_id}`}
      className="cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-3xl pt-[94%]">
        <ImageCustom
          src={image}
          alt={title}
          className="absolute left-0 top-0 h-full w-full object-cover"
          width={372}
          height={372}
        />
      </div>
    </Link>
    <Typography className="my-[10px] truncate text-default uppercase md:my-[20px]">
      {title}
    </Typography>
    <div className="flex flex-col justify-center gap-2 rounded-lg border-[1px] border-neutral-700 border-opacity-80 px-[10px] py-[10px] xl:flex-row xl:px-0">
      <div className="flex flex-col">
        <Typography className="flex text-xs">
          {`Start: ${dayjs(date_start).format("DD MMM YYYY")}`}
        </Typography>
        <Typography className="flex text-xs">
          {`End: ${dayjs(date_end).format("DD MMM YYYY")}`}
        </Typography>
      </div>
      <div className="border-t border-neutral-700 border-opacity-80 xl:border-r xl:border-t-0" />
      <Link
        href={`/events/${event_id}`}
        className="flex cursor-pointer items-center text-center"
      >
        <Typography className="flex text-sm">Here for more</Typography>
      </Link>
    </div>
    <div className="mt-2 flex justify-center gap-2 rounded-lg border-[1px] border-neutral-700 border-opacity-80 py-[10px]">
      {/* ${status} */}
      <Typography className="flex items-center gap-2 text-xs">
        Status:
        <Chip
          label={status}
          variant={variant}
          size="small"
          className="cursor-default uppercase"
          color={color}
        />
      </Typography>
    </div>
  </div>
)

export default EventCard
