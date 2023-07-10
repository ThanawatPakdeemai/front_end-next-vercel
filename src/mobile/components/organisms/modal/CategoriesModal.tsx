import React from "react"
import { Box, SwipeableDrawer } from "@mui/material"
import { ImageCustom } from "@components/atoms/image/Image"
import { StyleDrawer } from "@mobile/styles/muiStyleMobile"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"
import CheckIcon from "@mui/icons-material/Check"
import { useBaseProvider } from "@providers/BaseProvider"
import { IGameCategory } from "@feature/dropdown/interfaces/IDropdownService"

interface ICategoriesModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  categories: IGameCategory[] | undefined
}

const CategoriesModal = ({
  open,
  setOpen,
  categories
}: ICategoriesModalProps) => {
  const { clearAllDrawer } = useDrawerControllerMobile()
  const { setSelectedCategory, selectedCategory } = useBaseProvider()

  const onClickSelectChoiceFilter = (item: IGameCategory) => {
    setOpen(false)
    setSelectedCategory(item)
  }

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => {
        clearAllDrawer()
        setOpen(true)
      }}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true
      }}
      sx={StyleDrawer}
      className="MuiDrawer-paper__bottom"
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
        <h2 className="py-[30px] text-center font-urbanist text-[24px] font-bold text-[#F2C94C]">
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
                onClick={() => onClickSelectChoiceFilter(item)}
              >
                <div className="relative h-[56px] w-[56px] scale-50 overflow-hidden rounded-lg">
                  {item.image_list && (
                    <ImageCustom
                      src={item.image_list}
                      alt={item.name}
                      width={56}
                      height={56}
                      className="h-full w-full object-cover object-center"
                    />
                  )}
                </div>
                <span>{item.name}</span>
                {selectedCategory.id === item.id && (
                  <CheckIcon className="ml-auto mr-4 text-warning-100" />
                )}
              </Box>
            ))}
        </Box>
      </Box>
    </SwipeableDrawer>
  )
}

export default CategoriesModal
