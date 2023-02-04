import React from "react"

function IRectangleRed({
  width = 8,
  height = 31,
  className,
  color
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_dii_5075_19109)">
        <path
          d="M1 2C1 0.89543 1.89543 0 3 0H7V29H3C1.89543 29 1 28.1046 1 27V2Z"
          fill={color || "#F42728"}
        />
        <path
          d="M1 2C1 0.89543 1.89543 0 3 0H7V29H3C1.89543 29 1 28.1046 1 27V2Z"
          fill="url(#paint0_linear_5075_19109)"
          fill-opacity="0.46"
        />
      </g>
      <defs>
        <filter
          id="filter0_dii_5075_19109"
          x="0"
          y="-1"
          width="8"
          height="32"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood
            floodOpacity="0"
            result="BackgroundImageFix"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite
            in2="hardAlpha"
            operator="out"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5075_19109"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_5075_19109"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite
            in2="hardAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_5075_19109"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite
            in2="hardAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_innerShadow_5075_19109"
            result="effect3_innerShadow_5075_19109"
          />
        </filter>
        <linearGradient
          id="paint0_linear_5075_19109"
          x1="8"
          y1="14"
          x2="1"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop
            offset="0.895833"
            stop-opacity="0"
          />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default IRectangleRed
