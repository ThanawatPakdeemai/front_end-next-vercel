function configZustandDevTools(name: string, actionName?: string) {
  return {
    name: `${name}`,
    enabled: process.env.NEXT_PUBLIC_MODE === "development",
    anonymousActionType: `${actionName || name}`
  }
}

export default configZustandDevTools
