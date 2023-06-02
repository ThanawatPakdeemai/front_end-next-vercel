import { SVGProps } from "react"

const LogoutIcon = ({
  width = 21,
  height = 21,
  className
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.319 20.8004H4.433C1.989 20.8004 0 18.8114 0 16.3654V5.23638C0 2.79038 1.989 0.800385 4.433 0.800385H9.308C11.754 0.800385 13.744 2.79038 13.744 5.23638V6.16838C13.744 6.58238 13.408 6.91838 12.994 6.91838C12.58 6.91838 12.244 6.58238 12.244 6.16838V5.23638C12.244 3.61638 10.927 2.30038 9.308 2.30038H4.433C2.816 2.30038 1.5 3.61638 1.5 5.23638V16.3654C1.5 17.9844 2.816 19.3004 4.433 19.3004H9.319C10.931 19.3004 12.244 17.9884 12.244 16.3764V15.4334C12.244 15.0194 12.58 14.6834 12.994 14.6834C13.408 14.6834 13.744 15.0194 13.744 15.4334V16.3764C13.744 18.8164 11.758 20.8004 9.319 20.8004Z"
      fill="white"
    />
    <mask
      id="mask0_70_3051"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="6"
      y="10"
      width="15"
      height="2"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.99585 10.0504H20.5367V11.5504H6.99585V10.0504Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_70_3051)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.7868 11.5504H7.74585C7.33185 11.5504 6.99585 11.2144 6.99585 10.8004C6.99585 10.3864 7.33185 10.0504 7.74585 10.0504H19.7868C20.2008 10.0504 20.5368 10.3864 20.5368 10.8004C20.5368 11.2144 20.2008 11.5504 19.7868 11.5504Z"
        fill="white"
      />
    </g>
    <mask
      id="mask1_70_3051"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="16"
      y="7"
      width="5"
      height="8"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.1094 7.13562H20.5367V14.4664H16.1094V7.13562Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask1_70_3051)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.8591 14.4664C16.6671 14.4664 16.4741 14.3934 16.3281 14.2454C16.0361 13.9514 16.0371 13.4774 16.3301 13.1854L18.7241 10.8004L16.3301 8.41637C16.0371 8.12437 16.0351 7.65037 16.3281 7.35637C16.6201 7.06237 17.0941 7.06237 17.3881 7.35437L20.3161 10.2694C20.4581 10.4094 20.5371 10.6014 20.5371 10.8004C20.5371 10.9994 20.4581 11.1914 20.3161 11.3314L17.3881 14.2474C17.2421 14.3934 17.0501 14.4664 16.8591 14.4664Z"
        fill="white"
      />
    </g>
  </svg>
)
export default LogoutIcon
