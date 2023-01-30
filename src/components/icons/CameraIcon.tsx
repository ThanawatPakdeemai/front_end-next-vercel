import React from "react"

function CameraIcon({
  width = 42,
  height = 42,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 42 42"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="41"
        height="41"
        rx="8.5"
        fill="#18181C"
      />
      <path
        d="M21 13H23.5858C23.851 13 24.1054 13.1054 24.2929 13.2929L25.7071 14.7071C25.8946 14.8946 26.149 15 26.4142 15H30C30.5523 15 31 15.4477 31 16V27C31 27.5523 30.5523 28 30 28H12C11.4477 28 11 27.5523 11 27V21"
        stroke="#E1E2E2"
        strokeWidth="1.2"
      />
      <circle
        cx="21"
        cy="21"
        r="4.4"
        stroke="#E1E2E2"
        strokeWidth="1.2"
      />
      <path
        d="M13 10V18M17 14H9"
        stroke="#E1E2E2"
        strokeWidth="1.2"
      />
      <rect
        x="0.5"
        y="0.5"
        width="41"
        height="41"
        rx="8.5"
        stroke="#232329"
      />
    </svg>
  )
}

export default CameraIcon
