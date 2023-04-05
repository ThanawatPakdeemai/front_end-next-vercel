import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import CardMyLandContent from "@feature/land/components/CardMyLandContent"
import MyLandList from "@feature/land/components/organisms/MyLandList"
import React, { useRef, useState } from "react"
import AddIcon from "@mui/icons-material/Add"
import { Typography } from "@mui/material"
import { Image } from "@components/atoms/image"
import UploadImag from "../../../components/icons/marketplace/UploadImag"

const MyLandPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    setSelectedFile(file)

    if (file) {
      // create a file reader object to read the contents of the file
      const reader = new FileReader()

      reader.onloadend = () => {
        // set the image preview state to the base64-encoded string
        setImagePreview(reader.result as string)
      }

      // read the file as a data URL (base64-encoded string)
      reader.readAsDataURL(file)
    }
  }

  const hiddenImage = useRef<any>(null)
  const handleClick = (_event: any) => {
    if (hiddenImage.current !== null) {
      hiddenImage.current.click()
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <CardMyLandContent
          title="NAKAVERSE MAP"
          map
        >
          <div className="h-[313px] w-full rounded-[14px] bg-neutral-900" />
        </CardMyLandContent>
        <MyLandList />
      </div>
      <div className="ml-8">
        <CardMyLandContent
          title="Upload MAP Banner"
          width={333}
          map={false}
        >
          <div className="h-[313px] w-full rounded-[14px] border border-neutral-700 bg-neutral-780">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Image preview"
                width={250}
                height={250}
                className="h-full w-full"
              />
            ) : (
              <div className="relative grid h-full w-full content-center justify-items-center">
                <UploadImag />
                <Typography className="absolute bottom-0 mb-4 text-xs uppercase text-neutral-500">
                  Size Recommended 1,000 x 1,000 px
                </Typography>
              </div>
            )}
          </div>
          <ButtonToggleIcon
            text="Browse Image"
            className="btn-rainbow-theme mt-[10px] h-[40px] !w-full !rounded-[24px] border border-neutral-700 bg-primary-main bg-secondary-main font-bold capitalize text-white-primary"
            startIcon={<AddIcon className="text-neutral-300" />}
            handleClick={() => {
              handleClick(handleFileChange)
            }}
          />
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            ref={hiddenImage}
          />
        </CardMyLandContent>
        <div className="flex w-[333px] justify-center">
          <Typography className="w-[230px] text-center text-sm text-neutral-500">
            The banner will show on the map of the assets you hold.
          </Typography>
        </div>
        <Typography className="w-[230px] text-center text-sm text-neutral-500">
          {String(selectedFile?.name)}
        </Typography>
      </div>
    </div>
  )
}

export default MyLandPage
