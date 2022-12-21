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
      viewBox="0 0 10 19"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={className}
    >
      <path
        d="M9 6.35C9 4.6103 7.20914 3.2 5 3.2M5 3.2C2.79086 3.2 1 4.6103 1 6.35C1 8.0897 2.91066 9.0299 5 9.5C7 9.95 9 10.9103 9 12.65C9 14.3897 7.20914 15.8 5 15.8M5 3.2V0.5M5 15.8C2.79086 15.8 1 14.3897 1 12.65M5 15.8V18.5"
        strokeWidth="1.4"
      />
    </svg>
  )
}

function IconDollarNot({
  width = 24,
  height = 24,
  className,
  stroke
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_2223_5319)">
        <mask
          id="mask0_2223_5319"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="25"
        >
          <path
            d="M22.0033 22.5L0 0.500012V24.5H24V0.500012L1.93802 0.5L22.6063 21.1683L22.0033 22.5Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_2223_5319)">
          <path
            d="M4.09473 5.44141L19.5947 20.9414"
            // stroke="#7B5BE6"
            strokeWidth="1.2"
          />
          <path
            d="M16 9.35C16 7.6103 14.2091 6.2 12 6.2M8 9.35C8 7.6103 9.79086 6.2 12 6.2M12 6.2V3.5M16 15.65C16 17.3897 14.2091 18.8 12 18.8M12 18.8C9.79086 18.8 8 17.3897 8 15.65M12 18.8V21.5"
            // stroke="#7B5BE6"
            strokeWidth="1.2"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2223_5319">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
const IconDollar = {
  Ori: IconDollarOri,
  Not: IconDollarNot
}
export default IconDollar
