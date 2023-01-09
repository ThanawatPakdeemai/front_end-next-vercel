import { SVGProps } from "react"

const BankIcon = ({
  width = 25,
  height = 24,
  className
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12.25 7V9M12.25 17V15M9.64844 15H14.15C14.2052 15 14.25 14.9552 14.25 14.9V12.1C14.25 12.0448 14.2052 12 14.15 12H10.35C10.2948 12 10.25 11.9552 10.25 11.9V9.1C10.25 9.04477 10.2948 9 10.35 9H14.8555M4.24679 19C9.43206 19 17.467 19 20.2562 19C20.8085 19 21.25 18.5523 21.25 18V6C21.25 5.44772 20.8023 5 20.25 5H4.25C3.69772 5 3.25 5.44772 3.25 6V18C3.25 18.5523 3.6945 19 4.24679 19Z"
      stroke="#70727B"
      strokeWidth={1.2}
    />
  </svg>
)
export default BankIcon
