import React from "react"

function LogoIcon({
  width = 23,
  height = 11,
  className,
  fill = "#E1E2E2"
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.04734 2C5.5835 2 5.16667 2 5.16667 1.23953V0L3 0V3H0V5H4L3 5.5V6H1V8H5L3.73736 8.63132C4.61702 10.059 6.19707 11 8 11C9.6356 11 11.0878 10.2147 12 9.00048C12.9122 10.2147 14.3644 11 16 11C17.8029 11 19.383 10.059 20.2626 8.63132L19 8H23V6H21V5.5L20 5H24V3H21V0H18.8333V1.23953C18.8333 2 18.3333 2 17.9527 2H6.04734ZM11 5L10 5.5C10 6.60457 9.10457 7.5 8 7.5C6.89543 7.5 6 6.60457 6 5.5L5 5H11ZM19 5L18 5.5C18 6.60457 17.1046 7.5 16 7.5C14.8954 7.5 14 6.60457 14 5.5L13 5H19Z"
        fill={fill}
      />
    </svg>
  )
}

export default LogoIcon
