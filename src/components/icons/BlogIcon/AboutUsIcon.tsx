import React from "react"

function AboutUsIcon({
  width = 24,
  height = 24,
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
        d="M10.1537 11V11.5C10.1537 12.6046 9.32718 13.5 8.30758 13.5C7.28798 13.5 6.46143 12.6046 6.46143 11.5V11H10.1537Z"
        fill="#D9D9D9"
      />
      <path
        d="M17.5383 11.5C17.5383 12.6046 16.7118 13.5 15.6922 13.5C14.6726 13.5 13.846 12.6046 13.846 11.5V11H17.5383V11.5Z"
        fill="#D9D9D9"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.76923 5V8H0V8.99H3.69231V5H2.76923ZM21.2308 8V5H20.3077V8.99H24V8H21.2308ZM17.3815 7H6.60923V5H5.68615V7.24C5.68615 8 6.07385 8 6.49846 8H17.4923C17.8431 8 18.3046 8 18.3046 7.24V6V5H17.3723V7H17.3815ZM20.3077 11V11.99H24V11H20.3077ZM22.1538 13.99L19.6246 14V14.63C18.8123 16.06 17.3538 17 15.6923 17C14.52 17 13.4492 16.52 12.6277 15.74C12.3969 15.52 12.1846 15.27 12 15C11.8062 15.27 11.5938 15.52 11.3631 15.74C10.5508 16.52 9.48 17 8.30769 17C6.63692 17 5.17846 16.06 4.36615 14.63V14H1.84615L0.923077 13.99V15H3.49846L3.58154 15.15C4.56 16.87 6.31385 18 8.30769 18C9.72 18 11.0215 17.42 12 16.47C12.9785 17.42 14.2708 18 15.6923 18C17.6862 18 19.4308 16.87 20.4092 15.15L20.5015 15H23.0769V13.99H22.1538ZM0 11V11.99H3.69231V11H0Z"
        fill="#E1E2E2"
      />
    </svg>
  )
}
export default AboutUsIcon
