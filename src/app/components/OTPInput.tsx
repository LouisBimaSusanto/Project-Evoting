"use client"

import { useState, useRef } from "react"

type Props = {
    length?: number
    onChange: (otp: string) => void
}

export default function OTPInput({ length = 6, onChange }: Props) {
    const [values, setValues] = useState<string[]>(Array(length).fill(""))
    const inputs = useRef<(HTMLInputElement | null)[]>([])

    function handleChange(index: number, value: string) {
        if (!/^[0-9]?$/.test(value)) return

        const newValues = [...values]
        newValues[index] = value
        setValues(newValues)

        onChange(newValues.join(""))

        //Auto focus next
        if (value && index < length -1) {
            inputs.current[index + 1]?.focus()
        }
    }

    function handleKeyDown(index: number, e:React.KeyboardEvent){
        if (e.key === "Backspace" && !values[index] && index>0) {
            inputs.current[index -1]?.focus()
        }
    }
    
    return (
        <div className="flex justify-center gap-2 mt-4">
        {values.map((val, i) => (
            <input
            key={i}
            ref={(el) => { inputs.current[i] = el }} 
            value={val}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            maxLength={1}
            className="w-10 h-12 border text-center text-xl rounded"
            />
        ))}
        </div>
    )
}