import React, { createContext, ReactNode, useContext, useState } from "react"
import { chainIdConfig } from "@src/constants/sites"
import { ethers } from "ethers"
import Web3 from "web3"

interface IProp {
  children: ReactNode
}

interface Context {
  chainId: number
  account: string | undefined
  signer: ethers.providers.JsonRpcSigner | undefined
  setChainId: React.Dispatch<React.SetStateAction<number>>
}

// let provider;
//   let signer: any;
//   if (ethereum) {
//     provider = new ethers.providers.Web3Provider(ethereum);
//     signer = provider.getSigner();
//   }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let provider: any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const windowETH: any = window.ethereum
if (windowETH) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provider = new ethers.providers.Web3Provider(windowETH, "any")
  // const provider = new ethers.providers.Web3Provider(ethereum);
}

// const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
const NetworkContext = createContext<Context>({
  chainId: chainIdConfig.polygon, // Default: polygon
  account: undefined,
  signer: provider ? provider.getSigner() : undefined,
  setChainId: () => chainIdConfig.polygon
})

export function useNetworkContext() {
  // eslint-disable-next-line max-len
  // const context = { ...useContext(NetworkContext), account: undefined };  เอาไว้เทสว่า อยากให้ account undefined
  const context = useContext(NetworkContext)
  const [accountMetamask, setAccountMetamask] = useState("")

  if (context.account === undefined) {
    try {
      new Web3(windowETH).givenProvider
        .request({ method: "eth_requestAccounts" })
        .then((elm: Array<string>) => setAccountMetamask(elm[0]))
      return { ...context, account: accountMetamask }
    } catch (error) {
      console.error("metmask error", error)
    }
  }

  if (context === undefined) {
    throw new Error("Context must be used within a Provider")
  } else {
    return context
  }
}
