import { ComponentPropsWithoutRef } from "react"

export interface IPropsBadge extends ComponentPropsWithoutRef<"div"> {
  variant?:
    | "fill"
    | "text"
    | "primary-01"
    | "primary-02"
    | "primary-03"
    | "primary-04"
    | "primary-05"
    | "neutral-08"
}

function Badge({
  children,
  variant = "fill",
  className,
  ...props
}: IPropsBadge) {
  const hasVariant = {
    fill: "",
    "primary-01": "bg-primary-01",
    "primary-02": "bg-primary-02",
    "primary-03": "bg-primary-03",
    "primary-04": "bg-primary-04",
    "primary-05": "bg-primary-05",
    "neutral-08": "bg-neutral-08/50",
    "text": "bg-none"
  }

  return (
    <div
      role="status"
      aria-label=""
      className={(hasVariant[variant], className)}
      {...props}
    >
      {children}
    </div>
  )
}

export default Badge
