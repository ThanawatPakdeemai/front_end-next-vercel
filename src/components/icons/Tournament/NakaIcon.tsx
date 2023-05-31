import React from "react"

function NakaIcon({
  width = "25",
  height = "13",
  color = "#4E5057"
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.36132 2.89062C5.88298 2.89062 5.45312 2.89062 5.45312 2.10639V0.828125L3.21875 0.828125V3.92188H0.125V5.98438H4.25L3.21875 6.5V7.01562H1.15625V9.07812H5.28125L3.97915 9.72917C4.8863 11.2015 6.51573 12.1719 8.375 12.1719C10.0617 12.1719 11.5593 11.362 12.5 10.1099C13.4407 11.362 14.9383 12.1719 16.625 12.1719C18.4843 12.1719 20.1137 11.2015 21.0208 9.72917L19.7188 9.07812H23.8438V7.01562H21.7812V6.5L20.75 5.98438H24.875V3.92188H21.7812V0.828125H19.5469V2.10639C19.5469 2.89062 19.0312 2.89062 18.6387 2.89062H6.36132ZM11.4688 5.98438L10.4375 6.5C10.4375 7.63909 9.51409 8.5625 8.375 8.5625C7.23591 8.5625 6.3125 7.63909 6.3125 6.5L5.28125 5.98438H11.4688ZM19.7188 5.98438L18.6875 6.5C18.6875 7.63909 17.7641 8.5625 16.625 8.5625C15.4859 8.5625 14.5625 7.63909 14.5625 6.5L13.5312 5.98438H19.7188Z"
        fill={color}
      />
    </svg>
  )
}

export default NakaIcon
