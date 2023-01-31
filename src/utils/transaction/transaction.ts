import web3 from "web3"
import { IGeteventlog } from "./types"

const TransactionHelper = () => {
  const getFeeGas = (effectiveGasPrice: string, gasUsed: number) =>
    Number(web3.utils.fromWei(effectiveGasPrice, "ether")) * gasUsed

  const calFloat = (value: number, regit = 4) => {
    if (value === 0 && regit) {
      return value.toFixed(regit)
    }
    if (value && regit) {
      const _decimal = 10 ** regit
      const mutiplyValue = Number(value * _decimal)
      const devideValue = mutiplyValue / _decimal
      return devideValue.toFixed(regit)
    }
  }

  const getEventLog = ({ allowed, events }: IGeteventlog) => {
    let data = null
    data = Object.keys(events)
      .filter((key) => allowed.includes(key))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .reduce((obj: any, key: any) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        obj[key] = events[key]
        return obj
      }, {})

    return data
  }

  const weiToNaka = (amount: string) =>
    Number(web3.utils.fromWei(amount, "ether"))

  const nakaToWei = (amount: string) => {
    // return Number(web3.utils.toWei(amount, "ether"));
    const _nakaWei = Number(web3.utils.toWei(amount, "ether"))
    // const _nakaWei = web3.utils.toBN(web3.utils.toWei(amount, "ether")).toString();

    return _nakaWei
  }

  return {
    getFeeGas,
    calFloat,
    getEventLog,
    weiToNaka,
    nakaToWei
  }
}

export default TransactionHelper
