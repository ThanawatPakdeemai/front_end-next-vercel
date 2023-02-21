import { ethers } from "ethers"

const useConnectMetamaskAction = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ethereum }: any = window

  // let provider;
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // let signer: any;
  // if (ethereum) {
  //   provider = new ethers.providers.Web3Provider(ethereum);
  //   signer = provider.getSigner();
  // }

  // Get optionPeriods
  const getSignature = async (address: string) => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()

      const _signature = await signer.signMessage(
        `NAKAMOTO Authentication: ${address}`
      )
      return _signature
    } catch (err) {
      return {
        status: false,
        addressContract: address,
        err
      }
    }
  }
  return {
    getSignature
  }
}
export default useConnectMetamaskAction
