import React, { useState } from "react"
import dynamic from "next/dynamic"

const HeaderP2P = dynamic(() => import("../atoms/HeaderP2P"), {
  suspense: true,
  ssr: false
})

const FormCreate = dynamic(() => import("../organisms/FormCreate"), {
  suspense: true,
  ssr: false
})

const P2PDexCreateContent = () => {
  const [type, setType] = useState<"buy" | "sell">("buy")
  return (
    <div className="p2p-dex-content--create">
      <HeaderP2P
        type={type}
        dataButton={[
          { title: "Create Buy", type: "buy" },
          { title: "Create Sell", type: "sell" }
        ]}
        setType={(value) => {
          setType(value)
        }}
      />
      <FormCreate type={type} />
    </div>
  )
}
export default P2PDexCreateContent
