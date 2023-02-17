import { useState } from "react"

const useTable = () => {
  const [limit, setLimit] = useState<number>(12)
  return {
    setLimit,
    limit
  }
}
// const [sortTime, setSortTime] = useState<number | undefined>(undefined) // 1 || -1
// const allTypes = ["DepositNaka", "WithdrawNaka"] //Be able to change
// const [typeCheck, setTypeCheck] = useState<Array<string>>(allTypes)
// const [sortAmount, setSortAmount] = useState<number | undefined>(undefined)

// const onTypeCheck = (_value: string, _checked: boolean) => {
//   setTypeCheck((prev: Array<string>) => {
//     let data = prev
//     const findType = prev.find((v) => v === _value)
//     if (findType) {
//       data = data.filter((v) => v !== _value)
//       if (_checked) {
//         data = [...data, _value]
//       }
//     } else if (_checked) {
//       data = [...data, _value]
//     }
//     return [...data]
//   })
// }
// onTypeCheck, typeCheck, sortTime, sortAmount

export default useTable
