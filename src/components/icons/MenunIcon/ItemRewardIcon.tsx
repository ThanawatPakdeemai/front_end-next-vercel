import React from "react"

function ItemRewardIcon({
  width = 24,
  height = 24
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <path
        d="M2 9.33333L6.54545 4H12M2 9.33333L12 20M2 9.33333H8M12 20L22 9.33333M12 20L8 9.33333M12 20L16 9.33333M22 9.33333L17.4545 4H12M22 9.33333H16M12 4L8 9.33333M12 4L16 9.33333M8 9.33333H16"
        stroke="#E1E2E2"
        stroke-width="1.2"
      />
    </svg>
  )
}

export default ItemRewardIcon
