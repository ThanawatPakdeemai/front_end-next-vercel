import dynamic from "next/dynamic"

const GaugeChart = dynamic(() => import("react-gauge-chart"), {
  suspense: true,
  ssr: false
})

interface IProp {
  value: number
  maxValue?: number
}

/**
 *
 * @description default maxValue is 100
 */

const GaugeCustom = ({ value, maxValue }: IProp) => {
  const gaugeValue = ((value / (maxValue || 100)) * 100) / 100
  return (
    <GaugeChart
      nrOfLevels={21}
      arcPadding={0}
      needleColor="#e1e2e2"
      needleBaseColor="#e1e2e2"
      cornerRadius={0}
      hideText
      animate={false}
      arcWidth={0.15}
      colors={[
        "#D91212",
        "#D31B34",
        "#CE234F",
        "#C72D73",
        "#C13590",
        "#B941BB",
        "#AF45C2",
        "#A24BCB",
        "#984FD2",
        "#8C54DA",
        "#7B5BE6",
        "#7067E7",
        "#6473E9",
        "#5583EB",
        "#4693ED",
        "#3AA0EF",
        "#27B4F1",
        "#28C6B4",
        "#29D485",
        "#2AE356",
        "#2BF127"
      ]}
      percent={gaugeValue}
    />
  )
}

export default GaugeCustom
