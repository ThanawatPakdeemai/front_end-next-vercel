import React from "react"
import { render, screen } from "@testing-library/react"
import ChipsLink from "@feature/marketplace/components/molecules/ChipsLink"

describe("ChipsLink", () => {
  it("renders the component correctly", () => {
    const id = "123456"
    const position = { x: "10", y: "20" }

    render(
      <ChipsLink
        id={id}
        position={position}
      />
    )

    const viewOnMapChip = screen.getByText("VIEW ON MAP")
    expect(viewOnMapChip).toBeInTheDocument()

    const landDetailsChip = screen.getByText("LAND DETAILS")
    expect(landDetailsChip).toBeInTheDocument()

    // Add more assertions for other elements if needed
  })
})

// describe("test ยกกำลัง", () => {
//   const yokkumlang = (number: number) => number ** 2

//   test("Case 1 : 2 ยกกำลัง 2 == 4", () => {
//     expect(yokkumlang(2)).toBe(4)
//     expect(yokkumlang(2)).toEqual(4)
//   })

//   test("Case 2 : 2 ยกกำลัง 2 ใกล้เคียง 4", () => {
//     expect(yokkumlang(2)).toBeCloseTo(4.005)
//   })

//   test("Case 3 : 2 ยกกำลัง 2 น้อยกว่า 5", () => {
//     expect(yokkumlang(2)).toBeLessThanOrEqual(4.5)
//     expect(yokkumlang(2)).toBeLessThan(5)
//   })

//   test("Case 4 : 2 ยกกำลัง 2 มากกว่า 3", () => {
//     expect(yokkumlang(2)).toBeGreaterThan(3)
//     expect(yokkumlang(2)).toBeGreaterThanOrEqual(3)
//   })
// })

// describe("Test API", () => {
//   test("Case 1: Data", async () => {
//     try {
//       const popularTags = await getBlogDetail("647961ba3984af4dce887ece")
//       expect(popularTags).not.toBeFalsy()
//       console.log("Popular tags:", popularTags)
//     } catch (error) {
//       // Handle network error
//       console.log("Error:", error.message)
//     }
//   })
// })
