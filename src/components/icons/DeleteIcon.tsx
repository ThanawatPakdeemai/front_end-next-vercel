import React from "react"

function DeleteIcon({
  width = 24,
  height = 24,
  stroke = "#E1E2E2",
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M15.4633 4.26833L15.6292 4.6H16H19C19.2209 4.6 19.4 4.77909 19.4 5V6.4H4.6V5C4.6 4.77909 4.77909 4.6 5 4.6H8H8.37082L8.53666 4.26833L8.98387 3.3739C9.22102 2.8996 9.70579 2.6 10.2361 2.6H13.7639C14.2942 2.6 14.779 2.8996 15.0161 3.3739L15.4633 4.26833ZM7 21.4C6.2268 21.4 5.6 20.7732 5.6 20V8.6H18.4V20C18.4 20.7732 17.7732 21.4 17 21.4H7Z"
        stroke={stroke}
        stroke-width="1.2"
      />
      <path
        d="M15 12L12 15M12 15L9 18M12 15L15 18M12 15L9 12"
        stroke={stroke}
        stroke-width="1.2"
      />
    </svg>
  )
}

export default DeleteIcon
