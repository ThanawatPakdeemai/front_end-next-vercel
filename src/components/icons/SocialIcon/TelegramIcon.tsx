import React from "react"

function TelegramIcon({
  width = 24,
  height = 24,
  fill
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.9601 7.09244L16.8474 17.2756C16.688 17.9943 16.2724 18.1732 15.6817 17.8346L12.4627 15.4102L10.9094 16.937C10.7375 17.1127 10.5937 17.2597 10.2625 17.2597L10.4937 13.9089L16.4599 8.39888C16.7193 8.16251 16.4036 8.03154 16.0567 8.26792L8.68107 13.0145L5.50578 11.9988C4.8151 11.7784 4.8026 11.2928 5.64955 10.9543L18.0694 6.0639C18.6445 5.8435 19.1476 6.19487 18.9601 7.09244Z"
        fill={fill || "#E1E2E2"}
      />
    </svg>
  )
}

export default TelegramIcon
