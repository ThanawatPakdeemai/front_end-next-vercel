import React from "react"

function ILogoMaster({
  width = 25,
  height = 12,
  className,
  color
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width || "25"}
      height={height || "12"}
      viewBox="0 0 25 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.54734 2.5C6.0835 2.5 5.66667 2.5 5.66667 1.73953V0.5L3.5 0.5V3.5H0.5V5.5H4.5L3.5 6V6.5H1.5V8.5H5.5L4.23736 9.13132C5.11702 10.559 6.69707 11.5 8.5 11.5C10.1356 11.5 11.5878 10.7147 12.5 9.50048C13.4122 10.7147 14.8644 11.5 16.5 11.5C18.3029 11.5 19.883 10.559 20.7626 9.13132L19.5 8.5H23.5V6.5H21.5V6L20.5 5.5H24.5V3.5H21.5V0.5H19.3333V1.73953C19.3333 2.5 18.8333 2.5 18.4527 2.5H6.54734ZM11.5 5.5L10.5 6C10.5 7.10457 9.60457 8 8.5 8C7.39543 8 6.5 7.10457 6.5 6L5.5 5.5H11.5ZM19.5 5.5L18.5 6C18.5 7.10457 17.6046 8 16.5 8C15.3954 8 14.5 7.10457 14.5 6L13.5 5.5H19.5Z"
        fill={color || "#F42728"}
      />
    </svg>
  )
}

export default ILogoMaster
