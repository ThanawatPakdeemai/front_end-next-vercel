import React from "react"

function DiscordIcon({
  width = 24,
  height = 24
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5535 7.005C16.5178 6.5355 15.4104 6.19429 14.2526 6C14.1104 6.24907 13.9443 6.58408 13.8298 6.85057C12.599 6.67124 11.3796 6.67124 10.1714 6.85057C10.0569 6.58408 9.88704 6.24907 9.74357 6C8.58454 6.19429 7.47584 6.53675 6.44013 7.00748C4.3511 10.066 3.78479 13.0486 4.06794 15.9888C5.4535 16.9913 6.79627 17.6003 8.11638 17.9988C8.44233 17.5641 8.73302 17.1021 8.98345 16.6152C8.5065 16.4396 8.04969 16.2229 7.61805 15.9714C7.73256 15.8892 7.84457 15.8032 7.95279 15.7148C10.5855 16.9079 13.4459 16.9079 16.0472 15.7148C16.1566 15.8032 16.2686 15.8892 16.3819 15.9714C15.949 16.2242 15.4909 16.4408 15.014 16.6165C15.2644 17.1021 15.5538 17.5654 15.881 18C17.2024 17.6015 18.5464 16.9925 19.932 15.9888C20.2642 12.5803 19.3644 9.62516 17.5535 7.005ZM9.34212 14.1806C8.55181 14.1806 7.9037 13.4658 7.9037 12.5953C7.9037 11.7248 8.53797 11.0087 9.34212 11.0087C10.1463 11.0087 10.7944 11.7235 10.7805 12.5953C10.7818 13.4658 10.1463 14.1806 9.34212 14.1806ZM14.6578 14.1806C13.8675 14.1806 13.2194 13.4658 13.2194 12.5953C13.2194 11.7248 13.8537 11.0087 14.6578 11.0087C15.462 11.0087 16.1101 11.7235 16.0962 12.5953C16.0962 13.4658 15.462 14.1806 14.6578 14.1806Z"
        fill="#E1E2E2"
      />
    </svg>
  )
}

export default DiscordIcon
