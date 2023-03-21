import React from "react"

function Vector({
  width = 12,
  height = 12,
  color = "#232329"
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.39591 0.367718C5.64941 -0.122573 6.35058 -0.122573 6.60408 0.367718L8.21838 3.48986C8.28306 3.61498 8.385 3.71692 8.51016 3.78161L11.6323 5.39591C12.1226 5.64941 12.1226 6.35058 11.6323 6.60408L8.51016 8.21838C8.385 8.28306 8.28306 8.385 8.21838 8.51016L6.60408 11.6323C6.35058 12.1226 5.64941 12.1226 5.39591 11.6323L3.78161 8.51016C3.71692 8.385 3.61498 8.28306 3.48986 8.21838L0.367718 6.60408C-0.122573 6.35058 -0.122573 5.64941 0.367718 5.39591L3.48986 3.78161C3.61498 3.71692 3.71692 3.61498 3.78161 3.48986L5.39591 0.367718Z"
        fill={color}
      />
    </svg>
  )
}
export default Vector