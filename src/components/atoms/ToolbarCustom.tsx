import React from "react"
import { IconButton } from "@mui/material"
import dynamic from "next/dynamic"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IToolbar {
  id: string
  className?: string
}

const ToolbarCustom = ({ id, className }: IToolbar) => (
  <div
    id={id}
    className={`absolute flex w-full justify-center gap-5 rounded !border-neutral-700 bg-neutral-780 !font-neue-machina ${className}`}
  >
    <div className="border-r border-neutral-700">
      <span className="ql-formats">
        <select
          className="ql-header"
          defaultValue="3"
        >
          <option value="1">Heading</option>
          <option value="2">Subheading</option>
          <option value="3">Normal</option>
        </select>
      </span>
      <span className="ql-formats">
        <IconButton className="ql-bold" />
        <IconButton className="ql-italic" />
        <IconButton className="ql-underline" />
      </span>
    </div>
    <div className="border-r border-neutral-700">
      <span className="ql-formats">
        <IconButton
          className="ql-align"
          value=""
        />
        <IconButton
          className="ql-align"
          value="center"
        />
        <IconButton
          className="ql-align"
          value="right"
        />
      </span>
      <span className="ql-formats">
        <IconButton
          className="ql-list"
          value="ordered"
        />
        <IconButton
          className="ql-list"
          value="bullet"
        />
        <IconButton className="ql-link" />
      </span>
    </div>
    <div className="flex w-full max-w-[80px] items-center justify-center">
      <span className="ql-formats !mr-0">
        <IconButton className="ql-undo">
          <Icomoon className="icon-Undo ql-fill" />
        </IconButton>
        <IconButton className="ql-redo">
          <Icomoon className="icon-Redo ql-fill" />
        </IconButton>
      </span>
    </div>
  </div>
)

export default ToolbarCustom
