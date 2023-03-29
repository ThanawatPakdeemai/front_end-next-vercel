import React from "react"

function SpeedLow({
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
      <g clip-path="url(#clip0_8846_56010)">
        <mask
          id="mask0_8846_56010"
          // style="mask-type:alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="18"
        >
          <path
            d="M0 0H24V18H0V0Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_8846_56010)">
          <path
            d="M1.6 16C1.6 10.2562 6.25624 5.6 12 5.6C17.7438 5.6 22.4 10.2562 22.4 16C22.4 18.4064 21.5834 20.6205 20.2117 22.3826H3.78826C2.41657 20.6205 1.6 18.4064 1.6 16Z"
            stroke="#70727B"
            stroke-width="1.2"
          />
        </g>
        <path
          d="M13.4 17C13.4 17.7732 12.7732 18.4 12 18.4C11.5346 18.4 11.1221 18.1735 10.8667 17.8222L7.80382 12.8038L12.8208 15.8656C13.1729 16.121 13.4 16.534 13.4 17Z"
          stroke="#70727B"
          stroke-width="1.2"
        />
      </g>
      <defs>
        <clipPath id="clip0_8846_56010">
          <rect
            width="24"
            height="24"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
export default SpeedLow
