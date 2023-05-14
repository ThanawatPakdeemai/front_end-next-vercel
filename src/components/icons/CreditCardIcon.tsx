import * as React from "react"
import { SVGProps } from "react"

const CreditCardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 8.77517V6.5C2 5.94771 2.44772 5.5 3 5.5H21C21.5523 5.5 22 5.94772 22 6.5V8.77517M2 8.77517H22M2 8.77517V11.5M22 8.77517V11.5M22 11.5V18.5C22 19.0523 21.5523 19.5 21 19.5H3C2.44772 19.5 2 19.0523 2 18.5V11.5M22 11.5H2"
      stroke="#70727B"
      strokeWidth={1.2}
    />
  </svg>
)

export default CreditCardIcon
