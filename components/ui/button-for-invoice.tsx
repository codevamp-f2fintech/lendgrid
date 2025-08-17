"use client"

import { Button } from "./button"
import { FileText } from "lucide-react"

export function InvoiceButton({
    onGenerate,
    disabled,
    label = "Generate Invoice",
}: {
    onGenerate: () => Promise<void> | void
    disabled?: boolean
    label?: string
}) {
    return (
        <Button onClick={() => onGenerate()} disabled={disabled} variant="outline" className="border-gray-600 text-white">
            <FileText className="w-4 h-4 mr-2" />
            {label}
        </Button>
    )
}
