import React from "react"

function EthereumIcon({
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
      <g clipPath="url(#clip0_8252_36419)">
        <rect
          width="24"
          height="24"
          rx="4"
          fill="#627EEA"
        />
        <g clipPath="url(#clip1_8252_36419)">
          <path
            d="M12 24C18.6275 24 24 18.6275 24 12C24 5.37258 18.6275 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6275 5.37258 24 12 24Z"
            fill="#627EEA"
          />
          <path
            d="M12 3.09765V9.75015L17.6228 12.2627L12 3.09765Z"
            fill="white"
            fillOpacity="0.602"
          />
          <path
            d="M12 3.09765L6.3765 12.2627L12 9.75015V3.09765Z"
            fill="#FCFCFD"
          />
          <path
            d="M12 16.764V21.2843L17.6265 13.5L12 16.764Z"
            fill="white"
            fillOpacity="0.602"
          />
          <path
            d="M12 21.2842V16.7633L6.3765 13.5L12 21.2842Z"
            fill="#FCFCFD"
          />
          <path
            d="M12 15.5258L17.6228 12.261L12 9.75V15.5258Z"
            fill="white"
            fillOpacity="0.2"
          />
          <path
            d="M6.3765 12.261L12 15.5257V9.75L6.3765 12.261Z"
            fill="white"
            fillOpacity="0.602"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_8252_36419">
          <rect
            width="24"
            height="24"
            rx="4"
            fill="white"
          />
        </clipPath>
        <clipPath id="clip1_8252_36419">
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

export default EthereumIcon
