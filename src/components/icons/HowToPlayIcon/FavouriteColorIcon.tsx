import React from "react"

function FavouriteColorIcon({
  width = 20,
  height = 17,
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
      <g filter="url(#filter0_ii_5620_200)">
        <path
          d="M5 0C2.23858 0 0 2.23858 0 5C0 6.12561 0.0754818 7.49265 1.35671 8.98741C2.63793 10.4822 10 17.0004 10 17.0004C10 17.0004 17.3621 10.4822 18.6433 8.98741C19.9245 7.49265 20 6.12561 20 5C20 2.23858 17.7614 0 15 0C12.2386 0 10 2.23858 10 5C10 2.23858 7.76142 0 5 0Z"
          fill="url(#paint0_linear_5620_200)"
        />
      </g>
      <defs>
        <filter
          id="filter0_ii_5620_200"
          x="0"
          y="-1"
          width="20"
          height="19"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood
            floodOpacity="0"
            result="BackgroundImageFix"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
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
            result="effect1_innerShadow_5620_200"
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
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_5620_200"
            result="effect2_innerShadow_5620_200"
          />
        </filter>
        <linearGradient
          id="paint0_linear_5620_200"
          x1="0"
          y1="0"
          x2="21.6568"
          y2="2.25108"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D91212" />
          <stop
            offset="0.510417"
            stopColor="#7B5BE6"
          />
          <stop
            offset="1"
            stopColor="#27F1EC"
          />
        </linearGradient>
      </defs>
    </svg>
  )
}
export default FavouriteColorIcon
