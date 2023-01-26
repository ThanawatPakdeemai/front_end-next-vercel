import React from "react"

function MaskBlogIcon({
  width = 300,
  height = 230,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 370 286"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_dddddd_4265_17024)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M137.827 94C134.619 94 131.736 94 131.736 88.6767V80L116.75 80V101H96V115H123.667L116.75 118.5V122H102.917V136H130.583L121.85 140.419C127.934 150.413 138.863 157 151.333 157C162.646 157 172.69 151.503 179 143.003C185.31 151.503 195.354 157 206.667 157C219.137 157 230.066 150.413 236.15 140.419L227.417 136H255.083V122H241.25V118.5L234.333 115H262V101H241.25V80H226.264V88.6767C226.264 94 222.806 94 220.173 94H137.827ZM172.083 115L165.167 118.5C165.167 126.232 158.973 132.5 151.333 132.5C143.693 132.5 137.5 126.232 137.5 118.5L130.583 115H172.083ZM227.417 115L220.5 118.5C220.5 126.232 214.307 132.5 206.667 132.5C199.027 132.5 192.833 126.232 192.833 118.5L185.917 115H227.417Z"
          fill="#F42728"
        />
      </g>
      <g filter="url(#filter1_dddddd_4265_17024)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M86.1401 62.283C86.804 61.1332 88.0221 60.2361 89.9036 59.657C91.7919 59.0759 94.2737 58.841 97.3168 58.9735C103.401 59.2383 111.507 60.9593 121.095 63.997C137.113 69.0716 157.119 77.7727 178.449 89.2655C175.634 90.7964 172.797 92.3751 169.944 93.9995H171.971C174.495 92.5738 177.006 91.1846 179.5 89.8331C182.284 91.3421 185.09 92.8981 187.911 94.4995H189.931C186.783 92.6986 183.654 90.9531 180.55 89.2655C201.88 77.773 221.886 69.072 237.903 63.9975C247.491 60.9598 255.598 59.2388 261.682 58.9739C264.725 58.8415 267.207 59.0764 269.095 59.6575C270.976 60.2365 272.195 61.1337 272.858 62.2835C273.522 63.4334 273.69 64.9368 273.251 66.8559C272.859 68.5663 271.997 70.5456 270.663 72.7668C269.892 72.2808 268.979 71.9995 268 71.9995C265.239 71.9995 263 74.2381 263 76.9995C263 78.4984 263.66 79.8432 264.704 80.7596C261.764 84.1526 258.137 87.8237 253.897 91.6986C239.059 105.257 216.875 121.162 190.861 136.182C187.044 138.385 183.253 140.508 179.5 142.545C175.747 140.508 171.954 138.385 168.137 136.181C142.123 121.162 119.939 105.256 105.102 91.6981C100.862 87.8236 97.2354 84.1528 94.2952 80.7601C95.3402 79.8437 96 78.4987 96 76.9995C96 74.2381 93.7614 71.9995 91 71.9995C90.0209 71.9995 89.1074 72.281 88.3363 72.7674C87.0016 70.5457 86.1393 68.5661 85.7477 66.8554C85.3083 64.9364 85.4762 63.4329 86.1401 62.283ZM273.724 61.7835C275.3 64.5117 274.417 68.4951 271.457 73.3869C272.408 74.2971 273 75.5792 273 76.9995C273 79.7609 270.761 81.9995 268 81.9995C267.098 81.9995 266.252 81.7608 265.522 81.3431C252.144 96.8133 224.91 117.678 191.361 137.048C187.731 139.143 184.123 141.166 180.549 143.113C200.838 154.062 219.941 162.491 235.568 167.683C236.404 166.088 238.075 165 240 165C242.761 165 245 167.238 245 170C245 170.178 244.991 170.355 244.972 170.529C251.63 172.326 257.369 173.354 261.957 173.554C265 173.686 267.482 173.451 269.37 172.87C271.252 172.291 272.47 171.394 273.134 170.244C273.798 169.094 273.966 167.591 273.526 165.672C273.085 163.746 272.048 161.479 270.412 158.91C267.14 153.774 261.597 147.614 254.172 140.829C252.443 139.249 250.615 137.638 248.692 136H250.23C268.155 151.431 277.64 164.439 274 170.744C271.097 175.771 260.331 175.703 244.768 171.51C244.128 173.533 242.235 175 240 175C237.239 175 235 172.761 235 170C235 169.518 235.068 169.053 235.195 168.612C219.364 163.347 200.016 154.79 179.5 143.682C157.745 155.46 137.306 164.371 120.978 169.529C120.993 169.684 121 169.841 121 170C121 172.761 118.761 175 116 175C114.033 175 112.331 173.864 111.515 172.212C97.419 175.693 87.7292 175.474 84.9987 170.744C81.3585 164.44 90.8433 151.431 108.769 136H110.307C108.384 137.638 106.555 139.25 104.827 140.829C97.4018 147.614 91.8581 153.774 88.5869 158.91C86.9506 161.479 85.9131 163.746 85.4723 165.672C85.033 167.591 85.2008 169.095 85.8647 170.244C86.5286 171.394 87.7467 172.291 89.6282 172.87C91.5165 173.452 93.9983 173.686 97.0414 173.554C100.958 173.383 105.713 172.609 111.163 171.269C111.056 170.864 111 170.438 111 170C111 167.238 113.239 165 116 165C118.254 165 120.16 166.491 120.784 168.542C120.796 168.538 120.808 168.534 120.82 168.53C136.907 163.434 157.017 154.679 178.451 143.113C174.876 141.166 171.268 139.143 167.637 137.047C134.089 117.678 106.856 96.8136 93.4776 81.3435C92.7472 81.7609 91.9015 81.9995 91 81.9995C88.2386 81.9995 86 79.7609 86 76.9995C86 75.5795 86.5919 74.2978 87.5425 73.3876C84.5815 68.4953 83.6988 64.5115 85.2741 61.783C91.3825 51.2029 132.318 63.1922 179.5 88.696C226.681 63.1925 267.616 51.2034 273.724 61.7835ZM285 115C287.761 115 290 112.761 290 110C290 107.238 287.761 105 285 105C282.239 105 280 107.238 280 110C280 112.761 282.239 115 285 115Z"
          fill="#7B5BE6"
        />
      </g>
      <mask
        id="mask0_4265_17024"
        // style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="48"
        y="103"
        width="268"
        height="30"
      >
        <path
          d="M48 119.5L49.5 103.5H316V121L255.5 133V122.5H103V130L48 119.5Z"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_4265_17024)">
        <g filter="url(#filter2_dddddd_4265_17024)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M313.988 116.5C313.962 116.454 313.89 116.356 313.705 116.21C313.372 115.946 312.813 115.641 311.983 115.315C310.332 114.666 307.841 114.02 304.558 113.395C298.007 112.149 288.493 111.021 276.697 110.072C253.116 108.175 220.519 107 184.5 107C148.481 107 115.884 108.175 92.3028 110.072C80.5069 111.021 70.9931 112.149 64.4422 113.395C61.1589 114.02 58.6678 114.666 57.0172 115.315C56.1867 115.641 55.6282 115.946 55.2948 116.21C55.1103 116.356 55.0383 116.454 55.0116 116.5C55.0383 116.546 55.1103 116.644 55.2948 116.79C55.6282 117.054 56.1867 117.359 57.0172 117.685C58.6678 118.334 61.1589 118.98 64.4422 119.605C70.9931 120.851 80.5069 121.979 92.3028 122.928C115.884 124.825 148.481 126 184.5 126C220.519 126 253.116 124.825 276.697 122.928C288.493 121.979 298.007 120.851 304.558 119.605C307.841 118.98 310.332 118.334 311.983 117.685C312.813 117.359 313.372 117.054 313.705 116.79C313.89 116.644 313.962 116.546 313.988 116.5ZM54.9967 116.469L54.9974 116.471L54.9967 116.469ZM54.9967 116.531L54.9974 116.529L54.9967 116.531ZM184.5 127C256.573 127 315 122.299 315 116.5C315 110.701 256.573 106 184.5 106C112.427 106 54 110.701 54 116.5C54 122.299 112.427 127 184.5 127Z"
            fill="#7B5BE6"
          />
        </g>
      </g>
      <g filter="url(#filter3_dddddd_4265_17024)">
        <path
          d="M216.502 56.9817C216.502 56.9817 216.502 56.9825 216.502 56.9843C216.502 56.9826 216.502 56.9817 216.502 56.9817ZM216.444 56.9405C216.47 56.9674 216.485 56.9871 216.493 57C216.485 57.0129 216.47 57.0326 216.444 57.0595C216.366 57.1393 216.223 57.2426 215.991 57.3603C215.53 57.5948 214.817 57.8352 213.855 58.0714C211.94 58.5418 209.148 58.97 205.672 59.3311C198.727 60.0527 189.12 60.5 178.5 60.5C167.88 60.5 158.273 60.0527 151.328 59.3311C147.852 58.97 145.06 58.5418 143.145 58.0714C142.183 57.8352 141.47 57.5948 141.009 57.3603C140.777 57.2426 140.634 57.1393 140.556 57.0595C140.53 57.0326 140.515 57.0129 140.507 57C140.515 56.9871 140.53 56.9674 140.556 56.9405C140.634 56.8607 140.777 56.7574 141.009 56.6397C141.47 56.4052 142.183 56.1648 143.145 55.9286C145.06 55.4582 147.852 55.03 151.328 54.6689C158.273 53.9473 167.88 53.5 178.5 53.5C189.12 53.5 198.727 53.9473 205.672 54.6689C209.148 55.03 211.94 55.4582 213.855 55.9286C214.817 56.1648 215.53 56.4052 215.991 56.6397C216.223 56.7574 216.366 56.8607 216.444 56.9405ZM140.498 56.9817C140.498 56.9817 140.498 56.9826 140.498 56.9843C140.498 56.9825 140.498 56.9817 140.498 56.9817ZM140.498 57.0183C140.498 57.0183 140.498 57.0175 140.498 57.0157C140.498 57.0174 140.498 57.0183 140.498 57.0183ZM216.502 57.0157C216.502 57.0175 216.502 57.0183 216.502 57.0183C216.502 57.0183 216.502 57.0174 216.502 57.0157Z"
          stroke="#7B5BE6"
        />
      </g>
      <defs>
        <filter
          id="filter0_dddddd_4265_17024"
          x="0"
          y="16.4"
          width="358"
          height="269"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood
            flood-opacity="0"
            result="BackgroundImageFix"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.896591" />
          <feGaussianBlur stdDeviation="1.32828" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.106835 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2.15463" />
          <feGaussianBlur stdDeviation="3.19205" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.153479 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_4265_17024"
            result="effect2_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4.05698" />
          <feGaussianBlur stdDeviation="6.01034" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.19 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_4265_17024"
            result="effect3_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="7.23696" />
          <feGaussianBlur stdDeviation="10.7214" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.226521 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_dropShadow_4265_17024"
            result="effect4_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="13.5359" />
          <feGaussianBlur stdDeviation="20.0533" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.273165 0"
          />
          <feBlend
            mode="normal"
            in2="effect4_dropShadow_4265_17024"
            result="effect5_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="32.4" />
          <feGaussianBlur stdDeviation="48" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.38 0"
          />
          <feBlend
            mode="normal"
            in2="effect5_dropShadow_4265_17024"
            result="effect6_dropShadow_4265_17024"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect6_dropShadow_4265_17024"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_dddddd_4265_17024"
          x="4.22852"
          y="4.9375"
          width="365.771"
          height="277.062"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood
            flood-opacity="0"
            result="BackgroundImageFix"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.747159" />
          <feGaussianBlur stdDeviation="1.1069" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.584314 0 0 0 0 0.0666667 0 0 0 0 0.996078 0 0 0 0.177122 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.79553" />
          <feGaussianBlur stdDeviation="2.66004" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.584314 0 0 0 0 0.0666667 0 0 0 0 0.996078 0 0 0 0.254452 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_4265_17024"
            result="effect2_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3.38082" />
          <feGaussianBlur stdDeviation="5.00862" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.584314 0 0 0 0 0.0666667 0 0 0 0 0.996078 0 0 0 0.315 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_4265_17024"
            result="effect3_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6.0308" />
          <feGaussianBlur stdDeviation="8.93452" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.584314 0 0 0 0 0.0666667 0 0 0 0 0.996078 0 0 0 0.375548 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_dropShadow_4265_17024"
            result="effect4_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="11.28" />
          <feGaussianBlur stdDeviation="16.711" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.584314 0 0 0 0 0.0666667 0 0 0 0 0.996078 0 0 0 0.452878 0"
          />
          <feBlend
            mode="normal"
            in2="effect4_dropShadow_4265_17024"
            result="effect5_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="27" />
          <feGaussianBlur stdDeviation="40" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.584314 0 0 0 0 0.0666667 0 0 0 0 0.996078 0 0 0 0.63 0"
          />
          <feBlend
            mode="normal"
            in2="effect5_dropShadow_4265_17024"
            result="effect6_dropShadow_4265_17024"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect6_dropShadow_4265_17024"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_dddddd_4265_17024"
          x="-26"
          y="53"
          width="421"
          height="181"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood
            flood-opacity="0"
            result="BackgroundImageFix"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.747159" />
          <feGaussianBlur stdDeviation="1.1069" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.584314 0 0 0 0 0.0666667 0 0 0 0 0.996078 0 0 0 0.177122 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.79553" />
          <feGaussianBlur stdDeviation="2.66004" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.584314 0 0 0 0 0.0666667 0 0 0 0 0.996078 0 0 0 0.254452 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_4265_17024"
            result="effect2_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3.38082" />
          <feGaussianBlur stdDeviation="5.00862" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.584314 0 0 0 0 0.0666667 0 0 0 0 0.996078 0 0 0 0.315 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_4265_17024"
            result="effect3_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6.0308" />
          <feGaussianBlur stdDeviation="8.93452" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.584314 0 0 0 0 0.0666667 0 0 0 0 0.996078 0 0 0 0.375548 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_dropShadow_4265_17024"
            result="effect4_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="11.28" />
          <feGaussianBlur stdDeviation="16.711" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.584314 0 0 0 0 0.0666667 0 0 0 0 0.996078 0 0 0 0.452878 0"
          />
          <feBlend
            mode="normal"
            in2="effect4_dropShadow_4265_17024"
            result="effect5_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="27" />
          <feGaussianBlur stdDeviation="40" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.584314 0 0 0 0 0.0666667 0 0 0 0 0.996078 0 0 0 0.63 0"
          />
          <feBlend
            mode="normal"
            in2="effect5_dropShadow_4265_17024"
            result="effect6_dropShadow_4265_17024"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect6_dropShadow_4265_17024"
            result="shape"
          />
        </filter>
        <filter
          id="filter3_dddddd_4265_17024"
          x="60"
          y="0"
          width="237"
          height="168"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood
            flood-opacity="0"
            result="BackgroundImageFix"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.747159" />
          <feGaussianBlur stdDeviation="1.1069" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.584314 0 0 0 0 0.0666667 0 0 0 0 0.996078 0 0 0 0.177122 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.79553" />
          <feGaussianBlur stdDeviation="2.66004" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.584314 0 0 0 0 0.0666667 0 0 0 0 0.996078 0 0 0 0.254452 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_4265_17024"
            result="effect2_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3.38082" />
          <feGaussianBlur stdDeviation="5.00862" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.584314 0 0 0 0 0.0666667 0 0 0 0 0.996078 0 0 0 0.315 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_4265_17024"
            result="effect3_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6.0308" />
          <feGaussianBlur stdDeviation="8.93452" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.584314 0 0 0 0 0.0666667 0 0 0 0 0.996078 0 0 0 0.375548 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_dropShadow_4265_17024"
            result="effect4_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="11.28" />
          <feGaussianBlur stdDeviation="16.711" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.584314 0 0 0 0 0.0666667 0 0 0 0 0.996078 0 0 0 0.452878 0"
          />
          <feBlend
            mode="normal"
            in2="effect4_dropShadow_4265_17024"
            result="effect5_dropShadow_4265_17024"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="27" />
          <feGaussianBlur stdDeviation="40" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.584314 0 0 0 0 0.0666667 0 0 0 0 0.996078 0 0 0 0.63 0"
          />
          <feBlend
            mode="normal"
            in2="effect5_dropShadow_4265_17024"
            result="effect6_dropShadow_4265_17024"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect6_dropShadow_4265_17024"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default MaskBlogIcon
