import { SVGProps } from "react"

const ClockIcon = ({
  width = 20,
  height = 21,
  className
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.2498 10.0759C19.2498 15.1839 15.1088 19.3259 9.99976 19.3259C4.89176 19.3259 0.749756 15.1839 0.749756 10.0759C0.749756 4.96693 4.89176 0.825928 9.99976 0.825928C15.1088 0.825928 19.2498 4.96693 19.2498 10.0759Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.1906 10.843L9.66064 10.769V5.922"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default ClockIcon
