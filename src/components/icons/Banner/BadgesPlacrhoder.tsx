import React from "react"

function BadgesPlacrhoder({
  width = 160,
  height = 160
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_di_5332_23792)">
        <path
          d="M82.2349 17.4471C81.0007 16.2129 78.9997 16.2129 77.7655 17.4471L61.0245 34.1881L37.3491 34.1881C35.6037 34.1881 34.1888 35.6031 34.1888 37.3485L34.1888 61.0239L17.4476 77.765C16.2134 78.9992 16.2134 81.0003 17.4476 82.2344L34.1888 98.9756L34.1888 122.651C34.1888 124.396 35.6037 125.811 37.3491 125.811H61.0244L77.7655 142.552C78.9997 143.787 81.0007 143.787 82.2349 142.552L98.976 125.811H122.652C124.397 125.811 125.812 124.396 125.812 122.651V98.9754L142.553 82.2345C143.787 81.0003 143.787 78.9992 142.553 77.765L125.812 61.0241V37.3485C125.812 35.6031 124.397 34.1881 122.652 34.1881L98.976 34.1881L82.2349 17.4471Z"
          fill="#0C0C0E"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M63.6175 70.727C62.3396 70.727 61.1912 70.727 61.1912 68.6318V65.2168L55.2218 65.2168V73.4821H46.9565V78.9923H57.9769L55.2218 80.3698V81.7474H49.7116V87.2575H60.732L57.2533 88.9969C59.6769 92.9304 64.03 95.5228 68.9973 95.5228C73.5035 95.5228 77.5044 93.3591 80.0177 90.014C82.5309 93.3591 86.5318 95.5228 91.038 95.5228C96.0053 95.5228 100.358 92.9304 102.782 88.9969L99.3033 87.2575H110.324V81.7474H104.813V80.3698L102.058 78.9923H113.079V73.4821H104.813V65.2168H98.8441V68.6318C98.8441 70.727 97.4666 70.727 96.4178 70.727H63.6175ZM77.2626 78.9923L74.5075 80.3698C74.5075 83.413 72.0405 85.88 68.9973 85.88C65.9541 85.88 63.4871 83.413 63.4871 80.3698L60.732 78.9923H77.2626ZM99.3033 78.9923L96.5482 80.3698C96.5482 83.413 94.0812 85.88 91.038 85.88C87.9948 85.88 85.5278 83.413 85.5278 80.3698L82.7727 78.9923H99.3033Z"
        fill="#18181C"
      />
      <defs>
        <filter
          id="filter0_di_5332_23792"
          x="13.522"
          y="13.5215"
          width="134.957"
          height="134.957"
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
          <feOffset
            dx="1"
            dy="1"
          />
          <feGaussianBlur stdDeviation="2" />
          <feComposite
            in2="hardAlpha"
            operator="out"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.02 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5332_23792"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_5332_23792"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset
            dx="1"
            dy="1"
          />
          <feGaussianBlur stdDeviation="2" />
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
            result="effect2_innerShadow_5332_23792"
          />
        </filter>
      </defs>
    </svg>
  )
}
export default BadgesPlacrhoder
