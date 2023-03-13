import { CardMedia, Typography } from "@mui/material"
import dayjs from "dayjs"

interface IEventCardProps {
  title: string
  image: string
  date_start: Date
  date_end?: Date
}

const EventCard = ({ title, image, date_start }: IEventCardProps) => (
  <div className="mx-auto w-[265px] cursor-pointer md:mx-0 lg:w-[250px] 2xl:w-[272px]">
    <CardMedia
      image={image}
      sx={{ height: "218px", borderRadius: "24px" }}
    />
    <Typography className="text-default uppercase">{title}</Typography>
    <div className="mt-[20px] flex justify-center gap-4 rounded-lg border-[1px] border-neutral-700 border-opacity-80 py-[10px] px-[30px]">
      <Typography>{dayjs(date_start).format("DD MMM YYYY")}</Typography>
      <div className="border-r border-neutral-700 border-opacity-80" />
      <Typography>For more</Typography>
    </div>
  </div>
)

export default EventCard
