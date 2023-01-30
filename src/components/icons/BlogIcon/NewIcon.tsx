import React from "react"

function NewIcon({
  width = 24,
  height = 24,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.77816 9.31051H9.27522L9.62669 8.95904L12 6.58573L14.3733 8.95904L14.7248 9.31051H15.2218H18.5782V12.6668V13.1639L18.9296 13.5154L21.3029 15.8887L19.2811 17.9105H17.2479C17.0053 18.3468 16.71 18.7497 16.3705 19.1105H19.7782L22.1515 16.7372L23 15.8887L22.1515 15.0401L19.7782 12.6668V9.31051V8.11051H18.5782H15.2218L12.8485 5.7372L12 4.88867L11.1515 5.7372L8.77816 8.11051H5.42183H4.22183V9.31051V12.6668L1.84853 15.0401L1 15.8887L1.84853 16.7372L4.22183 19.1105H7.62953C7.29 18.7497 6.99466 18.3468 6.75214 17.9105H4.71888L2.69706 15.8887L5.07035 13.5154L5.42183 13.1639V12.6668V9.31051H8.77816Z"
        fill="#70727B"
      />
      <path
        d="M2 18.5H22M12 17V12M12 12L11 13H13L12 12Z"
        stroke="#70727B"
        strokeWidth="1.2"
      />
    </svg>
  )
}
export default NewIcon
