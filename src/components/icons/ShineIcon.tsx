import React from "react"

const ShineIcon = ({
  width = 16,
  height = 16,
  fill
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_3342_7511)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.57144 0L7.42857 0V5.06025L5.53297 0.368466L4.47333 0.796588L6.41804 5.60991L2.74721 1.93908L1.93909 2.74721L5.45742 6.26553L0.897928 4.27345L0.440367 5.32071L5.26484 7.42857H0L0 8.57144H5.26483L0.440369 10.6793L0.897928 11.7266L5.45741 9.73448L1.93909 13.2528L2.74721 14.0609L6.41804 10.3901L4.47333 15.2034L5.53297 15.6315L7.42857 10.9398V16H8.57144V10.9398L10.467 15.6315L11.5266 15.2034L9.582 10.3901L13.2528 14.0609L14.0609 13.2528L10.5426 9.73448L15.1021 11.7266L15.5596 10.6793L10.7352 8.57144H16V7.42857H10.7351L15.5596 5.32071L15.1021 4.27345L10.5426 6.26553L14.0609 2.7472L13.2528 1.93908L9.582 5.6099L11.5266 0.796588L10.467 0.368466L8.57144 5.06025V0Z"
        fill={fill || "#4E5057"}
      />
    </g>
    <defs>
      <clipPath id="clip0_3342_7511">
        <rect
          width={width}
          height={height}
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
)
export default ShineIcon
