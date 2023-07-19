import React from "react"

function EditIcon({
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
      <mask
        id="mask0_12318_7111"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <path
          d="M0 24V0H7.00711L18.4171 11.41L19.615 10.2121L9.40295 0H24V24H0Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_12318_7111)">
        <path
          d="M3.6 20.4V17.4985L15.6743 5.42426L16.9672 4.13137C17.1234 3.97516 17.3766 3.97516 17.5328 4.13137L19.8686 6.46716L20.2929 6.04289L19.8686 6.46716C20.0248 6.62337 20.0248 6.87663 19.8686 7.03284L18.5757 8.32574L6.50147 20.4H3.6Z"
          stroke={stroke}
          stroke-width="1.2"
        />
      </g>
    </svg>
  )
}

export default EditIcon
