import { render, screen } from "@testing-library/react"
import Home from "../pages/index"
import "@testing-library/jest-dom"

describe("Check Home Component", () => {
  it("Should render title text", () => {
    render(<Home />)
    expect(screen.getByText("Nakamoto.games")).toBeInTheDocument()
  })
})
