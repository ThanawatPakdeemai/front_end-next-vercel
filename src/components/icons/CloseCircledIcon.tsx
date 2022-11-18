import React from "react"

function IconCloseCircledOri({
  width = 24,
  height = 24,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
      fill="#6F767E"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.70711 8.29286C9.31658 7.90234 8.68342 7.90234 8.29289 8.29286C7.90237 8.68339 7.90237 9.31655 8.29289 9.70708L10.5858 12L8.29292 14.2929C7.9024 14.6834 7.9024 15.3166 8.29292 15.7071C8.68345 16.0976 9.31661 16.0976 9.70714 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0977 9.31658 16.0977 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29286Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      />
    </svg>
  )
}

function IconCloseCircledHover({
  width = 24,
  height = 24,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="#6F767E"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L10.5858 12L8.29299 9.70714C7.90246 9.31661 7.90246 8.68345 8.29299 8.29292C8.68351 7.9024 9.31668 7.9024 9.7072 8.29292L12 10.5858L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L13.4142 12L15.7072 14.2929C16.0977 14.6835 16.0977 15.3166 15.7072 15.7071C15.3167 16.0977 14.6835 16.0977 14.293 15.7071L12 13.4142L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071Z"
      />
    </svg>
  )
}

const CloseCircledIcon = {
  Ori: IconCloseCircledOri,
  Hover: IconCloseCircledHover
}

export default CloseCircledIcon
