import Box from "@mui/material/Box"
import Card from "@mui/material/Card"

interface IGasCardProps {
  title: string
  gwei: number
  color: string
  second: string
}

const GasCard = ({ title, gwei, color, second }: IGasCardProps) => (
  <Box
    component="div"
    className=" flex justify-center"
  >
    <Card className="GasCard h-full w-full !rounded-lg !bg-neutral-700">
      <div className="mx-auto items-center justify-between whitespace-nowrap px-[8px] py-[20px] text-center text-sm">
        <div>
          <p className="uppercase text-black-default">{title}</p>
        </div>
        <div>
          <p className={`${color.toString()} pt-1  uppercase`}>{gwei} GWEI</p>
        </div>
        <div>
          <p className="pt-1 uppercase text-black-default">{second} SECS</p>
        </div>
      </div>
    </Card>
  </Box>
)
export default GasCard
