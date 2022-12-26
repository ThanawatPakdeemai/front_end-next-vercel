import React from "react"

function ICoupon({
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
        d="M20.5 5H4.50003C3.94775 5 3.50003 5.44771 3.50003 5.99999L3.5 10C4.60457 10 5.5 10.8954 5.5 12C5.5 13.1046 4.60457 14 3.5 14L3.50003 18C3.50003 18.5523 3.94775 19 4.50003 19H20.5C21.0523 19 21.5 18.5523 21.5 18V14C20.3954 14 19.5 13.1046 19.5 12C19.5 10.8954 20.3954 10 21.5 10V6C21.5 5.44772 21.0523 5 20.5 5Z"
        stroke="#010101"
        stroke-width="1.2"
      />
      <path
        d="M11.9482 10.5456L12.5 9.26413L13.0518 10.5456C13.1677 10.8145 13.4212 10.9987 13.7127 11.0257L15.102 11.1546L14.0538 12.0754C13.8338 12.2686 13.737 12.5666 13.8013 12.8523L14.1081 14.2134L12.9084 13.501C12.6567 13.3515 12.3433 13.3515 12.0916 13.501L10.8919 14.2134L11.1987 12.8523C11.263 12.5666 11.1662 12.2686 10.9462 12.0754L9.89804 11.1546L11.2873 11.0257C11.5788 10.9987 11.8323 10.8145 11.9482 10.5456ZM15.4509 10.8481L15.4507 10.8482L15.4509 10.8481ZM10.4926 14.4505C10.4927 14.4504 10.4927 14.4504 10.4928 14.4503L10.4926 14.4505ZM12.6835 8.83794L12.6837 8.83759L12.5 8.75848L12.6837 8.83759C12.6836 8.8377 12.6836 8.83782 12.6835 8.83794Z"
        stroke="#010101"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default ICoupon
