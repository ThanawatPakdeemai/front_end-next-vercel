import { TextField } from "@mui/material"
import { StyledSearchInputMobile } from "@mobile/styles/muiStyleMobile"
import { useTranslation } from "react-i18next"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import SearchIconMobile from "../icons/SearchIconMobile"

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
        startAdornment: <SearchIconMobile />,
        endAdornment: <ArrowRightAltIcon className="text-warning-100" />
      }}
      sx={StyledSearchInputMobile}
    />
  )
}

export default SearchInputMobile
