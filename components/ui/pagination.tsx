"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

export type TablePaginationProps = {
  page: number
  pageSize: number
  total: number
  pageSizeOptions?: number[]
  onPageChange: (page: number) => void | Promise<void>
  onPageSizeChange?: (size: number) => void | Promise<void>
  className?: string
}

export function TablePagination({
  page,
  pageSize,
  total,
  pageSizeOptions = [5, 10, 20],
  onPageChange,
  onPageSizeChange,
  className,
}: TablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(total, page * pageSize)

  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-gray-700 pt-4 ${className || ""}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">Rows per page</span>
        <Select
          value={String(pageSize)}
          onValueChange={async (val) => {
            const size = Number(val)
            await onPageSizeChange?.(size)
            // Default behavior if consumer didn't update page
            await onPageChange(1)
          }}
        >
          <SelectTrigger className="w-[84px] bg-gray-900 border-gray-600 text-white">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((opt) => (
              <SelectItem key={opt} value={String(opt)}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-400 tabular-nums">
          {start}–{end} of {total}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 bg-transparent"
            disabled={page <= 1}
            onClick={() => onPageChange(Math.max(1, page - 1))}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 bg-transparent"
            disabled={page >= totalPages}
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
