import { memo } from "react"
import { Card, CardHeader } from "@mui/material"
// import Image from "@components/atoms/image"

const CardTitle = () => (
  <>
    <p className="text-right">aaaa</p>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title="sss" />
    </Card>
  </>
)

export default memo(CardTitle)
