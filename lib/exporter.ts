"use client"

import { toPng } from "html-to-image"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"

export type TimeRange = "1m" | "3m" | "6m" | "12m"
export type ExportFormat = "pdf" | "xlsx"

// Generic helpers
export function monthsForRange(range: TimeRange) {
    switch (range) {
        case "1m":
            return 1
        case "3m":
            return 3
        case "6m":
            return 6
        case "12m":
        default:
            return 12
    }
}

export function filterByTimeRange<T extends { month?: string }>(data: T[], range: TimeRange) {
    const n = monthsForRange(range)
    if (!Array.isArray(data)) return []
    if (data.length <= n) return data
    return data.slice(-n)
}

export function formatINR(amount: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
    }).format(amount)
}

// Revenue report export
export async function exportRevenueReport(options: {
    format: ExportFormat
    fileName?: string
    timeRange: TimeRange
    selectedMetric?: "revenue" | "transactions" | "avgTicket"
    chartElement?: HTMLElement | null
    metrics: {
        totalRevenue: number
        monthlyGrowth: number
        avgCommissionRate: number
        topLenderRevenue: number
    }
    revenueData: Array<{ month: string; revenue: number; transactions: number; avgTicket: number }>
    lenderRevenue: Array<{ name: string; revenue: number; percentage: number; growth: number }>
    recentTransactions: Array<{
        id: string
        lender: string
        aggregator: string
        amount: number
        commission: number
        date: string
        status: string
    }>
}) {
    const {
        format,
        fileName = "revenue-report",
        timeRange,
        chartElement,
        selectedMetric = "revenue",
        metrics,
        revenueData,
        lenderRevenue,
        recentTransactions,
    } = options

    const filteredRevenue = filterByTimeRange(revenueData, timeRange)

    if (format === "xlsx") {
        const wb = XLSX.utils.book_new()

        // Summary sheet
        const summaryRows = [
            { Metric: "Time Range", Value: timeRange },
            { Metric: "Total Revenue", Value: formatINR(metrics.totalRevenue) },
            { Metric: "Monthly Growth", Value: `${metrics.monthlyGrowth}%` },
            { Metric: "Avg Commission Rate", Value: `${metrics.avgCommissionRate}%` },
            { Metric: "Top Lender Revenue", Value: formatINR(metrics.topLenderRevenue) },
            { Metric: "Selected Metric", Value: selectedMetric },
        ]
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(summaryRows), "Summary")

        // Revenue data
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(filteredRevenue), "RevenueData")

        // Lender revenue
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(lenderRevenue), "LenderRevenue")

        // Transactions
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(recentTransactions), "Transactions")

        XLSX.writeFile(wb, `${fileName}-${timeRange}.xlsx`)
        return
    }

    // PDF
    const doc = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
    })

    const margin = 12
    let cursorY = margin

    // Title
    doc.setFontSize(16)
    doc.text("Platform Revenue Report", margin, cursorY)
    cursorY += 8

    doc.setFontSize(11)
    doc.text(`Time Range: ${timeRange}`, margin, cursorY)
    cursorY += 6
    doc.text(`Generated: ${new Date().toLocaleString()}`, margin, cursorY)
    cursorY += 8

    // Metrics block
    const metricLines = [
        `Total Revenue: ${formatINR(metrics.totalRevenue)}`,
        `Monthly Growth: ${metrics.monthlyGrowth}%`,
        `Avg Commission: ${metrics.avgCommissionRate}%`,
        `Top Lender Revenue: ${formatINR(metrics.topLenderRevenue)}`,
        `Selected Metric: ${selectedMetric}`,
    ]
    metricLines.forEach((line) => {
        doc.text(line, margin, cursorY)
        cursorY += 6
    })
    cursorY += 2

    // Chart image (optional)
    if (chartElement) {
        try {
            const pngDataUrl = await toPng(chartElement, {
                cacheBust: true,
                pixelRatio: 2,
            })
            const imgWidth = 186 // A4 width (210) - 2*12 margin
            // Keep aspect ratio using fixed height
            const imgHeight = 90
            doc.addImage(pngDataUrl, "PNG", margin, cursorY, imgWidth, imgHeight)
            cursorY += imgHeight + 6
        } catch {
            // ignore chart capture failure
        }
    }

    // Revenue table
    autoTable(doc, {
        startY: cursorY,
        head: [["Month", "Revenue", "Transactions", "Avg Ticket"]],
        body: filteredRevenue.map((d) => [d.month, formatINR(d.revenue), String(d.transactions), String(d.avgTicket)]),
        styles: { fontSize: 9 },
        theme: "grid",
        headStyles: { fillColor: [33, 37, 41] },
        margin: { left: margin, right: margin },
    })

    // After first table, next Y
    // @ts-expect-error types not updated
    cursorY = (doc as any).lastAutoTable.finalY + 6

    // Lender Revenue
    autoTable(doc, {
        startY: cursorY,
        head: [["Lender", "Revenue", "Share %", "Growth %"]],
        body: lenderRevenue.map((d) => [d.name, formatINR(d.revenue), `${d.percentage}%`, `${d.growth}%`]),
        styles: { fontSize: 9 },
        theme: "grid",
        headStyles: { fillColor: [33, 37, 41] },
        margin: { left: margin, right: margin },
    })

    // Next Y
    // @ts-expect-error types not updated
    cursorY = (doc as any).lastAutoTable.finalY + 6

    // Transactions
    autoTable(doc, {
        startY: cursorY,
        head: [["Txn ID", "Lender → Aggregator", "Amount", "Commission", "Date", "Status"]],
        body: recentTransactions.map((t) => [
            t.id,
            `${t.lender} → ${t.aggregator}`,
            formatINR(t.amount),
            formatINR(t.commission),
            t.date,
            t.status,
        ]),
        styles: { fontSize: 9 },
        theme: "grid",
        headStyles: { fillColor: [33, 37, 41] },
        margin: { left: margin, right: margin },
    })

    doc.save(`${fileName}-${timeRange}.pdf`)
}

// Invoice generator (PDF)
export type InvoiceItem = {
    description: string
    quantity: number
    unitPrice: number
    amount?: number // computed if not provided
}

export type Invoice = {
    invoiceNo: string
    date: string // ISO or display string
    dueDate?: string
    seller: { name: string; address?: string; gstin?: string; email?: string; phone?: string }
    buyer: { name: string; address?: string; gstin?: string; email?: string; phone?: string }
    items: InvoiceItem[]
    taxRatePct?: number
    notes?: string
    currency?: "INR" | "USD" | string
}

export function calculateInvoiceTotals(invoice: Invoice) {
    const subTotal = invoice.items.reduce((sum, it) => sum + (it.amount ?? it.quantity * it.unitPrice), 0)
    const tax = invoice.taxRatePct ? (subTotal * invoice.taxRatePct) / 100 : 0
    const total = subTotal + tax
    return { subTotal, tax, total }
}

export async function generateInvoicePDF(invoice: Invoice, fileName?: string) {
    const doc = new jsPDF({ unit: "mm", format: "a4" })
    const margin = 14
    let y = margin

    doc.setFontSize(18)
    doc.text("INVOICE", margin, y)
    y += 8

    doc.setFontSize(11)
    doc.text(`Invoice No: ${invoice.invoiceNo}`, margin, y)
    y += 6
    doc.text(`Date: ${invoice.date}`, margin, y)
    y += 6
    if (invoice.dueDate) {
        doc.text(`Due Date: ${invoice.dueDate}`, margin, y)
        y += 6
    }
    y += 2

    doc.setFontSize(12)
    doc.text("Seller", margin, y)
    doc.text("Buyer", 120, y)
    y += 6
    doc.setFontSize(10)
    doc.text(invoice.seller.name, margin, y)
    doc.text(invoice.buyer.name, 120, y)
    y += 5
    if (invoice.seller.address) doc.text(invoice.seller.address, margin, y, { maxWidth: 80 })
    if (invoice.buyer.address) doc.text(invoice.buyer.address, 120, y, { maxWidth: 80 })
    y += 10

    // Items table
    autoTable(doc, {
        startY: y,
        head: [["Description", "Qty", "Unit Price", "Amount"]],
        body: invoice.items.map((it) => {
            const amount = it.amount ?? it.quantity * it.unitPrice
            return [it.description, String(it.quantity), formatINR(it.unitPrice), formatINR(amount)]
        }),
        theme: "grid",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [33, 37, 41] },
        margin: { left: margin, right: margin },
    })

    // @ts-expect-error types not updated
    y = (doc as any).lastAutoTable.finalY + 6

    const { subTotal, tax, total } = calculateInvoiceTotals(invoice)

    doc.text(`Subtotal: ${formatINR(subTotal)}`, 150, y, { align: "right" })
    y += 6
    doc.text(`Tax ${invoice.taxRatePct ?? 0}%: ${formatINR(tax)}`, 150, y, { align: "right" })
    y += 6
    doc.setFontSize(12)
    doc.text(`Total: ${formatINR(total)}`, 150, y, { align: "right" })
    y += 10

    if (invoice.notes) {
        doc.setFontSize(10)
        doc.text("Notes:", margin, y)
        y += 5
        doc.text(invoice.notes, margin, y, { maxWidth: 180 })
    }

    doc.save(`${fileName ?? `invoice-${invoice.invoiceNo}`}.pdf`)
}
