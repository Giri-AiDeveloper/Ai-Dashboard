"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { formatCurrency, formatNumber } from "@/lib/utils"

interface ChartDataItem {
  [key: string]: string | number
}

interface DonutChartComponentProps {
  title: string
  description?: string
  data: ChartDataItem[]
  dataKey: string
  nameKey: string
  colors?: string[]
  valueType?: "currency" | "number" | "percentage"
  className?: string
}

const DEFAULT_COLORS = [
  "#3b82f6", // blue
  "#ef4444", // red
  "#10b981", // green
  "#f59e0b", // yellow
  "#8b5cf6", // purple
  "#06b6d4", // cyan
  "#f97316", // orange
  "#84cc16", // lime
]

export function DonutChartComponent({
  title,
  description,
  data,
  dataKey,
  nameKey,
  colors = DEFAULT_COLORS,
  valueType = "number",
  className
}: DonutChartComponentProps) {
  const formatValue = (value: number) => {
    switch (valueType) {
      case "currency":
        return formatCurrency(value)
      case "percentage":
        return `${value.toFixed(1)}%`
      default:
        return formatNumber(value)
    }
  }

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; name: string; color?: string }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="rounded-lg border bg-background p-2 shadow-md">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Category
              </span>
              <span className="font-bold text-muted-foreground">
                {data.name}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Value
              </span>
              <span className="font-bold" style={{ color: data.color }}>
                {formatValue(data.value)}
              </span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  const CustomLegend = ({ payload }: { payload?: Array<{ value: string; color: string }> }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {payload?.map((entry, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    )
  }

  const total = data.reduce((sum, item) => sum + item[dataKey], 0)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey={dataKey}
              nameKey={nameKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center mt-4">
          <div className="text-2xl font-bold">{formatValue(total)}</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </div>
      </CardContent>
    </Card>
  )
}