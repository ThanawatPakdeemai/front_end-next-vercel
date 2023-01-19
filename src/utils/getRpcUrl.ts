import random from "lodash/random"

// Array of available nodes to connect to
export const nodes = [
  "https://matic-mumbai.chainstacklabs.com"
  // "https://rpc-mumbai.maticvigil.com"
  // "http://35.247.164.60:23678"
]

const getNodeUrl = () => {
  const randomIndex = random(0, nodes.length - 1)
  return nodes[randomIndex]
}

export default getNodeUrl
