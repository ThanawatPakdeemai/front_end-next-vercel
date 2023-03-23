import Link from "next/link"
import dayjs from "dayjs"
import { CardMedia, Typography } from "@mui/material"

interface IEventCardProps {
  event_id: string
  title: string
  image: string
  date_start: Date
  date_end?: Date
}

const EventCard = ({
  event_id,
  title,
  image,
  date_start,
  date_end
}: IEventCardProps) => (
  <div className="mx-auto w-[265px] md:mx-0 lg:w-[250px] 2xl:w-[272px]">
    <Link
      href={`/events/${event_id}`}
      className="cursor-pointer"
    >
      <CardMedia
        image={image}
        sx={{ height: "218px", borderRadius: "24px" }}
      />
    </Link>
    <Typography className="truncate text-default  uppercase md:my-[20px]">
      {title}
    </Typography>
    <div className="flex justify-center gap-4 rounded-lg border-[1px] border-neutral-700 border-opacity-80 py-[10px] px-[10px]">
      <div className="flex flex-col">
        <Typography className="flex text-xs">
          Start at: {dayjs(date_start).format("DD MMM YYYY")}
        </Typography>
        <Typography className="flex text-xs">
          End at: {dayjs(date_end).format("DD MMM YYYY")}
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
  </div>
)

export default EventCard
