import React, { useState } from "react"

interface IVideo {
  src: string
  poster: string
  autoPlay?: boolean
  controls?: boolean
  // disableMouseEvent?: boolean
  // disableMouseOver?: boolean
  // disableMouseOut?: boolean
  disableOnClick?: boolean
  className?: string
}

const Video = ({
  src,
  poster,
  className,
  autoPlay,
  controls,
  // disableMouseEvent,
  // disableMouseOver,
  // disableMouseOut,
  disableOnClick
}: IVideo) => {
  const [click, setClick] = useState<boolean>(false)

  // const hoverPlayVideo = (
  //   event: React.MouseEvent<HTMLVideoElement, MouseEvent>
  // ) => {
  //   if (disableMouseEvent) {
  //     return
  //   }
  //   if (disableMouseOver) {
  //     return
  //   }
  //   const playPromise = (event.target as HTMLVideoElement).play()
  //   setClick(false)

  //   if (playPromise !== undefined) {
  //     playPromise
  //       .then(() => (event.target as HTMLVideoElement).play())
  //       .catch(() => (event.target as HTMLVideoElement).pause())
  //   }
  // }

  // const stopVideo = (event: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
  //   if (disableMouseEvent) {
  //     return
  //   }
  //   if (disableMouseOut) {
  //     return
  //   }
  //   return (event.target as HTMLVideoElement).pause()
  // }

  const togglePlayVideo = (
    event: React.MouseEvent<HTMLVideoElement, MouseEvent>
  ) => {
    if (disableOnClick) {
      return
    }
    setClick((prev: boolean) => !prev)
    if (click) {
      return (event.target as HTMLVideoElement).play()
    }
    return (event.target as HTMLVideoElement).pause()
  }

  return (
    <video
      className={`${className || ""} ${
        src.includes(".mp4") ? "h-full" : "max-h-60"
      }  w-auto cursor-pointer object-cover `}
      loop
      muted
      autoPlay={autoPlay || false}
      controls={controls || false}
      controlsList="nodownload"
      preload="none"
      poster={poster}
      onClick={(event) => togglePlayVideo(event)}
      src={src}
    />
  )
}

export default Video
