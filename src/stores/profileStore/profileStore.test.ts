import { renderHook, act } from "@testing-library/react"
import useProfileStore from "."

describe("profile test", () => {
  it("should be able to get profile data", () => {
    const { result } = renderHook(() => useProfileStore())

    expect(result.current.getProfile()).toBe(result.current.profile)
    expect(result.current.getProfileAddress()).toBe(result.current.address)
    expect(result.current.getProfileToken()).toBe(
      result.current.profile.jwtToken
    )
  })

  it("should reset profile data", () => {
    const { result } = renderHook(() => useProfileStore())

    act(() => {
      result.current.onReset()
    })
    expect(result.current.profile.isInitialized).toBe(false)
    expect(result.current.profile.isLoading).toBe(true)
    expect(result.current.profile.hasRegistered).toBe(false)
    expect(result.current.profile.data).toBe(null)
    expect(result.current.profile.jwtToken).toBe(null)
  })

  it("should set profile address", () => {
    const { result } = renderHook(() => useProfileStore())

    act(() => {
      result.current.onSetProfileAddress("0x0000000000")
    })
    expect(result.current.getProfileAddress()).toBe(result.current.address)
  })

  it("should set profile data", () => {
    const { result } = renderHook(() => useProfileStore())
    const mockProfile = {
      address: "0x00000",
      avatar: 1,
      gas: null
    }

    act(() => {
      result.current.onSetProfileData(mockProfile)
    })
    expect(result.current.getProfileAddress()).toBe("0x00000")
  })

  it("should set profile token", () => {
    const { result } = renderHook(() => useProfileStore())

    act(() => {
      result.current.onSetProfileToken("token")
    })
    expect(result.current.profile.jwtToken).toBe("token")
  })

  it("should set chip", () => {
    const { result } = renderHook(() => useProfileStore())

    act(() => {
      result.current.onSetChip(1000)
    })
    expect(result.current.myChip).toBe(1000)
  })
})
