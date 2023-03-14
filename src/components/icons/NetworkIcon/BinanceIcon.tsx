import React from "react"

function BinanceIcon({
  width = 24,
  height = 24
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_7897_35364)">
        <rect
          width="24"
          height="24"
          rx="4"
          fill="#F0B90B"
        />
        <g clipPath="url(#clip1_7897_35364)">
          <path
            d="M12 24C18.6275 24 24 18.6275 24 12C24 5.37258 18.6275 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6275 5.37258 24 12 24Z"
            fill="#F0B90B"
          />
        </g>
        <g clipPath="url(#clip2_7897_35364)">
          <path
            d="M7.37901 5.6422L11.9585 3L16.5379 5.6422L14.8543 6.6183L11.9585 4.9522L9.06264 6.6183L7.37901 5.6422ZM16.5379 8.97439L14.8543 7.9983L11.9585 9.66439L9.06264 7.9983L7.37901 8.97439V10.9266L10.2748 12.5927V15.9249L11.9585 16.901L13.6421 15.9249V12.5927L16.5379 10.9266V8.97439ZM16.5379 14.2588V12.3066L14.8543 13.2827V15.2348L16.5379 14.2588ZM17.7333 14.9488L14.8375 16.6149V18.567L19.4169 15.9249V10.6405L17.7333 11.6166V14.9488ZM16.0497 7.3083L17.7333 8.28439V10.2366L19.4169 9.26048V7.3083L17.7333 6.3322L16.0497 7.3083ZM10.2748 17.3217V19.2739L11.9585 20.25L13.6421 19.2739V17.3217L11.9585 18.2978L10.2748 17.3217ZM7.37901 14.2588L9.06264 15.2348V13.2827L7.37901 12.3066V14.2588ZM10.2748 7.3083L11.9585 8.28439L13.6421 7.3083L11.9585 6.3322L10.2748 7.3083ZM6.18362 8.28439L7.86725 7.3083L6.18362 6.3322L4.5 7.3083V9.26048L6.18362 10.2366V8.28439ZM6.18362 11.6166L4.5 10.6405V15.9249L9.07945 18.567V16.6149L6.18362 14.9488V11.6166Z"
            fill="#FCFCFD"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_7897_35364">
          <rect
            width="24"
            height="24"
            rx="4"
            fill="white"
          />
        </clipPath>
        <clipPath id="clip1_7897_35364">
          <rect
            width="24"
            height="24"
            fill="white"
          />
        </clipPath>
        <clipPath id="clip2_7897_35364">
          <rect
            width="15"
            height="17.25"
            fill="white"
            transform="translate(4.5 3)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default BinanceIcon
