import React from "react"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from "@mui/material"
import { LogoNaka } from "@components/atoms/logo"
import { IconDetail } from "@components/icons/IconDetail"
import { Image } from "@components/atoms/image"
import { IMAGES } from "@constants/images"

const CardHoverLink = () => (
  <>
    <div className="flex justify-center">
      {/* <Card className="flex h-[218px] w-[218px] flex-col items-center justify-end gap-2.5 rounded-3xl bg-warning-light p-2.5">
        <IconDetail />
        <Button
          variant="outlined"
          className="btn-test"
        >
          Contained
        </Button>
      </Card> */}
      <Card className="flex h-[218px] w-[218px] flex-col items-center justify-end gap-2.5 rounded-3xl bg-warning-light p-2.5">
        {/* <img
          src={IMAGES.frontBlogBand.src}
          width={IMAGES.frontBlogBand.width}
          height={IMAGES.frontBlogBand.height}
          alt={IMAGES.frontBlogBand.alt}
          className="image1"
        />
        <img
          src={IMAGES.backBlogBand.src}
          width={IMAGES.backBlogBand.width}
          height={IMAGES.backBlogBand.height}
          alt={IMAGES.backBlogBand.alt}
          className="image2"
        /> */}
        <Button
          variant="outlined"
          className="btn-test"
        >
          Contained
        </Button>
      </Card>
    </div>
    <div className="test-card">
      <div className="box-tech">
        <div className="content">
          <center>
            <img
              src="https://www.e-bureauet.dk/media/1360/icon-dynamicweb.png"
              alt=""
            />
          </center>
          <p>DYNAMICWEB</p>
          <div className="desc">
            <center>
              <div className="line" />
            </center>
            <p>Out-of-the box CMS, E-commerce, PIM and Marketing platform.</p>
          </div>
        </div>
      </div>
    </div>
  </>
)

// CardHover.propTypes = {}

export default CardHoverLink
