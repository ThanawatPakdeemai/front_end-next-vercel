export interface IVideoProps {
  src: string
  poster: string
  autoPlay?: boolean
  controls?: boolean
}

export const VIDEOS: {
  [key: string]: IVideoProps
} = {
  becomeDeveloperVideo: {
    src: "/videos/become_developer_main_large.mp4",
    poster: "/videos/become_developer_video_poster.jpg"
  },
  becomeDeveloperVideoMobile: {
    src: "/videos/become_developer_main_medium.mp4",
    poster: "/videos/become_developer_video_poster.jpg"
  },
  gameDeveloperVideo: {
    src: "/videos/game_developer.mp4",
    poster: "/videos/game_developer_poster.jpg"
  }
}
