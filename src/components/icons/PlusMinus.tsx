import * as React from "react"
import { SVGProps } from "react"

const PlusMinus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={3}
      y={4.5}
      width={6}
      height={1}
      fill="#010101"
    />
    <rect
      width={6}
      height={1}
      transform="matrix(0 -1 -1 0 6.5 8)"
      fill="#010101"
    />
    <rect
      x={3}
      y={9.5}
      width={6}
      height={1}
      fill="#010101"
    />
  </svg>
)
export default PlusMinus
