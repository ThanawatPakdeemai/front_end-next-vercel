import ToolbarCustom, { formats } from "@components/atoms/ToolbarCustom"
import React, { useEffect, useState } from "react"
import "react-quill/dist/quill.snow.css"
import dynamic from "next/dynamic"
import { Typography } from "@mui/material"
import { StyledFormLabel } from "@feature/dropdown/components/molecules/DropdownListGameType"

const ReactQuill = dynamic(import("react-quill"), { ssr: false })

interface IProps {
  id: string
  value?: string
  placeholder?: string
  onChangeInput?: (_value: string) => void
  className?: string
  toolbarClassName?: string
  label?: string
}

type ToolbarHandlers = {
  redo: () => void
  undo: () => void
}

interface IModules {
  toolbar: {
    container: string
    handlers: ToolbarHandlers
  }
  history: {
    delay: number
    maxStack: number
    userOnly: boolean
  }
}

function redo(): void {
  // @ts-ignore
  this.quill.history.redo()
}

function undo(): void {
  // @ts-ignore
  this.quill.history.undo()
}

export const Editor = ({
  id,
  value,
  placeholder = "",
  onChangeInput,
  className,
  toolbarClassName,
  label
}: IProps) => {
  const [defaultValue, setDefaultValue] = useState<string>("")

  const modules: IModules = {
    toolbar: {
      container: `#${id}`,
      handlers: {
        redo,
        undo
      }
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    }
  }

  const handleChange = (_value: string) => {
    setDefaultValue(_value)
    if (_value && onChangeInput) onChangeInput(_value)
  }

  useEffect(() => {
    let load = false

    if (!load) {
      if (value) {
        setDefaultValue(value)
      }
    }

    return () => {
      load = true
    }
  }, [value])

  return (
    <div className="container">
      {label && (
        <Typography
          component="label"
          id={`${label}-label`}
          sx={StyledFormLabel}
        >
          {label}
        </Typography>
      )}
      <div className="editor relative rounded-lg border border-neutral-700 bg-neutral-800">
        <ToolbarCustom
          id={id}
          className={toolbarClassName}
        />
        <ReactQuill
          theme="snow"
          value={defaultValue}
          onChange={handleChange}
          placeholder={placeholder}
          modules={modules}
          formats={formats}
          className={`${className} pt-16 !text-neutral-500`}
        />
      </div>
    </div>
  )
}

export default Editor
