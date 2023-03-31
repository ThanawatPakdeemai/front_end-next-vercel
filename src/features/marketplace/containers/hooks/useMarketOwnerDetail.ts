import { useGetLandById } from "@feature/land/containers/hooks/useGetMyLand"
import { ILandData } from "@feature/land/interfaces/ILandService"
import useGlobal from "@hooks/useGlobal"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const useMarketOwnerDetail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [ownerDetail, setOwnerDetail] = useState<ILandData>()

  const { marketType } = useGlobal()
  const { mutateGetLandById } = useGetLandById()

  const router = useRouter()
  const id = router.query.id as string

  const fetchOwnerDetail = () => {
    setIsLoading(false)
    switch (marketType) {
      case "nft_land":
        mutateGetLandById({ _id: id })
          .then((_res) => {
            setOwnerDetail(_res[0])
          })
          .finally(() => setIsLoading(false))
        break
      default:
        break
    }
  }

  useEffect(() => {
    let load = false

    if (!load) fetchOwnerDetail()

    return () => {
      load = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketType])

  return { isLoading, ownerDetail, marketType }
}

export default useMarketOwnerDetail
