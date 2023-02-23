import React from "react"

function HowToPlayIcon({
  width = 22,
  height = 18,
  className,
  stroke = "#A6A9AE"
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
        d="M11 2.64598C12.765 1.59914 14.8143 1 17 1C18.4025 1 19.7489 1.2467 21 1.70009V16.0541C19.7489 15.6007 18.4025 15.354 17 15.354C14.8143 15.354 12.765 15.9532 11 17M11 2.64598V17M11 2.64598C9.23496 1.59914 7.18572 1 5 1C3.59746 1 2.25112 1.2467 1 1.70009V16.0541C2.25112 15.6007 3.59746 15.354 5 15.354C7.18572 15.354 9.23496 15.9532 11 17"
        stroke={stroke}
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default HowToPlayIcon
