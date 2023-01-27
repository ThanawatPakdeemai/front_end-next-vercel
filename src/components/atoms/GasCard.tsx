import Box from "@mui/material/Box"
import Card from "@mui/material/Card"

interface IGasCardProps {
  title: string
  gwei: number
  color: string
  second: string
}

const GasCard = ({ title, gwei, color, second }: IGasCardProps) => (
  <Box className="flex justify-center">
    <Card className="h-full w-full !rounded-lg !bg-[#232329]">
      <div className="mx-auto  items-center justify-between px-2 py-2 text-center">
        <div>
          <p className="text-[10px] uppercase text-[#4E5057]">{title}</p>
        </div>
        <div>
          <p className={`${color.toString()} pt-1 text-[10px] uppercase`}>
            {gwei} GWEI
          </p>
        </div>
        <div>
          <p className="pt-1 text-[10px] uppercase text-[#4E5057]">
            {second} SECS
          </p>
        </div>
      </div>
    </Card>
  </Box>
)
export default GasCard
