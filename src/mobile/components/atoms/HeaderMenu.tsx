import Link from "next/link"
import { useRouter } from "next/router"

interface IProp {
  menu: { name: string; link: string }[]
}
const HeaderMenu = ({ menu }: IProp) => {
  const router = useRouter()

  return (
    <>
      <div
        className=" hide-scroll flex
       h-[40px] w-full items-center justify-between gap-4 overflow-scroll border border-neutral-800 bg-neutral-780"
      >
        {menu.map((ele) => {
          const active = router.asPath?.includes(ele.link)
          return (
            <Link
              key={ele.name}
              href={ele.link || "/"}
            >
              <div
                className={`mx-[10px] flex h-[40px] items-center justify-center ${
                  active ? "bg-primary-main text-neutral-300" : ""
                } w-full max-w-[196px] whitespace-nowrap text-center font-neue-machina text-sm text-neutral-500`}
              >
                {ele.name}
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
export default HeaderMenu
