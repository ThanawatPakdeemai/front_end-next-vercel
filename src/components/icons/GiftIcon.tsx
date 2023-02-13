import React from "react"

function GiftIcon({
  width = 42,
  height = 42,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21 17L13 17C12.4478 17 12 17.4477 12 18L12 30C12 30.5523 12.4477 31 13 31H21M21 17L29 17C29.5523 17 30 17.4477 30 18V30C30 30.5523 29.5523 31 29 31H21M21 17L21 31"
        stroke="#3DCD95"
        stroke-width="1.2"
      />
      <path
        d="M21.8787 16.1213C23.0503 17.2929 24.9497 17.2929 26.1213 16.1213C27.2929 14.9497 27.2929 13.0503 26.1213 11.8787C24.9497 10.7071 23.0503 10.7071 21.8787 11.8787C20.7071 13.0503 20.7071 14.9497 21.8787 16.1213ZM21.8787 16.1213L27 21.2426M20.1213 16.1213C18.9497 17.2929 17.0503 17.2929 15.8787 16.1213C14.7071 14.9497 14.7071 13.0503 15.8787 11.8787C17.0503 10.7071 18.9497 10.7071 20.1213 11.8787C21.2929 13.0503 21.2929 14.9497 20.1213 16.1213ZM20.1213 16.1213L15 21.2426"
        stroke="#3DCD95"
        stroke-width="1.2"
      />
    </svg>
  )
}

export default GiftIcon
