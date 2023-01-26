import React from "react"

function IBeenhere({
  width = 16,
  height = 21,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 0.6H15C15.2209 0.6 15.4 0.779086 15.4 1V13.524C15.4 13.6445 15.3457 13.7585 15.2522 13.8345L8.25224 19.522C8.10528 19.6414 7.89472 19.6414 7.74776 19.522L0.747763 13.8345C0.654279 13.7585 0.6 13.6445 0.6 13.524V1C0.6 0.779086 0.779086 0.6 1 0.6Z"
        stroke="#70727B"
        stroke-width="1.2"
      />
      <path
        d="M4 8L7 11L12.5 6"
        stroke="#70727B"
        stroke-width="1.2"
      />
    </svg>
  )
}

export default IBeenhere
