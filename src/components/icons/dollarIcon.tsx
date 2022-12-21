import React from "react"

function IconDollarOri({
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
      <path
        d="M16 9.35C16 7.6103 14.2091 6.2 12 6.2M12 6.2C9.79086 6.2 8 7.6103 8 9.35C8 11.0897 9.91066 12.0299 12 12.5C14 12.95 16 13.9103 16 15.65C16 17.3897 14.2091 18.8 12 18.8M12 6.2V3.5M12 18.8C9.79086 18.8 8 17.3897 8 15.65M12 18.8V21.5"
        strokeWidth={1.2}
      />
    </svg>
  )
}

function IconDollarHover({
  width = 24,
  height = 24,
  className,
  stroke
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 19"
      xmlns="http://www.w3.org/2000/svg"
      fill="#6F767E"
      className={className}
    >
      <path
        d="M9 6.35C9 4.6103 7.20914 3.2 5 3.2M5 3.2C2.79086 3.2 1 4.6103 1 6.35C1 8.0897 2.91066 9.0299 5 9.5C7 9.95 9 10.9103 9 12.65C9 14.3897 7.20914 15.8 5 15.8M5 3.2V0.5M5 15.8C2.79086 15.8 1 14.3897 1 12.65M5 15.8V18.5"
        className={stroke}
        strokeWidth="1.2"
      />
    </svg>
  )
}

function IconDollarMask({
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
      <g clip-path="url(#clip0_2403_2354)">
        <mask
          id="mask0_2403_2354"
          style={{
            maskType: "alpha"
          }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={width}
          height={height}
        >
          <path
            d="M22.0033 22L0 1.20252e-05V24H24V1.20252e-05L1.93802 0L22.6063 20.6683L22.0033 22Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_2403_2354)">
          <path
            d="M4.09473 4.94141L19.5947 20.4414"
            stroke="#E1E2E2"
            strokeWidth={1.2}
          />
          <path
            d="M16 8.85C16 7.1103 14.2091 5.7 12 5.7M8 8.85C8 7.1103 9.79086 5.7 12 5.7M12 5.7V3M16 15.15C16 16.8897 14.2091 18.3 12 18.3M12 18.3C9.79086 18.3 8 16.8897 8 15.15M12 18.3V21"
            stroke="#E1E2E2"
            strokeWidth={1.2}
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2403_2354">
          <rect
            width={width}
            height={height}
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

const IconDollar = {
  Ori: IconDollarOri,
  Hover: IconDollarHover,
  Mask: IconDollarMask
}
export default IconDollar
