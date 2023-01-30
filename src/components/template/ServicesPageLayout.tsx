import Balance from "@components/molecules/balance/Balance"
import Banner from "@components/molecules/Banner"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { MENU } from "@configs/menu"
import { COUPON_BANNER } from "@constants/gameBanner"
import { MenuList } from "@mui/material"
import React from "react"

const ServicesPageLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
  <div className="main-container mx-auto">
    <Header />
    <Banner data={COUPON_BANNER} />
    <div className="flex flex-row gap-3">
      <div>
        <MenuList className="m-auto h-fit w-[200px] rounded-[13px] bg-neutral-800 p-[6px]">
          <div>
            {MENU.map((ele) => (
              <div key={ele.name}>
                {ele.name === "Services" ? (
                  <div>
                    {ele.chide?.map((manuItem) => (
                      <div key={manuItem.name}>{manuItem.name}</div>
                      // <MenuItemCustom
                      //   key={manuItem.name}
                      //   id={index}
                      //   label={manuItem.name}
                      //   icon={manuItem.icon}
                      //   href="/"
                      //   external={false}
                      // />
                    ))}
                  </div>
                ) : null}
              </div>
              // if (ele.name === "") {
              // }
              // <MenuItemCustom
              //   key={ele.id}
              //   id={ele.id}
              //   label={ele.label}
              //   icon={ele.icon}
              //   href={ele.href}
              //   external={ele.external}
              // />
            ))}
          </div>
        </MenuList>
        <Balance
          sx={{
            maxWidth: 200,
            minWidth: 200,
            height: "auto"
          }}
        />
      </div>
      <div className="mx-6 flex h-full w-[100%] flex-col">{children}</div>
    </div>
    <Footer />
  </div>
)

export default ServicesPageLayout
