import styled from "@emotion/styled"

export const ModalWrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .iconnaka {
    padding-left: 10px;
    width: 50px;
  }

  &:before {
    content: "";
    position: fixed;
    width: 100%;
    height: 100%;
    background: #14161e;
    backdrop-filter: blur(10px);
    z-index: 99;
    left: 0;
    top: 0;
    opacity: 0.5;
  }
  .modal {
    .coming-soon {
      font-family: "dogicapixelbold";
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .inner {
      overflow-y: scroll;
      overflow-x: hidden;
      height: 440px;
      width: 100%;
      padding-right: 20px;
    }

    h2,
    h3 {
      font-family: "Satoshi-Bold";
    }
    h2 {
      font-size: 24px;
      margin-top: 0;
    }
    h3 {
      font-size: 20px;
    }
    ul {
      list-style: disc;
      &.decimal {
        list-style: decimal;
      }
    }
  }
`

export const ModalMain = styled.div`
  position: relative;
  width: 476px;
  height: auto;
  border-radius: 20px;
  padding: 50px 40px;
  background: rgba(25, 27, 35, 53);
  border: 1px solid #2e323c;
  z-index: 100;
  @media screen and (max-width: 767px) {
    width: calc(100% - 60px);
    padding: 30px;
    border-radius: 15px;
    max-width: 450px;
  }
`

export const ModalContent = styled.div`
  img {
    width: 6.5%;
  }
`

export const ModalHeader = styled.div`
  margin-bottom: 30px;
`

export const ModalFooter = styled.div`
  color: #98a0b5;
  font-family: "Satoshi-Regular", Helvetica, Arial, sans-serif;
  margin-bottom: 0;
  font-size: 14px;
  padding-top: 10px;
  line-height: 1.5;
`

export const ModalTitle = styled.div`
  font-family: "dogicapixelbold", Helvetica, Arial, sans-serif;
  font-size: 18px;
  line-height: 1.8;
  color: white;
  letter-spacing: 0;
  text-align: left;
  margin: 0 0 15px;
  text-transform: uppercase;
`

export const ModalDesc = styled.span`
  color: #98a0b5;
  font-family: "Satoshi-Regular", Helvetica, Arial, sans-serif;
  margin-bottom: 0;
  font-size: 14px;

  a {
    color: #98a0b5;
    font-family: "Satoshi-Bold", Helvetica, Arial, sans-serif;
  }
`

export const ModalClose = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .button-close {
    top: 15px;
    right: 15px;
  }
  svg {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 20px 0 #ec2f2f;
    transition: all 0.25s linear;
    &:hover {
      box-shadow: none;
    }
    path {
      fill: #ec2f2f;
    }
  }

  &::before,
  &::after {
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(135deg);
  }
`
