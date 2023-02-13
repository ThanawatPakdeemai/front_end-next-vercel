import { gsap, Linear, Back, Power1 } from "gsap"

interface ITweenProps {
  yMin?: number
  yMax?: number
  xMin?: number
  xMax?: number
  scaleMin?: number
  scaleMax?: number
  scaleXMin?: number
  scaleXMax?: number
  scaleYMin?: number
  scaleYMax?: number
  opacityMin?: number
  opacityMax?: number
}
/**
 * @description Spark fire effect be albe to setting width, height, density, yMin
 * @param _width is window width
 * @param _height is window height
 * @param _density is number of particles
 * @param _yMin is yMin of particles
 * @returns
 */
const useTweenEffect = (
  _width?: number,
  _height?: number,
  _density?: number,
  _yMin?: number
) => {
  const density: number = _density || 70
  const speed: number = 2
  const winWidth: number = _width || 600
  const winHeight: number = _height || 900
  const start: ITweenProps = {
    yMin: _yMin || -10,
    yMax: winHeight,
    xMin: winWidth / 2 + 10,
    xMax: winWidth / 2 + 40,
    scaleMin: 0.1,
    scaleMax: 0.25,
    scaleXMin: 0.1,
    scaleXMax: 1,
    scaleYMin: 1,
    scaleYMax: 2,
    opacityMin: 0.1,
    opacityMax: 0.4
  }

  const mid: ITweenProps = {
    yMin: winHeight * 0.4,
    yMax: winHeight * 0.9,
    xMin: winWidth * 0.1,
    xMax: winWidth * 0.9,
    scaleMin: 0.2,
    scaleMax: 0.8,
    opacityMin: 0.5,
    opacityMax: 1
  }
  const end: ITweenProps = {
    yMin: -180,
    yMax: -180,
    xMin: -100,
    xMax: winWidth + 180,
    scaleMin: 0.1,
    scaleMax: 1,
    opacityMin: 0.4,
    opacityMax: 0.7
  }

  /**
   * @description Create a random number between min and max
   * @param map
   * @param prop
   */
  const range = (map: ITweenProps, prop: string) => {
    const min = map[`${prop}Min`]
    const max = map[`${prop}Max`]
    return min + (max - min) * Math.random()
  }
  const randomEase = (
    easeThis: string | gsap.EaseFunction | undefined,
    easeThat: string | gsap.EaseFunction | undefined
  ) => {
    if (Math.random() < 0.5) {
      return easeThat
    }
    return easeThis
  }

  /**
   * @description Create effect Spark Fire
   * @param particle
   */
  const spawn = (particle: HTMLElement) => {
    const wholeDuration = (10 / speed) * (0.7 + Math.random() * 0.4)
    const delay: number = wholeDuration * Math.random()
    let partialDuration: number = wholeDuration * (0.5 + Math.random() * 0.3)
    const defaultStart = {
      y: range(start, "y"),
      x: range(start, "x"),
      scaleX: range(start, "scaleX"),
      scaleY: range(start, "scaleY"),
      scale: range(start, "scale"),
      opacity: range(start, "opacity"),
      visibility: "hidden"
    }
    gsap.fromTo(particle, defaultStart, {
      duration: partialDuration,
      delay,
      y: range(mid, "y"),
      ease: randomEase(Linear.easeOut, Back.easeInOut)
    })
    gsap.fromTo(particle, defaultStart, {
      duration: wholeDuration - partialDuration,
      delay: partialDuration + delay,
      y: range(end, "y"),
      ease: Back.easeIn
    })
    // Moving on axis X
    gsap.fromTo(particle, defaultStart, {
      duration: partialDuration,
      delay,
      x: range(mid, "x"),
      ease: randomEase(Linear.easeOut, Back.easeInOut)
    })
    gsap.fromTo(particle, defaultStart, {
      duration: wholeDuration - partialDuration,
      delay: partialDuration + delay,
      x: range(end, "x"),
      ease: randomEase(Linear.easeOut, Back.easeInOut)
    })
    // opacity and scale
    partialDuration = wholeDuration * (0.5 + Math.random() * 0.3)
    gsap.fromTo(particle, defaultStart, {
      delay,
      duration: partialDuration,
      scale: range(mid, "scale"),
      autoAlpha: range(mid, "opacity"),
      ease: Power1.easeIn
    })
    gsap.fromTo(particle, defaultStart, {
      duration: wholeDuration - partialDuration,
      delay: partialDuration + delay,
      scale: range(end, "scale"),
      autoAlpha: range(end, "opacity"),
      ease: Linear.easeNone,
      onComplete: spawn,
      onCompleteParams: [particle]
    })
  }

  /**
   * @description Create a Spark Fire div
   */
  const createParticle = () => {
    const targetElement: HTMLElement = document.getElementById(
      "spark-fire"
    ) as HTMLElement

    for (let i = 0; i < density; i += 1) {
      const particleSpark: HTMLElement = document.createElement("div")
      particleSpark.classList.add("spark")
      targetElement.appendChild(particleSpark)
      spawn(particleSpark)
    }
  }

  return {
    createParticle
  }
}

export default useTweenEffect
