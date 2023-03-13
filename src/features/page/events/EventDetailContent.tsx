import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  TableHead
} from "@mui/material"
import CardContent from "@feature/referral/components/CardContent"

const EventDetailContent = () => (
  <div className="md:w-4/6">
    <CardContent title="">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>2</TableCell>
              <TableCell>3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className="rounded-xl border-b-[6px] border-neutral-800 bg-primary-main">
              <TableCell className="w-[300px] rounded-l-xl p-1 text-end font-neue-machina-bold text-xs uppercase">
                <div className="flex items-center">
                  <div className="flex h-[50px] w-[50px] items-center rounded-xl bg-neutral-800">
                    <div className="w-[50px] text-center font-neue-machina-bold text-[16px] text-white-primary">
                      1
                    </div>
                  </div>
                  <div className="flex h-[50px] w-[50px] items-center rounded-xl bg-neutral-800">
                    <div className="w-[50px] text-center font-neue-machina-bold text-[16px] text-white-primary">
                      TH
                    </div>
                  </div>
                  <div>Todsawat Somtua</div>
                </div>
              </TableCell>
              <TableCell className="text-end font-neue-machina-bold text-xs uppercase">
                <div className="text-start text-[12px] text-varidian-default">
                  + 0.0000
                </div>
              </TableCell>
              <TableCell className="rounded-r-xl text-end font-neue-machina-bold text-xs uppercase">
                <div className="text-start text-[12px] text-varidian-default">
                  + 0.0000
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </div>
)

export default EventDetailContent
