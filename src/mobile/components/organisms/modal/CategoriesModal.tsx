import React from "react"
import { IGameCategory } from "@feature/dropdown/interfaces/IDropdownService"
import { Box, SwipeableDrawer } from "@mui/material"
import { ImageCustom } from "@components/atoms/image/Image"

interface ICategoriesModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
  toggleDrawer: (newOpen: boolean) => void
  categories: IGameCategory[] | undefined
}

const CategoriesModal = ({
  open,
  setOpen,
  toggleDrawer,
  categories,
  setSelectedCategory
}: ICategoriesModalProps) => (
  <SwipeableDrawer
    anchor="bottom"
    open={open}
    onClose={() => toggleDrawer(false)}
    onOpen={() => toggleDrawer(true)}
    disableSwipeToOpen={false}
    ModalProps={{
      keepMounted: true
    }}
    sx={{
      ".MuiDrawer-paper": {
        background: "#18181C",
        borderRadius: "44px 44px 0px 0px"
      }
    }}
  >
    <Box
      component="div"
      className="categories-list flex flex-col p-[8px_24px_36px]"
      sx={{
        width: "100%",
        maxHeight: "calc(100vh - 240px)",
        h2: {
          padding: "30px 0",
          borderBottom: "1px solid #35383F"
        }
      }}
    >
      <h2 className="py-[30px] text-center font-urbanist text-[24px] font-bold text-white-primary">
        Categories
      </h2>
      <Box
        component="div"
        className="flex flex-col"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0px",
          "button + button": {
            borderTop: "1px solid #35383F"
          }
        }}
      >
        {categories &&
          categories.length > 0 &&
          categories.map((item) => (
            <Box
              component="button"
              key={item.id}
              className="category-item__title flex h-[56px] w-full items-center gap-3 font-urbanist text-white-primary"
              sx={{
                fontSize: "18px",
                fontWeight: 600
              }}
              onClick={() => {
                toggleDrawer(false)
                setOpen(false)
                setSelectedCategory(item.id)
              }}
            >
              <div className="relative h-[56px] w-[56px] scale-50 overflow-hidden rounded-lg">
                <ImageCustom
                  src={item.image_list}
                  alt={item.name}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <span>{item.name}</span>
            </Box>
          ))}
      </Box>
    </Box>
  </SwipeableDrawer>
)

export default CategoriesModal
