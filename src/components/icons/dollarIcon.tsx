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

const IconDollar = {
  Ori: IconDollarOri,
  Hover: IconDollarHover
}
export default IconDollar
