import * as React from "react"
import { SVGProps } from "react"

const PinnedMapIcon = ({
  width = 24,
  height = 24,
  className
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M19 10C19 13.111 14.4672 18.3381 12.6967 20.2612C12.3176 20.6729 11.6824 20.6729 11.3033 20.2612C9.53278 18.3381 5 13.111 5 10C5 6.13401 8.13401 3 12 3C15.866 3 19 6.13401 19 10Z"
      stroke="#70727B"
      strokeWidth={1.2}
    />
    <path
      d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z"
      stroke="#70727B"
      strokeWidth={1.2}
    />
  </svg>
)
export default PinnedMapIcon
