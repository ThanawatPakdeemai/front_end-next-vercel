export const calculatePosition = ({ x, y }: { x: string; y: string }) => ({
  px: Number(x) - 173.5,
  py: Number(y) - 1.5
})
