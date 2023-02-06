import React from "react"

const WhatsNewIcon = ({
  width = 24,
  height = 24,
  className,
  color = "#E1E2E2"
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.77816 9.81051H9.27522L9.62669 9.45904L12 7.08573L14.3733 9.45904L14.7248 9.81051H15.2218H18.5782V13.1668V13.6639L18.9296 14.0154L21.3029 16.3887L19.2811 18.4105H17.2479C17.0053 18.8468 16.71 19.2497 16.3705 19.6105H19.7782L22.1515 17.2372L23 16.3887L22.1515 15.5401L19.7782 13.1668V9.81051V8.61051H18.5782H15.2218L12.8485 6.2372L12 5.38867L11.1515 6.2372L8.77816 8.61051H5.42183H4.22183V9.81051V13.1668L1.84853 15.5401L1 16.3887L1.84853 17.2372L4.22183 19.6105H7.62953C7.29 19.2497 6.99466 18.8468 6.75214 18.4105H4.71888L2.69706 16.3887L5.07035 14.0154L5.42183 13.6639V13.1668V9.81051H8.77816Z"
      fill={color}
    />
    <path
      d="M2 19H22M12 17.5V12.5M12 12.5L11 13.5H13L12 12.5Z"
      stroke={color}
      strokeWidth="1.2"
    />
  </svg>
)

export default WhatsNewIcon
