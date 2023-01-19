import React from "react"

function IReferrals({
  width = 24,
  // height = 24,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 4C4 2.89543 4.89543 2 6 2H18C19.1046 2 20 2.89543 20 4V17C20 18.1046 19.1046 19 18 19H14.5L12 22L9.5 19H6C4.89543 19 4 18.1046 4 17V4Z"
        stroke="#010101"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M8 15.5C8.53416 13.7156 10.123 12.4212 12 12.4212C13.877 12.4212 15.4658 13.7156 16 15.5M14.2222 8.19911C14.2222 9.41364 13.2273 10.3982 12 10.3982C10.7727 10.3982 9.77778 9.41364 9.77778 8.19911C9.77778 6.98457 10.7727 6 12 6C13.2273 6 14.2222 6.98457 14.2222 8.19911Z"
        stroke="#010101"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default IReferrals
