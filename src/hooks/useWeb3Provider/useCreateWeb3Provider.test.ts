import { renderHook, act } from "@testing-library/react"
import { IProfile } from "@feature/profile/interfaces/IProfileService"
import useCreateWeb3Provider from "./useCreateWeb3Provider"

// jest.mock("./getProfileByEmail", () => ({
//   __esModule: true,
//   default: jest.fn()
// }))

jest.mock(
  "@src/features/profile/containers/services/profile.service.ts",
  () => ({
    __esModule: true,
    default: jest.fn(),
    getProfileByEmail: jest.fn(() => Promise.resolve({})),
    updateWalletAddress: jest.fn(() => Promise.resolve(true))
  })
)

describe("useCreateWeb3Provider", () => {
  // Set up mock functions
  const mockUpdateWalletAddress = jest.fn(() => Promise.resolve(true))
  const mockGetProfileByEmail = jest.fn(() => Promise.resolve({}))

  beforeAll(() => {
    jest.spyOn(window, "location", "get").mockReturnValue({
      reload: jest.fn()
    } as unknown as Location)
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it("should call updateWalletAddress and getProfileByEmail when onUpdateWallet is called", async () => {
    // Render the hook
    const { result } = renderHook(() => useCreateWeb3Provider())

    const mockAddress = "0x456"
    const mockProfile: IProfile = {
      email: "test@example.com",
      address: "0x123",
      updatedAt: new Date(),
      banned: [],
      ban_time: new Date(),
      friend: [],
      nonce: 0,
      ranks: [],
      jwtToken: "",
      stamina_point: 0,
      total_stamina: 0,
      recovery_stamina_time: new Date(),
      country: "",
      user_ip_address: "",
      max_exp: 0,
      exp: 0,
      level: 0,
      status: 0,
      createdAt: new Date(),
      role: "",
      is_active: false,
      avatar: "",
      username: "",
      id: "",
      subscription: false
    }

    // Call the onUpdateWallet function
    const { onUpdateWallet } = result.current
    await act(async () => {
      await onUpdateWallet(mockProfile, mockAddress)
    })

    // Assert that the mock functions were called with the correct arguments
    expect(mockUpdateWalletAddress).toHaveBeenCalledWith({
      _email: mockProfile.email,
      _address: mockAddress
    })
    expect(mockGetProfileByEmail).toHaveBeenCalledWith(mockProfile.email)
  })

  /* it("should reload the page after successfully updating the wallet address", async () => {
    const { result } = renderHook(() => useCreateWeb3Provider())

    const mockAddress = "0x456"
    const { onUpdateWallet } = result.current

    mockUpdateWalletAddress.mockResolvedValue(true)

    await act(async () => {
      await onUpdateWallet(mockProfile, mockAddress)
    })

    expect(window.location.reload).toHaveBeenCalled()
  })

  it("should not reload the page if there was an error updating the wallet address", async () => {
    const { result } = renderHook(() => useCreateWeb3Provider())

    const mockAddress = "0x456"
    const { onUpdateWallet } = result.current

    mockUpdateWalletAddress.mockRejectedValue(
      new Error("Failed to update wallet")
    )

    await act(async () => {
      await onUpdateWallet(mockProfile, mockAddress)
    })

    expect(window.location.reload).not.toHaveBeenCalled()
  }) */
})
