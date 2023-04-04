import React, { useEffect, useState } from "react"
import GasCard from "@components/atoms/GasCard"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import { useTranslation } from "react-i18next"
import GasIcon from "./tagline/GasIcon"

const Gas = ({ type }) => {
  const [standard, setStandard] = useState<number>(0)
  const [fast, setFast] = useState<number>(0)
  const [rapid, setRapid] = useState<number>(0)
  const [standardBNB, setStandardBNB] = useState<number>(0)
  const [fastBNB, setFastBNB] = useState<number>(0)
  const [rapidBNB, setRapidBNB] = useState<number>(0)
  const { t } = useTranslation()

  async function getGasPrices() {
    fetch("https://gasstation-mainnet.matic.network/v2")
      .then((response) => response.json())
      .then((json) => {
        const Standard = json.safeLow.maxFee.toFixed(1)
        const Fast = json.standard.maxFee.toFixed(1)
        const Rapid = json.fast.maxFee.toFixed(1)
        setStandard(Number(Standard))
        setFast(Number(Fast))
        setRapid(Number(Rapid))
      })

    fetch(
      "https://gbsc.blockscan.com/gasapi.ashx?apikey=key&method=pendingpooltxgweidata"
    )
      .then((response) => response.json())
      .then((json) => {
        const { standardgaspricegwei, fastgaspricegwei, rapidgaspricegwei } =
          json.result

        const StandardBNB = standardgaspricegwei.toFixed(1)
        const FastBNB = fastgaspricegwei.toFixed(1)
        const RapidBNB = rapidgaspricegwei.toFixed(1)
        setStandardBNB(Number(StandardBNB))
        setFastBNB(Number(FastBNB))
        setRapidBNB(Number(RapidBNB))
      })
  }

  useEffect(() => {
    let load = false

    if (!load) getGasPrices()

    return () => {
      load = true
    }
  }, [type])

  return (
    <Box className="p-[8px]">
      <div className="grid h-full w-full gap-2 !rounded-[14px]">
        <Box className="flex justify-center">
          <Card className="Cardtext h-full w-full !rounded-lg bg-black-100">
            <div className="mx-auto flex items-center justify-between p-[8px]">
              <div>
                <p className="p-2 text-sm uppercase text-neutral-600">
                  {t("gas_now")}
                </p>
              </div>
              <div>
                <GasIcon />
              </div>
            </div>
          </Card>
        </Box>

        <GasCard
          title={t("standard")}
          gwei={type === "NAKA" ? standard : standardBNB}
          color="text-green-lemon"
          second="30-60"
        />
        <GasCard
          title={t("fast")}
          gwei={type === "NAKA" ? fast : fastBNB}
          color="text-secondary-main"
          second="10-30"
        />
        <GasCard
          title={t("rapid")}
          gwei={type === "NAKA" ? rapid : rapidBNB}
          color="text-error-main"
          second="5-10"
        />
      </div>
    </Box>
  )
}

export default Gas
