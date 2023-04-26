import * as React from "react"
import { SVGProps } from "react"

const IconInfo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx={12}
      cy={12}
      r={10.4}
      stroke="#E1E2E2"
      strokeWidth={1.2}
    />
    <path
      d="M12 6.5L12 8M9.5 10.5L11 10.5C11.5523 10.5 12 10.9477 12 11.5L12 15.5C12 16.0523 12.4477 16.5 13 16.5L14.5 16.5"
      stroke="#E1E2E2"
      strokeWidth={1.2}
    />
  </svg>
)
export default IconInfo
