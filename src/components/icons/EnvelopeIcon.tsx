import { SVGProps } from "react"

const EnvelopeIcon = ({
  width = 24,
  height = 24,
  stroke = "#70727B"
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 8C2.5 7.44772 2.94772 7 3.5 7H21.5C22.0523 7 22.5 7.44772 22.5 8V20C22.5 20.5523 22.0523 21 21.5 21H3.5C2.94772 21 2.5 20.5523 2.5 20V8Z"
      stroke={stroke}
      strokeWidth="1.2"
    />
    <path
      d="M2.5 8L12.5 14L22.5 8"
      stroke={stroke}
      strokeWidth="1.2"
    />
  </svg>
)

export default EnvelopeIcon
