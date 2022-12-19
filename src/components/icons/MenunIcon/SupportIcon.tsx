import React from "react"

function SupportIcon({
  width = 24,
  height = 24
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <path
        d="M4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10M20 16V16.2756C20 16.7983 19.7954 17.3002 19.43 17.6739L15.7884 21.3982C15.4121 21.7831 14.8966 22 14.3584 22H13.1792"
        stroke="#E1E2E2"
        strokeWidth="1.2"
      />
      <path
        d="M2 10.6H4.4V15.4H2C1.77909 15.4 1.6 15.2209 1.6 15V11C1.6 10.7791 1.77909 10.6 2 10.6ZM19.6 10.6H22C22.2209 10.6 22.4 10.7791 22.4 11V15C22.4 15.2209 22.2209 15.4 22 15.4H19.6V10.6ZM11 21.0118H13C13.2209 21.0118 13.4 21.1909 13.4 21.4118V22.4118C13.4 22.6327 13.2209 22.8118 13 22.8118H11C10.7791 22.8118 10.6 22.6327 10.6 22.4118V21.4118C10.6 21.1909 10.7791 21.0118 11 21.0118Z"
        stroke="#E1E2E2"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default SupportIcon
