import React from "react"

function NakaPreload({
  width = "433",
  height = "298",
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_dddddd_663_6428)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M100.61 71.9483L100.61 81.3855L130.657 81.3855L130.657 79.4677L130.657 75.5524C130.655 74.3453 130.651 73.1381 130.647 71.9483L100.61 71.9483ZM304.14 71.9483C304.14 73.1819 304.141 74.4104 304.141 75.6355C304.142 77.5583 304.142 79.4728 304.142 81.3855L334.141 81.3855L334.141 71.9483L304.14 71.9483ZM334.141 86.1041L304.14 86.1041C304.141 86.4863 304.141 86.8687 304.142 87.2514C304.145 89.8904 304.148 92.5429 304.125 95.2369L297.407 95.2369L297.407 95.5413L334.141 95.5413L334.141 86.1041ZM334.141 100.26L100.61 100.26L100.61 108.669L64.1444 108.669C64.1222 108.806 64.1027 109.163 64.0858 109.697L370.707 109.697L370.707 108.625L334.141 108.625L334.141 100.26ZM370.707 114.416L64.0167 114.416C63.9976 117.176 63.9952 120.582 64.0079 123.853L370.707 123.853L370.707 114.416ZM370.707 128.572L64.038 128.572C64.0739 132.434 64.1343 135.389 64.2156 135.667L110.642 135.667L110.642 138.009L130.726 138.009L130.726 135.794C131.468 135.566 198.036 135.451 200.691 135.691C200.725 136.445 200.737 137.208 200.716 138.009L234.129 138.009L234.129 135.695L304.073 135.695L304.073 138.009L324.165 138.009L324.165 135.618L362.313 135.618C362.79 135.618 363.267 135.619 363.744 135.62C364.698 135.622 365.651 135.624 366.605 135.618C367.052 135.616 367.5 135.619 367.947 135.623C368.876 135.629 369.801 135.635 370.707 135.595L370.707 128.572ZM334.122 142.727L294.116 142.727L294.116 152.165L357.455 152.165L357.455 149.161L351.644 149.161L345.782 149.161C345.141 149.161 344.5 149.161 343.859 149.161C342.581 149.162 341.303 149.162 340.025 149.161C338.892 149.16 337.759 149.156 336.609 149.153C335.791 149.15 334.964 149.148 334.122 149.146L334.122 142.727ZM357.455 156.883L290.821 156.883L290.821 159.231L287.486 159.231L287.486 162.589L280.814 162.589L280.814 165.958C279.972 166.014 279.18 166.008 278.404 166.002C278.07 166 277.74 165.997 277.409 166C276.7 166.004 275.992 166.003 275.254 166.001C274.873 166.001 274.484 166 274.083 166L274.083 166.32L357.455 166.32L357.455 156.883ZM357.455 171.039L77.3212 171.039L77.3212 176.157L98.9026 176.157C101.306 176.157 103.708 176.156 106.112 176.156C110.917 176.155 115.726 176.154 120.545 176.157L120.545 179.428L114.118 179.428L114.118 180.476L320.665 180.476C320.636 179.932 320.601 179.539 320.56 179.381L314.252 179.381L314.252 176.153L321.513 176.153L328.736 176.153L335.854 176.153L343.078 176.153C343.819 176.153 344.56 176.153 345.301 176.154C346.968 176.156 348.634 176.158 350.301 176.151C351.067 176.147 351.833 176.151 352.6 176.155C354.222 176.164 355.843 176.172 357.455 176.11L357.455 171.039ZM320.761 185.195L114.118 185.195L114.118 189.604L117.298 189.604L117.298 193.002L120.616 193.002L120.616 194.632L210.811 194.632L210.811 192.913L214.125 192.913L214.125 189.708C215.311 189.5 219.884 189.534 220.718 189.763L220.718 193L224.07 193L224.07 194.632L314.223 194.632L314.223 192.915L317.577 192.915L317.577 189.557L320.637 189.557C320.723 188.939 320.762 187.127 320.761 185.195ZM310.869 199.351L227.421 199.351L227.421 199.744L230.744 199.744L230.744 203.041L237.422 203.041L237.422 206.422L244.061 206.422L244.061 208.788L294.137 208.788L294.137 206.375L300.799 206.375L300.799 203.079C301.903 203.012 302.987 203.02 304.068 203.028C305.213 203.036 306.355 203.045 307.517 202.964L307.517 199.695L310.869 199.695L310.869 199.351ZM190.776 208.788L140.698 208.788L140.698 206.422L134.042 206.422L134.042 203.045C132.874 203.024 131.732 203.026 130.593 203.028C129.509 203.031 128.428 203.033 127.326 203.015L127.326 199.744L123.97 199.744L123.97 199.351L207.457 199.351L207.457 199.693L204.103 199.693L204.103 202.99L197.416 202.99L197.416 206.358C196.232 206.428 195.074 206.42 193.912 206.413C192.876 206.406 191.837 206.399 190.776 206.447L190.776 208.788ZM77.3212 166.32L160.718 166.32L160.718 166.006L154.055 166.006L154.055 162.627L147.315 162.627L147.315 159.231L144.016 159.231L144.016 156.883L77.3212 156.883L77.3212 166.32ZM77.3212 152.165L140.718 152.165L140.719 142.727L100.625 142.727L100.625 149.176L77.3212 149.176L77.3212 152.165ZM190.761 142.727C190.73 143.419 190.735 144.088 190.74 144.748C190.742 145.09 190.745 145.428 190.742 145.767C190.738 146.496 190.739 147.224 190.741 147.953C190.741 148.318 190.742 148.682 190.742 149.047L190.742 152.165L244.061 152.165C244.053 150.561 244.054 148.976 244.055 147.387C244.056 145.844 244.057 144.297 244.05 142.727L190.761 142.727ZM247.398 156.883L187.392 156.883C187.392 157.251 187.392 157.623 187.393 158.003C187.394 158.391 187.395 158.787 187.395 159.197L184.097 159.197L184.097 162.576L180.716 162.576L180.716 165.972L170.694 165.972L170.694 166.32L264.174 166.32L264.174 166.019C262.372 165.996 260.6 165.998 258.827 166.001C257.256 166.003 255.683 166.005 254.087 165.989L254.087 162.625L250.773 162.625L250.773 159.246L247.398 159.246L247.398 156.883ZM100.61 95.5413L137.344 95.5413L137.344 95.1903L130.657 95.1903L130.657 91.2114L130.657 86.1041L100.61 86.1041L100.61 95.5413Z"
          fill="#F32429"
        />
        <mask
          id="mask0_663_6428"
          maskUnits="userSpaceOnUse"
          x="64"
          y="71"
          width="305"
          height="141"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M140.745 97.9838C134.868 98.0113 129.586 98.036 129.541 88.4L129.467 72.6938L102.013 72.8222L102.191 110.836L64.1778 111.013L64.2963 136.356L114.981 136.119L102.339 142.513L102.369 148.849L77.0267 148.967L77.1452 174.31L127.83 174.073L111.868 182.147C123.099 200.185 143.176 212.015 166.021 211.908C186.746 211.811 205.1 201.774 216.587 186.335C228.218 201.666 246.665 211.531 267.39 211.434C290.235 211.327 310.2 199.31 321.262 181.168L305.225 173.243L355.91 173.006L355.791 147.664L330.449 147.782L330.419 141.447L317.719 135.17L368.403 134.933L368.284 109.591L330.271 109.769L330.093 71.7555L302.639 71.8839L302.713 87.5901C302.758 97.2261 296.422 97.2557 291.599 97.2783L140.745 97.9838ZM203.679 135.704L191.037 142.098C191.103 156.095 179.809 167.494 165.813 167.559C151.817 167.625 140.418 156.332 140.353 142.336L127.652 136.059L203.679 135.704ZM305.047 135.23L292.406 141.624C292.471 155.621 281.178 167.02 267.182 167.085C253.186 167.151 241.787 155.858 241.721 141.861L229.021 135.585L305.047 135.23Z"
            fill="#F1F4F4"
          />
        </mask>
        <g mask="url(#mask0_663_6428)" />
      </g>
      <defs>
        <filter
          id="filter0_dddddd_663_6428"
          x="-16"
          y="0.577637"
          width="466.707"
          height="300.805"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
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
          <feOffset dy="0.249053" />
          <feGaussianBlur stdDeviation="1.1069" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.952941 0 0 0 0 0.141176 0 0 0 0 0.160784 0 0 0 0.0506062 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_663_6428"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.598509" />
          <feGaussianBlur stdDeviation="2.66004" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.952941 0 0 0 0 0.141176 0 0 0 0 0.160784 0 0 0 0.0727007 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_663_6428"
            result="effect2_dropShadow_663_6428"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.12694" />
          <feGaussianBlur stdDeviation="5.00862" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.952941 0 0 0 0 0.141176 0 0 0 0 0.160784 0 0 0 0.09 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_663_6428"
            result="effect3_dropShadow_663_6428"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2.01027" />
          <feGaussianBlur stdDeviation="8.93452" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.952941 0 0 0 0 0.141176 0 0 0 0 0.160784 0 0 0 0.107299 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_dropShadow_663_6428"
            result="effect4_dropShadow_663_6428"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3.75998" />
          <feGaussianBlur stdDeviation="16.711" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.952941 0 0 0 0 0.141176 0 0 0 0 0.160784 0 0 0 0.129394 0"
          />
          <feBlend
            mode="normal"
            in2="effect4_dropShadow_663_6428"
            result="effect5_dropShadow_663_6428"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="9" />
          <feGaussianBlur stdDeviation="40" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.952941 0 0 0 0 0.141176 0 0 0 0 0.160784 0 0 0 0.18 0"
          />
          <feBlend
            mode="normal"
            in2="effect5_dropShadow_663_6428"
            result="effect6_dropShadow_663_6428"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect6_dropShadow_663_6428"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default NakaPreload
