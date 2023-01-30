import React from "react"

function BlogIcon({
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
        d="M12 6.14598C13.765 5.09914 15.8143 4.5 18 4.5C19.4025 4.5 20.7489 4.7467 22 5.20009V19.5541C20.7489 19.1007 19.4025 18.854 18 18.854C15.8143 18.854 13.765 19.4532 12 20.5M12 6.14598V20.5M12 6.14598C10.235 5.09914 8.18572 4.5 6 4.5C4.59746 4.5 3.25112 4.7467 2 5.20009V19.5541C3.25112 19.1007 4.59746 18.854 6 18.854C8.18572 18.854 10.235 19.4532 12 20.5"
        stroke="#E1E2E2"
        strokeWidth="1.2"
      />
    </svg>
  )
}
export default BlogIcon
