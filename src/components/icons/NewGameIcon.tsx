import React from "react"

function NewGameIcon({
  width = 70,
  height = 70,
  className,
  fill = "#E1E2E2"
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${width}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M27.3623 62.1249L24.1149 60.7502L25.078 54.0784L24.6706 53.9055L24.5594 55.0498L22.4439 60.0423L20.7893 59.3385L23.5058 52.926L26.7532 54.3007L25.7901 60.9725L26.1976 61.1453L26.3087 60.0011L28.4242 55.0086L30.0788 55.7124L27.3623 62.1249Z"
        fill={fill}
      />
      <path
        d="M18.402 57.651L14.2615 53.9673L15.3069 52.7943L18.0975 55.2761L18.8712 54.4036L16.4511 52.2469L17.4348 51.1397L19.8549 53.2964L20.6369 52.4197L17.8464 49.9379L18.8918 48.7648L23.0324 52.4485L18.402 57.651V57.651Z"
        fill={fill}
      />
      <path
        d="M14.3562 40.71L15.9244 43.8134L10.3186 47.1761L10.5161 47.563L16.55 45.0482L18.1264 48.168L12.3271 52.1357L11.5163 50.5305L15.8709 47.5342L17.0768 47.0691L16.8793 46.6822L10.8454 49.197L9.19907 45.9331L14.809 42.5786L14.6073 42.1835L13.5207 42.8544L8.53229 44.6119L7.72559 43.0149L14.3604 40.7059L14.3562 40.71Z"
        fill={fill}
      />
      <path
        d="M10.3637 37.1458C8.09588 36.9894 6.79527 35.4747 6.94344 33.3098C7.07103 31.4659 8.21935 30.1118 9.80396 29.98L9.67637 31.824C9.01783 31.898 8.54862 32.5195 8.49512 33.318C8.41692 34.4705 9.14954 35.2031 10.4584 35.2936C11.689 35.3759 12.5081 34.8409 12.5986 33.4991C12.6686 32.4743 12.2694 31.7951 11.5944 31.6799L11.4791 33.3551L10.1085 33.2604L10.2814 30.7086C10.3226 30.1282 10.6806 29.7948 11.2816 29.836L14.2779 30.0418L14.1544 31.824L13.6811 31.791L12.4546 31.3589L12.4258 31.8116C12.7345 31.7828 14.2779 31.968 14.1339 34.0671C13.9939 36.1168 12.4999 37.2898 10.3596 37.1458H10.3637Z"
        fill={fill}
      />
      <path
        d="M8.69275 25.2714L10.2774 21.7482L17.4266 22.8348L16.6446 24.5717L14.4961 24.2219L13.3354 26.7984L15.0229 28.1772L14.2492 29.8976L8.69686 25.2714H8.69275ZM12.8868 23.9667L9.9769 23.5016L9.7958 23.9049L12.076 25.7653L12.8868 23.9626V23.9667Z"
        fill={fill}
      />
      <path
        d="M12.5617 17.7189L15.1382 15.2782L20.0979 19.5628L20.4271 19.25L16.4142 14.0681L18.9619 11.6562L23.7527 16.7146L22.4562 17.9453L19.4722 14.7967L18.2087 12.9857L17.9 13.2779L21.8101 18.5544L19.2911 20.9375L14.2451 16.7352L13.9241 17.0398L15.6774 18.3857L18.6614 21.5343L17.3567 22.7691L12.5658 17.7107L12.5617 17.7189Z"
        fill={fill}
      />
      <path
        d="M21.7483 10.2116L26.8602 8.07544L27.4652 9.52422L24.0202 10.9648L24.4688 12.039L27.457 10.7919L28.0291 12.1584L25.041 13.4055L25.4937 14.488L28.9387 13.0474L29.5437 14.4962L24.4318 16.6323L21.7483 10.2075V10.2116Z"
        fill={fill}
      />
      <path
        d="M42.6074 7.84485L45.8549 9.21955L44.8917 15.8914L45.2992 16.0642L45.4103 14.92L47.5259 9.92748L49.1805 10.6313L46.464 17.0438L43.2166 15.6691L44.1797 8.99729L43.7722 8.82442L43.6611 9.96863L41.5455 14.9612L39.891 14.2574L42.6074 7.84485V7.84485Z"
        fill={fill}
      />
      <path
        d="M51.5676 12.3148L55.7081 15.9985L54.6627 17.1715L51.8721 14.6896L51.0984 15.5622L53.5185 17.7189L52.5348 18.8261L50.1147 16.6693L49.3327 17.546L52.1232 20.0279L51.0778 21.2009L46.9372 17.5172L51.5676 12.3148V12.3148Z"
        fill={fill}
      />
      <path
        d="M55.6135 29.2597L54.0453 26.1564L59.6511 22.7937L59.4536 22.4068L53.4197 24.9216L51.8433 21.8018L57.6426 17.8341L58.4534 19.4393L54.0988 22.4356L52.8929 22.9007L53.0904 23.2876L59.1243 20.7728L60.7706 24.0367L55.1607 27.3911L55.3624 27.7863L56.449 27.1154L61.4374 25.3579L62.2441 26.9549L55.6093 29.2639L55.6135 29.2597Z"
        fill={fill}
      />
      <path
        d="M59.61 32.82C61.8778 32.9764 63.1784 34.491 63.0303 36.656C62.9027 38.4999 61.7544 39.854 60.1697 39.9857L60.2973 38.1418C60.9559 38.0677 61.4251 37.4462 61.4786 36.6478C61.5568 35.4953 60.8242 34.7627 59.5153 34.6721C58.2847 34.5898 57.4656 35.1249 57.3751 36.4667C57.3051 37.4915 57.7043 38.1706 58.3793 38.2859L58.4946 36.6107L59.8652 36.7054L59.6923 39.2572C59.6511 39.8375 59.2931 40.1709 58.6921 40.1298L55.6958 39.924L55.8193 38.1418L56.2926 38.1747L57.5191 38.6069L57.5479 38.1542C57.2393 38.183 55.6958 37.9978 55.8399 35.8987C55.9798 33.849 57.4738 32.6759 59.6141 32.82H59.61Z"
        fill={fill}
      />
      <path
        d="M61.2769 44.6942L59.6923 48.2174L52.543 47.1308L53.325 45.3939L55.4735 45.7438L56.6342 43.1672L54.9467 41.7884L55.7204 40.068L61.2727 44.6942H61.2769ZM57.0828 45.999L59.9927 46.464L60.1738 46.0607L57.8936 44.2003L57.0828 46.0031V45.999Z"
        fill={fill}
      />
      <path
        d="M57.408 52.251L54.8315 54.6917L49.8718 50.4071L49.5426 50.7199L53.5555 55.9017L51.0078 58.3136L46.2169 53.2552L47.5134 52.0246L50.4974 55.1732L51.761 56.9842L52.0697 56.692L48.1596 51.4155L50.6785 49.0324L55.7246 53.2347L56.0456 52.9301L54.2923 51.5842L51.3083 48.4356L52.613 47.2008L57.4039 52.2592L57.408 52.251Z"
        fill={fill}
      />
      <path
        d="M48.2214 59.7542L43.1095 61.8904L42.5045 60.4416L45.9495 59.001L45.5008 57.9268L42.5127 59.1739L41.9406 57.8074L44.9287 56.5603L44.476 55.4779L41.031 56.9184L40.426 55.4696L45.5379 53.3335L48.2214 59.7584V59.7542Z"
        fill={fill}
      />
    </svg>
  )
}

export default NewGameIcon
