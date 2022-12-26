import React from "react"

function IStacking({
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
        d="M6.5 21H4.5C3.94772 21 3.5 20.5523 3.5 20V4C3.5 3.44772 3.94772 3 4.5 3H20.5C21.0523 3 21.5 3.44772 21.5 4V6M6.5 21V23M6.5 21H18.5M18.5 21H20.5C21.0523 21 21.5 20.5523 21.5 20V18M18.5 21V23M21.5 6H20.6C20.5448 6 20.5 6.04477 20.5 6.1V8.9C20.5 8.95523 20.5448 9 20.6 9H21.5M21.5 6V9M21.5 9V15M21.5 15H20.6C20.5448 15 20.5 15.0448 20.5 15.1V17.9C20.5 17.9552 20.5448 18 20.6 18H21.5M21.5 15V18M7.92928 8.5C7.04516 9.40188 6.5 10.6373 6.5 12C6.5 13.3987 7.07432 14.6633 8 15.5707M7.92928 8.5C8.83675 7.57432 10.1013 7 11.5 7C12.8987 7 14.1633 7.57432 15.0707 8.5M7.92928 8.5L10.7584 11.3291M15 15.5707C15.9257 14.6633 16.5 13.3987 16.5 12C16.5 10.6373 15.9548 9.40188 15.0707 8.5M15 15.5707C14.0981 16.4548 12.8627 17 11.5 17C10.1373 17 8.90188 16.4548 8 15.5707M15 15.5707L12.1709 12.7416M15.0707 8.5L12.2416 11.3291M8 15.5707L10.8291 12.7416M12.2416 11.3291C12.0586 11.127 11.7941 11 11.5 11C11.2059 11 10.9414 11.127 10.7584 11.3291M12.2416 11.3291C12.4022 11.5065 12.5 11.7418 12.5 12C12.5 12.2941 12.373 12.5586 12.1709 12.7416M10.7584 11.3291C10.5978 11.5065 10.5 11.7418 10.5 12C10.5 12.2941 10.627 12.5586 10.8291 12.7416M10.8291 12.7416C11.0065 12.9022 11.2418 13 11.5 13C11.7582 13 11.9935 12.9022 12.1709 12.7416"
        stroke="#010101"
        stroke-width="1.2"
      />
    </svg>
  )
}

export default IStacking
