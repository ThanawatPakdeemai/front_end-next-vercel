function configZustandDevTools(name: string, actionName?: string) {
  return {
    name: `${name}`,
    enabled: process.env.NODE_ENV === "development",
    anonymousActionType: `${actionName || name}`
  }
}

export default configZustandDevTools
