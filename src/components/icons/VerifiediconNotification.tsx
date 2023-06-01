/* eslint-disable react/style-prop-object */
import React from "react"

function VerifiediconNotification({
  width = 18,
  height = 19
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_938_4112)">
        <g filter="url(#filter1_ii_938_4112)">
          <path
            d="M9.31684 0.131239C9.14185 -0.0437462 8.85815 -0.0437464 8.68316 0.131239L6.30961 2.50479L2.95289 2.50479C2.70542 2.50479 2.50481 2.7054 2.50481 2.95287L2.50481 6.30959L0.131239 8.68316C-0.0437462 8.85815 -0.0437464 9.14185 0.131239 9.31684L2.50481 11.6904L2.50481 15.0471C2.50481 15.2946 2.70542 15.4952 2.95289 15.4952H6.30959L8.68316 17.8688C8.85815 18.0437 9.14185 18.0437 9.31684 17.8688L11.6904 15.4952H15.0471C15.2946 15.4952 15.4952 15.2946 15.4952 15.0471V11.6904L17.8688 9.31684C18.0437 9.14185 18.0437 8.85815 17.8688 8.68316L15.4952 6.30961V2.95287C15.4952 2.70541 15.2946 2.50479 15.0471 2.50479L11.6904 2.50479L9.31684 0.131239Z"
            fill="url(#paint0_linear_938_4112)"
          />
        </g>
      </g>
      <path
        d="M5.5 8.5L8 11L12.5 6.5"
        stroke="#010101"
        strokeWidth="1.8"
      />
      <defs>
        <filter
          id="filter0_d_938_4112"
          x="0"
          y="0"
          width="18"
          height="19"
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
            result="effect1_dropShadow_938_4112"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_938_4112"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_ii_938_4112"
          x="0"
          y="0"
          width="18"
          height="18"
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
            result="effect1_innerShadow_938_4112"
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
            in2="effect1_innerShadow_938_4112"
            result="effect2_innerShadow_938_4112"
          />
        </filter>
        <linearGradient
          id="paint0_linear_938_4112"
          x1="9"
          y1="0"
          x2="9"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F42728" />
          <stop
            offset="1"
            stop-color="#C90001"
          />
        </linearGradient>
      </defs>
    </svg>
  )
}
export default VerifiediconNotification
