import React from "react"

function IBusd({
  width = 24,
  height = 24,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9704 0.941406L13.4552 3.4785L7.19822 9.71678L4.71338 7.23938L10.9704 0.941406Z"
        fill="#F0B90C"
      />
      <path
        d="M14.7426 4.70312L17.2274 7.24022L7.19822 17.2394L4.71338 14.762L14.7426 4.70312Z"
        fill="#F0B90C"
      />
      <path
        d="M3.42625 8.46289L5.91109 11L3.42625 13.4774L0.941406 11L3.42625 8.46289Z"
        fill="#F0B90C"
      />
      <path
        d="M18.515 8.46289L20.9999 11L10.9707 20.9991L8.48584 18.5217L18.515 8.46289Z"
        fill="#F0B90C"
      />
    </svg>
  )
}

export default IBusd
