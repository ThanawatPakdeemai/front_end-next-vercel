import React from "react"
import { render, screen } from "@testing-library/react"
import TextfieldDetailContent from "@feature/marketplace/components/molecules/TextfieldDetailContent"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"

describe("TextfieldDetailContent component", () => {
  const types: TNFTType[] = [
    "nft_land",
    "nft_building",
    "nft_naka_punk",
    "nft_material",
    "game_item",
    "nft_game"
  ]

  const countData = {
    helperText: "Total supply",
    label: "Supply in market",
    min: 1,
    max: 10,
    count: 5
  }

  it.each(types.map((type, index) => [index + 1, type]))(
    "Case %i : renders type %s without error",
    (_type, _index) => {
      const key = `renders-type-${_index}`
      render(
        <TextfieldDetailContent
          type={_type as TNFTType}
          key={key}
        />
      )
      expect(screen.getByTestId(_type)).toBeInTheDocument()
    }
  )

  it("Case 7 : send props position should render label `BLOCK IN MAP`", () => {
    const position = { x: "10", y: "20" }
    render(
      <TextfieldDetailContent
        type="nft_land"
        position={position}
      />
    )
    const screenLabel = screen.getByLabelText("BLOCK IN MAP")
    expect(screenLabel).toBeInTheDocument()
  })

  it("Case 8 : send props position should render with correct value", () => {
    const position = { x: "10", y: "20" }
    render(
      <TextfieldDetailContent
        type="nft_land"
        position={position}
      />
    )

    const screenPosition = screen.getByDisplayValue(
      `${position.x}, ${position.y}`
    )
    expect(screenPosition).toBeInTheDocument()
    expect(screenPosition).toHaveValue(`${position.x}, ${position.y}`)
    expect(screenPosition).not.toHaveValue("20, 10")
  })

  it("Case 9 : send props price should render label `PRICE (NAKA)`", () => {
    render(
      <TextfieldDetailContent
        type="nft_land"
        price={5000000}
      />
    )
    const screenLabel = screen.getByLabelText("PRICE (NAKA)")
    expect(screenLabel).toBeInTheDocument()
  })

  it("Case 10 : send props price should render with correct value", () => {
    const price: number = 1212312121
    render(
      <TextfieldDetailContent
        type="nft_land"
        price={price}
      />
    )

    const screenPrice = screen.getByDisplayValue(price)
    expect(screenPrice).toBeInTheDocument()
    expect(screenPrice).toHaveValue(String(price))
    expect(screenPrice).not.toHaveValue(5415465)
  })

  it("Case 11: should render CountItem component when count prop is sent and type is not nft_land or nft_building", () => {
    const typesCheckValid: TNFTType[] = [
      "game_item",
      "nft_naka_punk",
      "nft_material",
      "nft_game"
    ]

    typesCheckValid.map((_type, index) => {
      render(
        <TextfieldDetailContent
          count={countData}
          type={_type}
        />
      )

      const screenCountItem = screen.queryAllByText("Supply in market")
      expect(screenCountItem).toHaveLength(index + 1)
      return null
    })
  })

  it("Case 12: should not render CountItem component when count prop is sent and type is nft_land or nft_building", () => {
    const typesCheckInvalid: TNFTType[] = ["nft_land", "nft_building"]

    typesCheckInvalid.map((_type) => {
      render(
        <TextfieldDetailContent
          count={countData}
          type={_type}
        />
      )

      const screenCountItem = screen.queryByText("Supply in market")
      expect(screenCountItem).not.toBeInTheDocument()
      return null
    })
  })
})
