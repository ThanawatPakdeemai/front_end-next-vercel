import React, { useRef, useState, useEffect } from "react"
import { useRouter } from "next/router"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import CardMyLandContent from "@feature/land/components/CardMyLandContent"
import MyLandList from "@feature/land/components/organisms/MyLandList"
import AddIcon from "@mui/icons-material/Add"
import { Typography } from "@mui/material"
import { Image } from "@components/atoms/image"
import MiniMap from "@feature/map/components/organisms/MiniMap"
import useGetAllLand from "@feature/land/containers/hooks/useGetAllLand"
import useMyLandController from "@feature/land/containers/hooks/useMyLandController"
import { useGetMyLand } from "@feature/land/containers/hooks/useGetMyLand"
import useProfileStore from "@stores/profileStore"
import {
  IMarketLandData,
  ILandMap
} from "@feature/land/interfaces/ILandService"
import { colorThree } from "@constants/map"
import useLoadingStore from "@stores/loading"
import UploadImag from "../../../components/icons/marketplace/UploadImag"

const MyLandPage = () => {
  const { profile } = useProfileStore()

  const [totalCount, setTotalCount] = useState<number>(0)
  const [limit, setLimit] = useState<number>(6)
  const [page, setPage] = useState<number>(1)
  const [landData, setLandData] = useState<IMarketLandData[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { setOpen, setClose } = useLoadingStore()

  const [currentLand, setCurrentLand] = useState<ILandMap | null>(null)
  const [ownerLandList, setOwnerLandList] = useState<ILandMap[]>([])
  const [notOwnerLandList, setNotOwnerLandList] = useState<ILandMap[]>([])
  const [pos, setPos] = useState<{ x: string; y: string }>({ x: "175", y: "1" })

  const { mutateGetMyLand } = useGetMyLand()
  const { allLand: allLandData } = useGetAllLand()
  const { sortLandId, sortBlockPoint } = useMyLandController()
  const { query } = useRouter()

  const { x, y } = query

  useEffect(() => {
    let load = false

    if (!load) {
      setOpen("Preparing data please wait...")
      if (profile && profile.data && allLandData) {
        const ownerList: ILandMap[] = []
        const notOwnerList: ILandMap[] = []
        allLandData.map((_item: ILandMap) => {
          if (_item.player_id === profile.data?.id) {
            _item.color = colorThree.land
            return ownerList.push(_item)
          }
          _item.color = colorThree.disable
          return notOwnerList.push(_item)
        })
        setOwnerLandList(ownerList)
        setNotOwnerLandList(notOwnerList)
        setClose()
      }
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allLandData, profile])

  useEffect(() => {
    let load = false

    if (!load) {
      if (x && y && ownerLandList) {
        const cLand = ownerLandList.find(
          (element) => element.position.x === x && element.position.y === y
        )
        if (cLand) {
          setCurrentLand(cLand)
          setPos({ x: String(x), y: String(y) })
        } else {
          setCurrentLand(null)
        }
      }
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x, y])

  useEffect(() => {
    let load = false

    if (!load) {
      const fetchHistory = async () => {
        if (profile.data) {
          await mutateGetMyLand({
            _limit: limit,
            _page: page,
            _search: {
              player_id: profile.data && profile.data.id ? profile.data.id : "",
              isRent: false,
              type: "nft_land"
            },
            _sort:
              sortLandId || sortBlockPoint
                ? {
                    land_id: sortLandId,
                    position: sortBlockPoint,
                    created_at: -1
                  }
                : { created_at: -1 },
            _landList: []
          }).then((res) => {
            // res.status === 200 -> ok
            if (res.data) {
              setLandData(res.data)
            }
            if (res.info) {
              setTotalCount(res.info.totalCount)
            }
          })
        }
      }
      fetchHistory()
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, sortLandId, sortBlockPoint])

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
          x={String(x)}
          y={String(y)}
        >
          <MiniMap
            pos={pos}
            className="!h-[315px] rounded-[14px]"
            ownerList={ownerLandList}
            notOwnerList={notOwnerLandList}
            currentLand={currentLand}
            setCurrentLand={setCurrentLand}
          />
        </CardMyLandContent>
        <MyLandList
          landData={landData}
          totolCount={totalCount}
          limit={limit}
          setLimit={setLimit}
          page={page}
          setPage={setPage}
        />
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
            className="btn-rainbow-theme mt-[10px] h-[40px] !w-full !rounded-[24px] border border-neutral-700 bg-secondary-main font-bold capitalize text-white-primary"
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
        {selectedFile && (
          <Typography className="w-[230px] text-center text-sm text-neutral-500">
            {String(selectedFile.name)}
          </Typography>
        )}
      </div>
    </div>
  )
}

export default MyLandPage
