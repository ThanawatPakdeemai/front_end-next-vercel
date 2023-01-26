/* eslint-disable no-console */
import { TableCell, TableSortLabel } from "@mui/material"

interface IProps {
  label: string
  icon?: any
  onHandle?: any
  className?: string
}

const TransHead = ({ label, icon, onHandle, className }: IProps) => (
  <>
    <TableCell>
      <TableSortLabel
        // active
        // direction="asc"
        onClick={onHandle}
        IconComponent={icon}
        hideSortIcon={!icon}
      >
        <div
          className={`font-neue-machina-bold text-xs text-neutral-600 ${className}`}
        >
          {label}
        </div>
      </TableSortLabel>
    </TableCell>
  </>
)

export default TransHead
