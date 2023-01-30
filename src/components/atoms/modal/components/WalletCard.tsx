/* eslint-disable no-use-before-define */
import React, { memo } from "react"
import styled from "styled-components"
import { connectorLocalStorageKey } from "@constants/wallets"
import { Login, Config } from "@src/types/wallet"
import Image from "next/image"

interface Props {
  walletConfig: Config
  login: Login
  onDismiss: () => void
}

const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss }) => {
  const { title, icon } = walletConfig

  return (
    <Setposition>
      <ButtonSelector
        onClick={() => {
          window.localStorage.setItem(
            connectorLocalStorageKey,
            walletConfig.connectorId
          )
          login(walletConfig.connectorId)
          // login(walletId);
          onDismiss()
        }}
      >
        {icon ? (
          <Image
            src={`/assets/images/icons/wallets/${icon}`}
            alt={title}
          />
        ) : (
          ""
        )}
        {title}
        <Image
          className="set-icon"
          src="/assets/images/icons/point-left.svg"
          alt=""
        />
      </ButtonSelector>
    </Setposition>
  )
}

const Setposition = styled.div``

const ButtonSelector = styled.div`
  position: relative;
  margin-bottom: 30px;
  border-radius: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: "dogicapixel";
  font-size: 14px;
  line-height: 1.8;
  color: white;
  letter-spacing: 0;
  padding: 15px 15px 15px 80px;
  cursor: pointer;
  @media screen and (max-device-width: 767px) {
    padding-left: 50px;
    margin-bottom: 5px;
  }

  ::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;

    left: 0;
    z-index: 1;
    border-radius: 15px;
  }
  .set-icon {
    opacity: 0;
    margin-right: 0px;
  }
  :hover {
    background-color: #1d2029;
    margin-right: 0px;
    .set-icon {
      opacity: 1;
      position: absolute;
      right: 30px;
      left: auto;
    }
    @media screen and (max-device-width: 767px) {
      background-color: transparent;
      .set-icon {
        opacity: 0;
      }
    }
  }

  img {
    position: absolute;
    left: 30px;
    font-size: 22px;
    @media screen and (max-device-width: 767px) {
      left: 5px;
    }
  }
`

export default memo(WalletCard)
