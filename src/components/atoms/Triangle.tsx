interface ITriangle {
  position:
    | "bottom"
    | "top"
    | "left"
    | "right"
    | "bottom-left"
    | "bottom-right"
    | "top-left"
    | "top-right"
  color?: string
  width?: string
  height?: string
}

const Triangle = ({
  position,
  color = "bg-neutral-800",
  width = "w-[10px]",
  height = "h-[10px]"
}: ITriangle) => {
  switch (position) {
    case "bottom":
      return (
        <div className="inline-block w-full overflow-hidden">
          <div
            className={`${color.toString()} ${width.toString()} ${height.toString()} origin-bottom-left rotate-45 transform`}
          />
        </div>
      )

    case "top":
      return (
        <div className="inline-block w-full overflow-hidden">
          <div
            className={`${color.toString()} ${width.toString()} ${height.toString()} origin-top-left -rotate-45 transform`}
          />
        </div>
      )

    case "left":
      return (
        <div className="inline-block w-full overflow-hidden">
          <div
            className={`${color.toString()} ${height.toString()} origin-top-right -rotate-45 transform`}
          />
        </div>
      )

    case "right":
      return (
        <div className="inline-block w-full overflow-hidden">
          <div
            className={`${color.toString()} ${height.toString()} origin-top-left rotate-45 transform`}
          />
        </div>
      )

    case "bottom-left":
      return (
        <div className="inline-block w-full overflow-hidden">
          <div
            className={`${color.toString()} ${height.toString()} origin-bottom-right -rotate-45 transform`}
          />
        </div>
      )

    case "bottom-right":
      return (
        <div className="inline-block w-full overflow-hidden">
          <div
            className={`${color.toString()} ${height.toString()} origin-bottom-left rotate-45 transform`}
          />
        </div>
      )

    case "top-left":
      return (
        <div className="inline-block w-full overflow-hidden">
          <div
            className={`${color.toString()} ${height.toString()} origin-top-left -rotate-45 transform`}
          />
        </div>
      )

    case "top-right":
      return (
        <div className="inline-block w-full overflow-hidden">
          <div
            className={`${color.toString()} ${height.toString()} origin-top-right rotate-45 transform`}
          />
        </div>
      )

    default:
      return (
        <div className="inline-block w-full overflow-hidden">
          <div
            className={`${color.toString()} ${height.toString()} origin-top-right rotate-45 transform`}
          />
        </div>
      )
  }
}

export default Triangle
