import React from "react"

function SafariIcon({
  width = 18,
  height = 18,
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.879639 8.91175C0.879639 3.71467 4.21794 0.252075 8.99619 0.252075C13.7745 0.252075 17.1192 3.71467 17.1192 8.91175C17.1192 13.5328 13.8726 17.7481 9.00275 17.7481C4.12626 17.7481 0.879639 13.5394 0.879639 8.91175ZM5.6972 8.71541C5.6972 11.9489 6.02451 16.3343 8.9962 16.3343C11.9678 16.3343 12.2886 11.9947 12.2886 8.76122C12.2886 5.26595 11.7323 1.44997 8.97658 1.44997C6.22085 1.44997 5.6972 5.1547 5.6972 8.64997V8.71541Z"
        fill="#A6A9AE"
      />
    </svg>
  )
}
export default SafariIcon
