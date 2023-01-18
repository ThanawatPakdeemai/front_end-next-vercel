import React from "react"

function SendIcon({
  width = 17,
  height = 17,
  className,
  stroke = "#E1E2E2"
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.58209 9.85448L7.49477 9.50523L7.14552 9.41791L0.836082 7.84055L14.8678 1.60425C15.2025 1.45548 15.5445 1.7975 15.3958 2.13223L9.15945 16.1639L7.58209 9.85448Z"
        stroke={stroke}
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default SendIcon
