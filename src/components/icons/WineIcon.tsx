import React from "react"

function WineIcon({ width = 24, height = 24 }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 14C14.7949 14 17.103 11.8773 17.4538 9.12891C17.5154 8.64686 17.4557 8.15954 17.3677 7.68161L17.058 6M12 14C9.20505 14 6.89704 11.8773 6.54617 9.12891C6.48463 8.64686 6.54428 8.15954 6.63229 7.68161L6.94196 6M12 14V22M6.94196 6L7.67857 2H12H16.3214L17.058 6M6.94196 6H17.058M12 22H7M12 22H17"
        stroke="#E1E2E2"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default WineIcon
