import { useEffect, useState, useRef } from "react"
import { ethers } from "ethers"
import Web3 from "web3"
import { useWeb3React } from "@web3-react/core"
import web3NoAccount from "@utils/web3"
import { simpleRpcProvider } from "@utils/providers"

/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the provider change
 */
const useWeb3 = () => {
  const { library } = useWeb3React()
  const refEth = useRef(library)
  const [web3, setweb3] = useState(library ? new Web3(library) : web3NoAccount)
  useEffect(() => {
    if (library !== refEth.current) {
      setweb3(library ? new Web3(library) : web3NoAccount)
      refEth.current = library
    }
  }, [library])

  return web3
}

const useWeb3Provider = ():
  | ethers.providers.JsonRpcProvider
  | ethers.providers.Web3Provider => {
  const { library } = useWeb3React()
  const refEth = useRef(library)
  const [provider, setprovider] = useState(library || simpleRpcProvider)

  useEffect(() => {
    if (library !== refEth.current) {
      setprovider(library || simpleRpcProvider)
      refEth.current = library
    }
  }, [library])

  return provider
}

export { useWeb3, useWeb3Provider }
