import { Box } from "@mui/material"

// TODO: Created props interface later

const ProgressBarSlide = () => (
  <div className="progress-bar-slide relative mt-4 h-[1px] w-full bg-white-default/20">
    <Box
      component="span"
      sx={{
        ".slick-active &": {
          animation: "time-progress 5s linear forwards",
          "@keyframes time-progress": {
            "0%": { width: "0%" },
            "100%": { width: "100%" }
          }
        }
      }}
      className="progress-bar-slide__bar absolute left-0 top-0 h-full w-0 bg-white-default"
    />
  </div>
)

export default ProgressBarSlide
