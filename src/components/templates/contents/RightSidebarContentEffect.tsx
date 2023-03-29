import useTweenEffect from "@hooks/useSpartFireEffect"
import { IContentTemplateProps } from "@interfaces/IContentTemplate"
import React, { useEffect } from "react"

const RightSidebarContentEffect = ({
  content,
  aside,
  className
}: IContentTemplateProps) => {
  const { createParticle } = useTweenEffect(600, 300, 100, -300)
  useEffect(() => {
    let load = false

    if (!load) createParticle()

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createParticle])

  return (
    <div
      className={`relative flex-row gap-3 overflow-hidden md:flex ${className?.toString()}`}
    >
      <div
        id="spark-fire"
        className="absolute bottom-0"
      />
      <div className="mb-2 min-h-[400px] w-full rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-primary-main p-4 sm:mb-0 md:w-4/6">
        {content}
      </div>

      <div className="rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 md:w-2/6">
        {aside}
      </div>
    </div>
  )
}

export default RightSidebarContentEffect
