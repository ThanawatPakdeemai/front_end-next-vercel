import useGlobal from "@hooks/useGlobal"
import useTweenEffect from "@hooks/useSpartFireEffect"
import { IContentTemplateProps } from "@interfaces/IContentTemplate"
import React, { useEffect } from "react"

const RightSidebarContentEffect = ({
  content,
  aside,
  className
}: IContentTemplateProps) => {
  const { hydrated } = useGlobal()
  const { createParticle } = useTweenEffect(600, 300, 10, -500)
  useEffect(() => {
    let load = false

    if (!load) {
      if (hydrated) createParticle()
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated])

  return (
    <div
      className={`relative w-full flex-row gap-3 overflow-hidden md:flex ${className?.toString()}`}
    >
      {/* <div
        id="spark-fire"
        className="absolute bottom-0 hidden lg:block"
      /> */}
      <div className="right-sidebar-content__wrapper mb-2 min-h-[700px] w-full flex-auto rounded-2xl border-[1px] border-neutral-700 border-opacity-80 bg-primary-main p-4 sm:mb-0 md:w-4/6">
        {content}
      </div>

      <div className="right-sidebar-content__sidebar h-full w-full max-w-[360px] flex-auto rounded-md md:w-2/6">
        {aside}
      </div>
    </div>
  )
}

export default RightSidebarContentEffect
