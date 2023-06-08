import { SVGProps } from "react"

const ClockIcon2 = ({
  width = 25,
  height = 25,
  className,
  stroke = "#F2C94C"
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12.4849 4.15161C7.5143 4.15161 3.48486 8.18105 3.48486 13.1516C3.48486 18.1222 7.5143 22.1516 12.4849 22.1516C17.4554 22.1516 21.4849 18.1222 21.4849 13.1516C21.4849 10.9209 20.6733 8.87968 19.3293 7.3072M12.4849 4.15161C15.2247 4.15161 17.6786 5.37588 19.3293 7.3072M12.4849 4.15161V3.15161M12.4849 7.65161V14.1516M21.4849 5.15161L19.3293 7.3072M12.4849 3.15161H10.4849M12.4849 3.15161H14.4849"
      stroke={stroke}
      strokeWidth="1.2"
    />
  </svg>
)
export default ClockIcon2
