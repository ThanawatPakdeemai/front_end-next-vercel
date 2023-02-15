import React from "react"

function AllIcon({
  width = 24,
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.0005 17H16.0004V15.8H13.2005V8H12.0005V17Z"
        fill="#E1E2E2"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.0005 17H22.0004V15.8H19.2005V8H18.0005V17Z"
        fill="#E1E2E2"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.10039 8H2.90039V17H4.10039V13H7.90039V17H9.10039V8ZM7.90039 11.8V9.2H4.10039V11.8H7.90039Z"
        fill="#E1E2E2"
      />
    </svg>
  )
}
export default AllIcon
