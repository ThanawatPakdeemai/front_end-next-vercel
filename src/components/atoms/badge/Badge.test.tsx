import { render, screen } from "@testing-library/react"
import Badge from "./Badge"

const onRender = () => render(<Badge />)
describe("Test Badge component", () => {
  test("should render Badge", () => {
    expect(onRender()).toMatchSnapshot()
  })

  test("should render text props", () => {
    const labelText = "PUN GAME"
    render(
      <Badge variant="primary-01">
        <p>{labelText}</p>
      </Badge>
    )
    const badgeComp = screen.getByText(labelText)
    expect(badgeComp).toBeInTheDocument()
    expect(screen.getByRole("status")).toHaveClass("bg-primary-01")
  })
})
