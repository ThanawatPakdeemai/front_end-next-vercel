import React from "react"

function Campfire({
  width = 24,
  height = 24,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 22L22 16M2 16L22 22"
        stroke="#E1E2E2"
        stroke-width="1.2"
        stroke-linecap="round"
      />
      <path
        d="M8.71126 6.8822L8.71126 6.88221C8.80815 6.94689 8.91277 6.98108 9.01023 6.99334C9.9318 7.10932 10.7046 6.84449 11.3114 6.3363C11.9006 5.84293 12.3069 5.14419 12.5815 4.41493C13.005 3.28985 13.157 1.97869 13.1162 0.916252C15.2749 1.92432 18.4 4.55197 18.4 9.4C18.4 12.6809 15.5684 15.4 12 15.4C8.43163 15.4 5.6 12.6809 5.6 9.4C5.6 7.62093 6.42732 6.013 7.75663 4.90855C7.79532 5.2139 7.85268 5.49051 7.93066 5.73676C8.08056 6.21012 8.32399 6.62367 8.71126 6.8822Z"
        stroke="#E1E2E2"
        stroke-width="1.2"
      />
    </svg>
  )
}

export default Campfire
