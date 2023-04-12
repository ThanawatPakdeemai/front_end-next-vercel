import { act, renderHook } from "@testing-library/react"
import Config from "@src/configs/index"
import useCreateWeb3Provider from "./useCreateWeb3Provider"

// Mock resolve from env file.
jest.mock("../../configs/index.ts", () => ({
  get NEXT_PUBLIC_MATIC_RPC_URL() {
    return "https://rpc.ankr.com/polygon"
  },
  get NEXT_PUBLIC_RPC_POLYGON() {
    return "https://polygon-rpc.com/"
  }
}))

jest.clearAllMocks()

// Mock next router.
const mockedRouter = {
  push: jest.fn(),
  pathname: "/",
  query: {},
  asPath: "/",
  route: "/",
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn()
  }
}
jest.mock("next/router", () => ({
  useRouter() {
    return mockedRouter
  }
}))

describe("Should useWeb3provider", () => {
  jest.spyOn(Config, "NEXT_PUBLIC_MATIC_RPC_URL", "get")
  jest.spyOn(Config, "NEXT_PUBLIC_RPC_POLYGON", "get")

  test("should connect metamask success", () => {
    const { result } = renderHook(() => useCreateWeb3Provider())
    act(() => {
      result.current.handleConnectWithMetamask()
    })
    expect(result.current.address).toBeUndefined()
    expect(result.current.provider).toBeUndefined()
    expect(result.current.chainId).toBeUndefined()
    expect(result.current.accounts).toBeUndefined()
  })

  // test("should connect wallet connect success", () => {
  //   const { result } = renderHook(() => useCreateWeb3Provider())
  //   act(() => {
  //     result.current.handleConnectWithWalletConnect()
  //   })
  //   expect(result.current.address).toBeUndefined()
  //   expect(result.current.provider).toBeUndefined()
  //   expect(result.current.chainId).toBeUndefined()
  //   expect(result.current.accounts).toBeUndefined()
  // })
})
