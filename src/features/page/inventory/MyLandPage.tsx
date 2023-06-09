import React, { useRef, useState, useEffect } from "react"
import { useRouter } from "next/router"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import CardMyLandContent from "@feature/land/components/CardMyLandContent"
import MyLandList from "@feature/land/components/organisms/MyLandList"
import AddIcon from "@mui/icons-material/Add"
import { Chip, Typography } from "@mui/material"
import { Image } from "@components/atoms/image"
import MiniMap from "@feature/map/components/organisms/MiniMap"
import useGetAllLand from "@feature/land/containers/hooks/useGetAllLand"
import useMyLandController from "@feature/land/containers/hooks/useMyLandController"
import { useGetMyLand } from "@feature/land/containers/hooks/useGetMyLand"
import useProfileStore from "@stores/profileStore"
import IconArrowRight from "@components/icons/arrowRightIcon"
import {
  IMarketLandData,
  ILandMap
} from "@feature/land/interfaces/ILandService"
import { colorThree } from "@constants/map"
import useLoadingStore from "@stores/loading"
import { useToast } from "@feature/toast/containers"
import useUpdateLand from "@feature/land/containers/hooks/useUpdateLand"
import { motion } from "framer-motion"
import UploadImag from "../../../components/icons/marketplace/UploadImag"
import MenuButtonExpandMobile from "../marketplace/mobilescreen/MenuButtonExpandMobile"

const MyLandPage = () => {
  const { profile } = useProfileStore()

  const [totalCount, setTotalCount] = useState<number>(0)
  const [limit, setLimit] = useState<number>(6)
  const [page, setPage] = useState<number>(1)
  const [landData, setLandData] = useState<IMarketLandData[]>([])
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { setOpen, setClose } = useLoadingStore()

  const [currentLand, setCurrentLand] = useState<ILandMap | null>(null)
  const [ownerLandList, setOwnerLandList] = useState<ILandMap[]>([])
  const [notOwnerLandList, setNotOwnerLandList] = useState<ILandMap[]>([])
  const [pos, setPos] = useState<{ x: string; y: string }>({ x: "175", y: "1" })

  const { mutateGetMyLand } = useGetMyLand()
  const { mutateUpdateLandBanner } = useUpdateLand()
  const { allLand: allLandData } = useGetAllLand()
  const { sortLandId, sortBlockPoint } = useMyLandController()
  const { errorToast, successToast } = useToast()
  const { query } = useRouter()
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleOnExpandClick = () => {
    setExpanded(!expanded)
  }

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

  async function handleFileChange(e: any, setPreview: any, setFileImage: any) {
    if (e.target.files.length) {
      e.preventDefault()
      const maxFile: number = 2000 * 1024
      if (e.target.files[0].size <= maxFile) {
        const file = e.target.files[0]
        setFileImage(file)
        setPreview(URL.createObjectURL(file))
      }
    }
  }

  const hiddenImage = useRef<any>(null)
  const handleClick = (_event: any) => {
    if (hiddenImage.current !== null) {
      hiddenImage.current.click()
    }
  }

  const onReset = () => {
    const inputFile = document.getElementById("file-upload") as HTMLInputElement
    if (inputFile.value !== null) {
      inputFile.value = ""
      setSelectedFile(null)
      setImagePreview(null)
    }
  }

  const onSubmit = async () => {
    if (selectedFile && imagePreview && currentLand) {
      setOpen("Uploading...")
      const data: any = {
        _landId: currentLand._id,
        _img: selectedFile
      }

      mutateUpdateLandBanner(data, {
        onSuccess(_res) {
          successToast(
            "The banner has been uploaded successfully. Please wait for the image to be reviewed before it is displayed."
          )
          onReset()
          setClose()
        },
        onError(err) {
          errorToast((err as Error).message)
          setClose()
        }
      })
    } else {
      errorToast("Please select land or upload image first")
    }
  }

  return (
    <div className="mb-24">
      <div className="mb-9 mt-10 hidden flex-col justify-start sm:flex">
        <Typography className="text-lg text-neutral-400">MY LAND</Typography>
        <Typography className="text-xs text-neutral-600">
          Wallet manager for nakamoto.games world
        </Typography>
      </div>
      <div className="relative mt-12 grid justify-items-center sm:mt-0">
        <MiniMap
          pos={pos}
          className="block sm:hidden"
          ownerList={ownerLandList}
          notOwnerList={notOwnerLandList}
          currentLand={currentLand}
          setCurrentLand={setCurrentLand}
        />
        <div className="absolute top-6 z-10 mt-6 block h-[200px] sm:hidden">
          <div className="grid max-w-[400px] justify-center gap-4">
            <div className="flex h-[40px] gap-2">
              <div className="flex w-full items-center justify-between rounded-lg bg-neutral-800 px-[15px]">
                <Typography className="text-sm uppercase text-white-default">
                  NAKAVERSE MAP
                </Typography>
              </div>
              <div className="h-[40pc] w-[40px]">
                <motion.div
                  transition={{ type: "spring", stiffness: 100 }}
                  animate={{
                    rotate: expanded ? 0 : 180
                  }}
                  className={`mr-1 grid h-[40px] !w-[40px] content-center justify-items-center rounded-[8px] border   p-[7px] ${
                    expanded
                      ? `bg-error-main`
                      : `border-neutral-700 bg-neutral-780`
                  }`}
                >
                  <MenuButtonExpandMobile
                    isOpen={expanded}
                    onClick={handleOnExpandClick}
                    strokeWidth="2"
                    color="#F1F4F4"
                    transition={{
                      ease: "easeOut",
                      duration: 0.2,
                      stiffness: 10,
                      bounce: 5
                    }}
                    width="20"
                    height="10"
                  />
                </motion.div>
              </div>
            </div>

            <div className="flex h-[40px] w-[350px]	items-center justify-between rounded-[14px] bg-[#18181433] px-[15px] backdrop-blur-sm">
              <Typography className="text-sm uppercase text-white-default">
                NAKAVERSE MAP
              </Typography>
              {x && y && (
                <Chip
                  variant="filled"
                  size="small"
                  className="!bg-secondary-main uppercase !text-white-default"
                  label={`x${String(x)}, y${String(y)}`}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid w-fit grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="mx-4 mt-4 sm:mx-0 sm:mt-0">
          <CardMyLandContent
            title="NAKAVERSE MAP"
            map
            x={String(x)}
            y={String(y)}
            className="hidden sm:block"
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
        <div className="mx-4 justify-center sm:mx-0">
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
                handleClick((e) =>
                  handleFileChange(e, setImagePreview, setSelectedFile)
                )
              }}
            />
            {selectedFile && (
              <ButtonToggleIcon
                text="Upload banner"
                className="mt-[10px] h-[40px] !w-full !rounded-[24px] border border-neutral-700 bg-success-main font-bold capitalize text-success-contrastText"
                startIcon={null}
                endIcon={<IconArrowRight stroke="#010101" />}
                handleClick={onSubmit}
              />
            )}
            <input
              type="file"
              className="hidden"
              onChange={(e) =>
                handleFileChange(e, setImagePreview, setSelectedFile)
              }
              ref={hiddenImage}
              id="file-upload"
            />
          </CardMyLandContent>
          <div className="flex w-[333px] justify-center">
            <Typography className="w-[230px] text-center text-sm text-neutral-500">
              The banner will show on the map of the assets you hold.
            </Typography>
          </div>
          {/* {selectedFile && (
          <Typography className="w-[230px] text-center text-sm text-neutral-500">
            {String(selectedFile.string)}
          </Typography>
        )} */}
        </div>
      </div>
    </div>
  )
}

export default MyLandPage
