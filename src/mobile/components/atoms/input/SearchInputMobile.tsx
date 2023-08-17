import { TextField } from "@mui/material"
import { StyledSearchInputMobile } from "@mobile/styles/muiStyleMobile"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface ISearchInputMobileProps {
  searchBlog: string
  setSearchBlog: (_value: string) => void
}

const SearchInputMobile = ({
  searchBlog,
  setSearchBlog
}: ISearchInputMobileProps) => {
  const { t } = useTranslation()
  return (
    <TextField
      value={searchBlog}
      onChange={(event) => {
        // let { value } = event.target
        // value = value.replace(/[^A-Za-z0-9]/gi, "")
        setSearchBlog(event.target.value as string)
      }}
      placeholder={`${t("search_games")}...`}
      InputProps={{
        startAdornment: (
          <Icomoon className="icon-app icon-Search text-[#F2C94C]" />
        )
      }}
      sx={StyledSearchInputMobile}
    />
  )
}

export default SearchInputMobile
