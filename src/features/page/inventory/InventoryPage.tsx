import SettingIconFilter from "@components/icons/Inventory/SettingIconFilter"
import { Box } from "@mui/material"
import React, { useState } from "react"
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded"
import CardContentDetails from "./CardContentDetails"
import CardWriterDetails from "../../../components/molecules/Inventory/CardWriterDetails"
import GotNaKAPunk from "../../../components/molecules/Inventory/GotNaKAPunk"

const InventoryPage = () => {
  const [open, setOpen] = useState(false)
  const ListData = [
    {
      "_id": "62b2c7218c0f02cadef265bd",
      "created_at": "2022-06-22T07:39:13.280Z",
      "seller_id": null,
      "item_id": "61fa18cbf2378b4c8083db66",
      "item_amount": 1,
      "price": 2,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_land",
      "is_active": true,
      "order_id": null,
      "land_data": {
        "_id": "61fa18cbf2378b4c8083db66",
        "name": "Copper",
        "details":
          "This plot of land is rich in copper ore of high grade and has good development conditions, suitable for mining and smelting.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/copper.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa18cbf2378b4c8083db66.jpeg",
        "NFT_token": null,
        "land_id": "11100059",
        "position": {
          "x": "130",
          "y": "37"
        },
        "type": "copper",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Copper/11100059.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Copper/11100059.jpg",
        "logo_in_map": null
      }
    }
  ]
  return (
    <div className="h-full border-l-[1px] border-l-neutral-700">
      <div className="flex">
        {open && (
          <div className=" h-[248px] w-[276px] bg-neutral-780 transition-all duration-500 ease-in">
            Filter
          </div>
        )}
        <Box
          className="grid h-[40px] w-[40px] cursor-pointer items-center justify-items-center rounded-r-lg bg-error-main"
          onClick={() => {
            if (open === false) {
              setOpen(true)
            }
            if (open === true) {
              setOpen(false)
            }
          }}
        >
          {open ? (
            <HighlightOffRoundedIcon sx={{ color: "#ffff" }} />
          ) : (
            <SettingIconFilter />
          )}
        </Box>

        {ListData.map((data) => (
          <CardContentDetails
            key={data._id}
            detail={data.land_data.details}
            image={data.land_data.NFT_image}
            alt={data.land_data.type}
          >
            <div className="grid grid-cols-2 px-8 py-6">
              <CardWriterDetails
                textHead="creat by"
                name="nakamoto.game"
                date="2022-06-22T07:39:13.280Z"
              />
              <CardWriterDetails
                textHead="Owned by"
                name="Margrét Han"
                date="2022-06-22T07:39:13.280Z"
                link="0xfd86E58bCc217B2671Ca918441685a0a3444D253"
                image={data.land_data.image}
                alt={data.land_data.type}
              />
            </div>
            <div className=" px-8 py-6">
              <GotNaKAPunk
                address="0xfd86E58bCc217B2671Ca918441685a0a3444D253"
                token_id="0xfd86E58bCc217B2671Ca918441685a0a3444D253"
              />
            </div>
          </CardContentDetails>
        ))}
      </div>

      {/* <Drawer
        variant="permanent"
        open={open}
      >
        <div>test</div>
      </Drawer> */}
    </div>
  )
}

export default InventoryPage
