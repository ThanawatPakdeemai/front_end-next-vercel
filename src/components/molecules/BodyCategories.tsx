import ButtonLink from "@components/atoms/button/ButtonLink"
import { CATEGORIES } from "@constants/categories"
import { Image } from "@components/atoms/image/index"
import { Card, Grid } from "@mui/material"
import React from "react"

const BodyCategories = () => (
  <div className="mt-10 mb-10 w-[calc(100%)]">
    <Grid
      container
      spacing={3}
    >
      {CATEGORIES.map((item) => (
        <Grid
          key={item.text}
          item
          xs={12 / 5}
        >
          <Card className="relative bg-grey-A100 hover:flex hover:flex-col hover:bg-primary-main md:h-[100%]">
            <div className="transform duration-500 hover:flex hover:scale-y-75 hover:scale-x-90 ">
              <Image
                src={item.img}
                width={264}
                height={324}
                alt={item.text}
              />
            </div>
            <div className="absolute bottom-2 z-10 w-full px-2">
              <ButtonLink
                key={item.text}
                text={item.text}
                href={item.link}
                icon={
                  <Image
                    src={item.icon}
                    width={18}
                    height={18}
                    alt={item.text}
                  />
                }
                size="large"
                color="primary"
                variant="contained"
                className="w-full"
              />
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
)
export default BodyCategories
