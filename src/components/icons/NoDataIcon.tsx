import React from "react"

const NoDataIcon = ({
  width = 125,
  height = 125,
  className
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 125 125"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M99.9876 56.1393C99.9486 56.1393 99.9486 56.1393 99.9876 56.1393C98.5469 55.3989 97.0284 54.6585 95.3541 53.8402L101.156 46.8651C101.156 46.8651 101.156 46.8261 101.195 46.8261C102.635 45.0336 103.102 42.6566 102.441 40.4745C101.895 38.7209 100.727 37.2792 99.092 36.4219C97.4567 35.5646 95.6267 35.3698 93.8746 35.9153L89.6695 37.2012C89.7084 37.0843 89.7473 37.0064 89.7863 36.8895V36.8505L91.8888 30.4989V30.4599C92.5897 28.2777 93.2516 26.0566 93.8746 23.8744C94.6533 21.1078 93.7188 18.1073 91.4995 16.2758C89.9809 15.0289 88.112 14.4834 86.1652 14.6782C84.2184 14.873 82.5052 15.8082 81.2592 17.289C79.8965 18.9646 78.5726 20.6012 77.0152 22.5885L72.9269 27.8101C72.3428 28.5505 71.7588 29.3298 71.1358 30.0702L70.4739 28.7843C69.5784 27.0698 68.0209 25.8618 66.152 25.4331C64.4388 25.0435 62.6866 25.3162 61.2071 26.2514C59.7275 27.1867 58.6762 28.6284 58.2868 30.343L57.7807 32.6031C57.5471 32.6031 57.3134 32.6031 57.0409 32.6031C53.6145 32.8369 51.0058 35.8374 51.2394 39.2665L51.5509 43.8256C51.0058 43.4749 50.4607 43.1632 49.8766 42.8904C47.2679 41.6435 44.3477 41.0979 41.6611 41.4097C39.0523 41.6824 36.4825 42.6566 34.1464 44.2932C34.1464 44.2932 34.1074 44.2932 34.1074 44.3322C30.9147 46.6313 28.4227 49.7486 26.437 53.9571C24.9964 57.0355 23.9061 60.4256 23.2442 63.9327C22.1151 70.0505 22.0372 76.597 23.0495 83.4163C23.0495 83.4552 23.0495 83.4552 23.0495 83.4942C23.6336 87.0402 24.3734 90.1576 25.4247 93.0801C26.6706 96.6261 28.1891 99.7045 30.0581 102.432C30.0581 102.432 30.0581 102.471 30.097 102.471C31.304 104.186 32.55 105.628 33.9128 106.875C35.7428 108.55 37.6506 109.758 39.5974 110.537C41.3885 111.239 43.3353 111.629 45.2043 111.629C45.9441 111.629 46.6449 111.59 47.3847 111.473C47.4236 111.473 47.4236 111.473 47.4626 111.473C49.8766 111.083 52.1349 110.109 54.1985 108.628C55.8728 107.42 57.3913 105.9 58.7151 104.069C59.5717 102.861 60.3505 101.536 61.0513 100.055C62.1415 100.679 63.2707 101.146 64.4777 101.497C67.0864 102.198 69.9677 101.965 72.4207 100.874C72.4207 100.874 72.4596 100.874 72.4596 100.835C74.7958 99.7825 76.7816 98.0679 78.3001 95.7689C79.3513 94.2491 80.169 92.5346 80.8309 90.5473C81.7654 87.7027 82.2716 84.7412 82.5052 81.1172C82.622 79.052 82.5831 76.9477 82.4273 74.8825L85.659 75.5059C86.0873 75.5839 86.4767 75.6228 86.905 75.6228C87.8784 75.6228 88.8907 75.389 89.7473 74.9604C91.2658 74.1811 92.395 72.8951 92.9401 71.2585C93.1348 70.635 93.2516 70.0505 93.2516 69.4271L97.3788 69.1153C99.7539 68.9205 101.895 67.5177 102.947 65.3745C104.699 61.9454 103.336 57.8538 99.9876 56.1393Z"
      fill="#010101"
      stroke="#F42728"
      stroke-width="1.81951"
      stroke-miterlimit="10"
    />
    <path
      d="M97.4175 61.2046C95.3149 60.1525 93.2513 59.1393 91.1877 58.0872C89.5913 57.3079 87.9949 56.5285 86.3985 55.7492L96.7555 43.2407C96.9892 42.929 97.106 42.5393 96.9892 42.1107C96.7945 41.4872 96.1326 41.0975 95.4706 41.2924L81.0253 45.7346C82.1155 42.1497 83.1668 38.6036 84.3738 35.0576L86.4764 28.706C87.1383 26.5628 87.8002 24.4586 88.4232 22.3154V22.2764C88.5789 21.6919 88.4232 20.9905 87.8781 20.6008C87.1772 20.0163 86.1649 20.1332 85.6198 20.8346C84.2181 22.5492 82.8553 24.3027 81.4536 26.0172L77.3653 31.2778C74.9512 34.3562 72.5372 37.3567 70.0842 40.3961L65.4897 31.3947V31.3558C65.3729 31.1219 65.1782 30.9661 64.9057 30.8881C64.3995 30.7712 63.9323 31.083 63.8155 31.5506L61.7908 40.1234L57.7414 38.2919L57.7025 38.2529C57.6246 38.214 57.5078 38.214 57.4299 38.214C57.1184 38.2529 56.8459 38.5257 56.8848 38.8374L57.2353 44.2539C57.2353 44.3708 57.3521 44.4877 57.5078 44.4877C57.6636 44.4877 57.7804 44.3708 57.7804 44.2149L58.0529 39.7727L62.0244 41.799C62.0633 41.8379 62.1023 41.8379 62.1802 41.8379C62.5695 41.9548 62.9589 41.721 63.0757 41.3313V41.2924L64.9446 34.3952L68.9161 42.8511C68.994 42.968 69.0719 43.1238 69.1887 43.2018C69.6559 43.5914 70.3178 43.5525 70.7072 43.0849L70.7461 43.0459C73.6274 39.6558 76.4698 36.2656 79.39 32.9534L83.2836 28.5111L81.7261 34.3173C80.6359 38.6426 79.351 42.929 78.1051 47.2154C78.0272 47.4102 78.0272 47.644 78.1051 47.8778C78.2998 48.5013 78.9617 48.852 79.5847 48.6572L92.2779 44.7994L83.4393 55.3595C83.3615 55.4375 83.3225 55.5154 83.2836 55.6323C82.9721 56.2558 83.2447 56.9962 83.8676 57.3079C85.9313 58.321 88.0338 59.3342 90.0974 60.3084C90.9151 60.698 91.7328 61.0877 92.5504 61.4774L90.2143 61.7112L83.634 62.4126H83.5951C83.4783 62.4126 83.3615 62.4516 83.2447 62.5295C82.8164 62.8023 82.6606 63.3478 82.8942 63.8154L84.5296 66.66L85.503 68.3356L80.4802 68.1018C80.3634 68.1018 80.2466 68.1797 80.2076 68.3356C80.1687 68.4915 80.2855 68.6084 80.4023 68.6473L86.7489 69.8943C86.9047 69.9333 87.0604 69.8943 87.2162 69.8163C87.5666 69.6215 87.7223 69.1929 87.5276 68.8422L87.4887 68.7642L86.0091 65.8417L85.1915 64.2051L90.37 63.8544L96.9502 63.3868C97.3396 63.3478 97.7289 63.114 97.9236 62.7633C98.2351 62.1788 98.0015 61.4774 97.4175 61.2046Z"
      fill="#F42728"
      stroke="#F42728"
      stroke-width="1.81951"
      stroke-miterlimit="10"
    />
    <path
      d="M74.9904 64.9839C74.2506 62.4121 73.2383 59.9182 71.9534 57.5022C71.6419 56.9177 71.3304 56.2942 70.941 55.7097L70.3959 54.8135L69.7729 53.9562C69.3836 53.3717 68.9163 52.8261 68.488 52.2806L67.7482 51.4623C67.5146 51.1895 67.2421 50.9167 66.9695 50.6829C66.4244 50.1764 65.8014 49.7088 65.1785 49.2412L64.1272 48.6177C63.7767 48.4228 63.3484 48.267 62.9591 48.1111C62.5697 47.9552 62.1025 47.8383 61.6742 47.7604C61.2459 47.6435 60.7397 47.6435 60.2725 47.6045C59.338 47.5656 58.3646 47.7994 57.508 48.1501C55.7948 48.9294 54.6657 50.2543 54.0037 51.5402C53.6923 52.0858 53.4976 52.6703 53.3029 53.2158C52.7189 52.3975 52.0569 51.5792 51.3561 50.8388C50.2659 49.7088 48.981 48.6956 47.4235 47.9552C45.905 47.2149 44.075 46.7862 42.245 47.02C40.415 47.2149 38.7797 47.9552 37.378 48.9294C34.6135 50.9167 32.8224 53.6055 31.4986 56.3721C30.1748 59.1388 29.3182 62.0614 28.7731 64.9839C27.6828 70.8679 27.7607 76.7909 28.6173 82.5971C29.0846 85.5196 29.7465 88.4032 30.7199 91.1698C31.6933 93.9755 32.9782 96.7032 34.6914 99.1971C35.548 100.444 36.5603 101.613 37.6895 102.665C38.8186 103.717 40.1424 104.652 41.661 105.237C43.1795 105.821 44.8927 106.055 46.4891 105.821C48.1244 105.549 49.604 104.886 50.8499 103.951C52.1348 103.055 53.1861 101.886 54.0427 100.678C54.8993 99.4698 55.6391 98.145 56.2231 96.8201C56.8072 95.4562 57.3133 94.0924 57.6638 92.6896C57.9752 91.5985 58.2089 90.4684 58.4425 89.3384C58.9097 90.1177 59.377 90.8581 59.9221 91.5985C60.6229 92.4947 61.4406 93.391 62.375 94.1703C63.3095 94.9496 64.4387 95.6121 65.8014 95.9628C67.1253 96.3135 68.7216 96.1966 70.0455 95.6511C71.564 94.9497 72.7321 93.7806 73.5497 92.5727C74.3674 91.3647 74.9514 90.0398 75.3797 88.7539C76.2363 86.1431 76.6257 83.4543 76.7425 80.8046C77.1319 75.4271 76.5089 70.1276 74.9904 64.9839ZM50.4995 62.7238C51.5897 62.529 52.7578 63.7759 53.0693 65.5684C53.4197 67.3219 52.7967 68.9585 51.7065 69.1534C50.6163 69.3482 49.4482 68.1013 49.1367 66.3088C48.7863 64.5163 49.4093 62.9186 50.4995 62.7238ZM57.3133 88.1694C57.0797 89.5332 56.6903 90.8971 56.2621 92.2219C55.8338 93.5468 55.2886 94.8327 54.7046 96.0407C53.4976 98.4567 51.8623 100.756 49.6818 102.12C48.6305 102.821 47.4235 103.25 46.2165 103.406C45.0095 103.522 43.8414 103.289 42.7512 102.743C40.5318 101.691 38.7797 99.6647 37.378 97.4046C36.0152 95.1445 34.9639 92.6116 34.2241 90.0008C33.4454 87.39 32.9392 84.7013 32.5888 82.0125C32.2384 79.2848 32.1605 76.5571 32.1995 73.8294C32.2773 71.1017 32.5109 68.374 33.0171 65.7243C33.5233 63.0745 34.2631 60.5027 35.3922 58.1257C36.4824 55.7876 37.9231 53.6055 39.792 52.2027C40.7265 51.5012 41.6999 51.0726 42.7122 50.9167C43.7246 50.7609 44.7759 50.9167 45.8271 51.3843C46.5669 51.6961 47.3067 52.1637 48.0076 52.7092C44.1139 52.7872 41.1937 58.7491 41.8556 66.8153C42.0503 69.1144 42.4786 71.3355 43.1795 73.3229L43.6078 74.0632C43.6078 71.6083 44.6591 69.621 46.2554 69.3092C48.2412 68.9196 50.3437 71.2576 50.9667 74.4919C51.5508 77.6482 50.5384 80.4928 48.6305 80.9994C49.6429 81.506 50.6942 81.6618 51.7065 81.3501C54.8993 80.4539 56.8072 75.7778 56.9629 70.2055C57.0408 70.6341 57.1186 71.0628 57.1965 71.4914C58.131 77.0247 58.2089 82.675 57.3133 88.1694ZM72.3817 87.8187C72.0702 88.9487 71.6419 90.0398 71.0968 91.014C70.5517 91.9881 69.8119 92.7675 68.9163 93.1961C68.1765 93.5468 67.3589 93.7027 66.5023 93.5468C65.6457 93.391 64.7502 92.9234 63.8936 92.3778C63.037 91.8323 62.2582 91.1309 61.5184 90.3515C60.8176 89.6501 60.1946 88.9097 59.5716 88.1304C60.0778 85.4417 60.3504 82.714 60.4282 79.9473C60.5061 77.1027 60.3114 74.2581 59.9221 71.4524C59.5327 68.6468 58.8708 65.8412 57.9363 63.1524C57.8584 62.9186 57.7806 62.6848 57.7027 62.49C56.924 60.0351 55.9506 57.6191 54.6657 55.359C55.2108 54.5017 55.7559 53.7224 56.4178 53.0989C57.1965 52.2806 58.0921 51.6961 58.8708 51.5402C59.6495 51.3843 60.3893 51.5012 61.2459 51.9299C62.0636 52.3196 62.9591 52.982 63.7378 53.8003C64.0493 54.0731 64.3608 54.4238 64.6723 54.7745C64.6333 54.7745 64.5944 54.7745 64.5555 54.7745C62.1414 54.7745 60.8565 59.0219 61.9078 64.6722C62.2193 66.2698 62.6476 67.7895 63.2316 69.1534L63.5821 69.7769C63.4263 68.0623 63.9325 66.6205 64.9448 66.3867C66.1519 66.075 67.5925 67.5947 68.1376 69.7769C68.6827 71.959 68.1765 73.9853 66.9695 74.297C66.9306 74.297 66.8527 74.336 66.7748 74.336C67.5146 74.8426 68.2544 75.0374 68.9163 74.8426C70.5517 74.375 71.4082 71.92 71.3693 68.7247C71.7976 70.2834 72.148 71.8421 72.4206 73.4008C72.8489 75.8168 73.1214 78.2717 73.1214 80.7266C73.1993 83.1036 73.0046 85.5586 72.3817 87.8187Z"
      fill="#F42728"
      stroke="#F42728"
      stroke-width="1.81951"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export default NoDataIcon