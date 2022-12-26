import React from "react"

function IDiamond({
  width = 24,
  height = 24,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.5 9.33333L7.04545 4H12.5M2.5 9.33333L12.5 20M2.5 9.33333H8.5M12.5 20L22.5 9.33333M12.5 20L8.5 9.33333M12.5 20L16.5 9.33333M22.5 9.33333L17.9545 4H12.5M22.5 9.33333H16.5M12.5 4L8.5 9.33333M12.5 4L16.5 9.33333M8.5 9.33333H16.5"
        stroke="#010101"
        stroke-width="1.2"
      />
    </svg>
  )
}

export default IDiamond
