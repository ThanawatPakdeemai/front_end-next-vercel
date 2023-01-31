import React, { Component } from "react"
import createLogo from "@metamask/logo"

/**
 * @description This code is specific use for creating Matamask Logo
 * that can be looking for user's mouse
 */

class MetamaskLogo extends Component {
  mask: any

  componentDidMount() {
    this.mask = createLogo({
      pxNotRatio: true,
      width: 48,
      height: 48,
      followMouse: true,
      slowDrift: false
    })
    const container = document.getElementById("logo-container-metamask")
    if (container && container.children.length !== 1) {
      container.appendChild(this.mask.container)
    }
  }

  componentWillUnmount() {
    this.mask.stopAnimation()
  }

  render() {
    return <div id="logo-container-metamask" />
  }
}

export default MetamaskLogo
