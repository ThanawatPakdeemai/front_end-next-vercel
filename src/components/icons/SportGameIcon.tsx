import React from "react"

const SportGameIcon = ({
  width = 24,
  height = 24,
  className,
  stroke = "#E1E2E2"
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.8555 12C21.8555 9.63665 20.9445 7.48606 19.4546 5.8802M21.8555 12C21.8555 14.3633 20.9445 16.5139 19.4546 18.1198M21.8555 12H15.8555M12.8555 21C15.4627 21 17.811 19.8914 19.4546 18.1198M12.8555 21C10.2483 21 7.89998 19.8914 6.25632 18.1198M12.8555 21V3M3.85547 12C3.85547 9.63665 4.76641 7.48606 6.25632 5.8802M3.85547 12C3.85547 14.3633 4.76641 16.5139 6.25632 18.1198M3.85547 12H9.85547M12.8555 3C15.4627 3 17.811 4.10863 19.4546 5.8802M12.8555 3C10.2483 3 7.89998 4.10863 6.25632 5.8802M9.85547 12C9.85547 9.36829 8.40318 7.07579 6.25632 5.8802M9.85547 12C9.85547 14.6317 8.40318 16.9242 6.25632 18.1198M9.85547 12H15.8555M15.8555 12C15.8555 9.36829 17.3078 7.07579 19.4546 5.8802M15.8555 12C15.8555 14.6317 17.3078 16.9242 19.4546 18.1198"
      stroke={stroke}
      strokeWidth="1.2"
    />
  </svg>
)

export default SportGameIcon
