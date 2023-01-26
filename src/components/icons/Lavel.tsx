import React from "react"

function Lavel({
  width = 46,
  height = 46,
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
        d="M24.7647 2.23098C23.7901 1.25634 22.2099 1.25634 21.2353 2.23098L16.4 7.06621L9.56198 7.06621C8.18362 7.06621 7.06625 8.18358 7.06625 9.56194L7.06625 16.4L2.23098 21.2353C1.25634 22.2099 1.25634 23.7901 2.23098 24.7647L7.06625 29.6L7.06625 36.438C7.06625 37.8164 8.18362 38.9338 9.56197 38.9338H16.4L21.2353 43.769C22.2099 44.7437 23.7901 44.7437 24.7647 43.769L29.6 38.9338H36.4381C37.8164 38.9338 38.9338 37.8164 38.9338 36.438V29.6L43.769 24.7647C44.7437 23.7901 44.7437 22.2099 43.769 21.2353L38.9338 16.4V9.56194C38.9338 8.18358 37.8164 7.06621 36.4381 7.06621L29.6 7.06621L24.7647 2.23098Z"
        stroke="#010101"
        strokeWidth="3"
      />
      <g filter="url(#filter0_ii_14_392)">
        <path
          d="M23.7041 3.29164C23.3152 2.90279 22.6848 2.90279 22.2959 3.29164L17.0213 8.56621L9.56198 8.56621C9.01205 8.56621 8.56625 9.01201 8.56625 9.56194L8.56625 17.0213L3.29164 22.2959C2.90279 22.6848 2.90279 23.3152 3.29164 23.7041L8.56625 28.9787L8.56625 36.438C8.56625 36.988 9.01205 37.4338 9.56197 37.4338H17.0213L22.2959 42.7084C22.6848 43.0972 23.3152 43.0972 23.7041 42.7084L28.9787 37.4338H36.4381C36.988 37.4338 37.4338 36.988 37.4338 36.438V28.9786L42.7084 23.7041C43.0972 23.3152 43.0972 22.6848 42.7084 22.2959L37.4338 17.0214V9.56194C37.4338 9.01201 36.988 8.56621 36.4381 8.56621L28.9787 8.56621L23.7041 3.29164Z"
          fill="url(#paint0_linear_14_392)"
        />
      </g>
      <defs>
        <filter
          id="filter0_ii_14_392"
          x="3"
          y="3"
          width="40"
          height="40"
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
          <feOffset dy="1" />
          <feComposite
            in2="hardAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_14_392"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
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
            in2="effect1_innerShadow_14_392"
            result="effect2_innerShadow_14_392"
          />
        </filter>
        <linearGradient
          id="paint0_linear_14_392"
          x1="23"
          y1="3"
          x2="23"
          y2="43"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F42728" />
          <stop
            offset="1"
            stopColor="#C90001"
          />
        </linearGradient>
      </defs>
    </svg>
  )
}
export default Lavel
