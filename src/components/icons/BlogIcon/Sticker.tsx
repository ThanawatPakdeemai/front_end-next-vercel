import * as React from "react"

function Sticker({
  width = 111,
  height = 111,
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
        d="M83.5149 27.6155C68.2047 12.3052 43.1958 12.3052 27.8855 27.6155C12.5753 42.9258 12.5753 67.9346 27.8855 83.2449C35.3272 90.6866 45.2087 94.7734 55.7002 94.7734C66.1917 94.7734 76.0733 90.6866 83.5149 83.2449C90.9566 75.8033 95.0434 65.9217 95.0434 55.4302C95.0434 44.9387 90.8956 34.9962 83.5149 27.6155Z"
        fill="#010101"
        stroke="#232329"
        strokeWidth="1.6091"
        strokeMiterlimit="10"
      />
      <path
        d="M77.2734 76.9798C89.1838 65.0694 89.1838 45.7587 77.2734 33.8483C65.363 21.9379 46.0524 21.9379 34.1419 33.8483C22.2315 45.7587 22.2315 65.0694 34.1419 76.9798C46.0524 88.8902 65.363 88.8902 77.2734 76.9798Z"
        stroke="#232329"
        strokeWidth="1.6091"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M46.4287 40.9774C49.4176 38.3545 52.5894 36.1586 55.7003 34.5117"
        stroke="#232329"
        strokeWidth="1.6091"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.7778 55.4359C36.9127 51.4101 39.9626 47.2623 43.7444 43.4805"
        stroke="#232329"
        strokeWidth="1.6091"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M59.6043 32.6806C66.8019 29.8138 73.4506 29.9968 77.2324 33.8396C83.8201 40.4273 79.4893 55.4326 67.5949 67.327C55.7004 79.2215 40.6951 83.5523 34.1075 76.9646C30.2646 73.1217 30.1426 66.3511 33.1315 59.0314"
        stroke="#232329"
        strokeWidth="1.6091"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M78.2691 59.0938C81.197 66.4134 81.075 73.1231 77.2322 77.0269C73.4504 80.8087 66.8017 80.9917 59.604 78.1859"
        stroke="#232329"
        strokeWidth="1.6091"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.7451 67.3293C31.8506 55.4349 27.5199 40.4296 34.1075 33.8419C40.6952 27.2542 55.7005 31.585 67.595 43.4795C71.3768 47.2613 74.4267 51.3481 76.5616 55.4349"
        stroke="#232329"
        strokeWidth="1.6091"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M55.7003 76.2938C52.5894 74.6469 49.4176 72.451 46.4287 69.8281"
        stroke="#232329"
        strokeWidth="1.6091"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M70.3398 70.0703L77.2325 76.963"
        stroke="#232329"
        strokeWidth="1.6091"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M67.5939 67.3234L64.3 64.0295C59.5423 59.2717 51.7956 59.2717 47.0378 64.0295L34.1064 76.9609L47.0378 64.0295C51.7956 59.2717 51.7956 51.5251 47.0378 46.7673L34.1064 33.8359L47.0378 46.7673C51.7956 51.5251 59.5423 51.5251 64.3 46.7673L67.5939 43.4735L64.3 46.7673C59.5423 51.5251 59.5423 59.2717 64.3 64.0295L67.5939 67.3234Z"
        fill="#232329"
        stroke="#232329"
        strokeWidth="1.6091"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M77.2323 33.8359L69.9736 41.0946"
        stroke="#232329"
        strokeWidth="1.6091"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Sticker
