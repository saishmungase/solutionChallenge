import type React from "react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from "recharts"

interface ChartProps {
  data: any[]
  children: React.ReactNode
}

export function Chart({ data, children }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  )
}

interface ChartContainerProps {
  children: React.ReactNode
}

export function ChartContainer({ children }: ChartContainerProps) {
  // Use LineChart as default container if no specific chart is provided
  return <LineChart data={[]}>{children}</LineChart>
}

interface ChartGridProps {
  x?: { strokeDasharray: string }
  y?: { strokeDasharray: string }
}

export function ChartGrid({ x, y }: ChartGridProps) {
  return <CartesianGrid strokeDasharray={`${x?.strokeDasharray || ""} ${y?.strokeDasharray || ""}`} stroke="#333" />
}

interface ChartLineProps {
  dataKey: string
  stroke: string
  strokeWidth: number
  dot?: any
}

export function ChartLine({ dataKey, stroke, strokeWidth, dot }: ChartLineProps) {
  return <Line type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={strokeWidth} dot={dot} />
}

interface ChartBarProps {
  dataKey: string
  fill: string
  radius: number | number[]
}

export function ChartBar({ dataKey, fill, radius }: ChartBarProps) {
  return <Bar dataKey={dataKey} fill={fill} radius={radius} />
}

export function ChartXAxis() {
  return <XAxis dataKey="date" stroke="#888" />
}

export function ChartYAxis({ tickCount, tickFormat }: { tickCount?: number; tickFormat?: (value: any) => string }) {
  return <YAxis tickCount={tickCount} tickFormatter={tickFormat} stroke="#888" />
}

interface ChartTooltipProps {
  children: React.ReactNode
}

export function ChartTooltip({ children }: ChartTooltipProps) {
  return <Tooltip contentStyle={{ backgroundColor: "#333", border: "none", color: "#fff" }} />
}

interface ChartTooltipContentProps {
  className?: string
}

export function ChartTooltipContent({ className }: ChartTooltipContentProps) {
  return <div className={className}></div>
}

