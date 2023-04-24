import React from "react"

function SettingIconFilter({
  width = 25,
  height = 24,
  className
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
        d="M4.5 12L17 12M4.5 17L7 17M20.5 17L9.5 17M9.5 15L9.5 17M9.5 19L9.5 17M19.5 10L19.5 14M11.5 5L11.5 7M11.5 9L11.5 7M4.5 7L9 7M20.5 7L11.5 7"
        stroke="#E1E2E2"
        strokeWidth="1.2"
      />
    </svg>
  )
}
export default SettingIconFilter
