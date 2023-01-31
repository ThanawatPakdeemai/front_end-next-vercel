import React from "react"

export interface IRedBanner {
  message: string
}

const RedBanner = ({ message }: IRedBanner) => (
  <div className="relative w-full rounded-[13px] bg-[#2C0909] py-14">
    <div
      className="glitch text-center font-digital-7 text-[26px] uppercase text-red-card"
      style={{
        textShadow:
          "0px -13px 330px rgba(255, 0, 0, 0.9), 0px -5.43109px 137.866px rgba(255, 0, 0, 0.646969), 0px -2.90372px 73.7098px rgba(255, 0, 0, 0.536497), 0px -1.6278px 41.3211px rgba(255, 0, 0, 0.45), 0px -0.864513px 21.9453px rgba(255, 0, 0, 0.363503), 0px -0.359743px 9.13195px rgba(255, 0, 0, 0.253031)"
      }}
      data-text={message}
    >
      {message}
    </div>
    <div className="bg-over-text top-0 h-full w-full rounded-[13px] bg-[url('/images/services/LED-effect.svg')]" />
  </div>
)

export default RedBanner
