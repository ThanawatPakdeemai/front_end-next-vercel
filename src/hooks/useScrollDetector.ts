import { useState, useEffect } from "react"

const useScrollDetector = () => {
  const [isBottomed, setIsBottomed] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const isBottom = scrollTop + windowHeight >= documentHeight

      if (isBottom) {
        // User has scrolled to the bottom of the page
        // Perform any necessary actions or fetch more data
        setIsBottomed(true)
      } else {
        setIsBottomed(false)
      }
    }

    // Add event listener when the component mounts
    window.addEventListener("scroll", handleScroll)

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  return isBottomed
}

export default useScrollDetector
