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
  <div className="mx-auto w-[218px] md:mx-0">
    <Link
      href={`/events/${event_id}`}
      className="cursor-pointer"
    >
      <div className="h-[218px] overflow-hidden rounded-3xl">
        <ImageCustom
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          width={372}
          height={372}
        />
      </div>
    </Link>
    <Typography className="truncate text-default uppercase md:my-[20px]">
      {title}
    </Typography>
    <div className="flex justify-center gap-2 rounded-lg border-[1px] border-neutral-700 border-opacity-80 py-[10px]">
      <div className="flex flex-col">
        <Typography className="flex text-xs">
          {`Start: ${dayjs(date_start).format("DD MMM YYYY")}`}
        </Typography>
        <Typography className="flex text-xs">
          {`End: ${dayjs(date_end).format("DD MMM YYYY")}`}
        </Typography>
      </div>
      <div className="border-r border-neutral-700 border-opacity-80" />
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
