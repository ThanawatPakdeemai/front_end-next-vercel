import { SVGProps } from "react"

const Profile2Icon = ({
  width = 16,
  height = 21,
  className
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.98481 13.422C4.11719 13.422 0.814331 14.0067 0.814331 16.3486C0.814331 18.6905 4.09624 19.2963 7.98481 19.2963C11.8524 19.2963 15.1543 18.7105 15.1543 16.3696C15.1543 14.0286 11.8734 13.422 7.98481 13.422Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.98477 10.0817C10.5229 10.0817 12.58 8.02359 12.58 5.4855C12.58 2.9474 10.5229 0.890259 7.98477 0.890259C5.44667 0.890259 3.38858 2.9474 3.38858 5.4855C3.38001 8.01502 5.42382 10.0731 7.95239 10.0817H7.98477Z"
      stroke="white"
      strokeWidth="1.42857"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default Profile2Icon
