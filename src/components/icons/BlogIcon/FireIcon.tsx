import React from "react"

function FireIcon({
  width = 24,
  height = 25,
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
        d="M12 22C16.6944 22 20.5 18.3063 20.5 13.75C20.5 6.49361 15.3717 2.97129 12.6582 2.05156C12.5863 2.02718 12.5175 2.08905 12.5301 2.16395C12.964 4.74708 12.1295 10.4774 8.45624 9.99699C8.44158 9.99507 8.42695 9.98983 8.41473 9.9815C7.84048 9.59017 7.52193 8.60076 7.50109 6.92748C7.50012 6.84953 7.41482 6.80164 7.34903 6.84346C5.03113 8.3169 3.5 10.8599 3.5 13.75C3.5 18.3063 7.30558 22 12 22Z"
        fill="#F42728"
      />
    </svg>
  )
}
export default FireIcon
