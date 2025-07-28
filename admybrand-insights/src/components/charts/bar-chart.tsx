"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency, formatNumber } from "@/lib/utils"

interface ChartDataItem {
  [key: string]: string | number
}

interface BarChartComponentProps {
  title: string
  description?: string
  data: ChartDataItem[]
  dataKey: string
  xAxisKey: string
  color?: string
  valueType?: "currency" | "number" | "percentage"
  className?: string
}

export function BarChartComponent({
  title,
  description,
  data,
  dataKey,
  xAxisKey,
  color = "#3b82f6",
  valueType = "number",
  className
}: BarChartComponentProps) {
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

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; color?: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-md">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Category
              </span>
              <span className="font-bold text-muted-foreground">
                {label}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                {title}
              </span>
              <span className="font-bold" style={{ color }}>
                {formatValue(payload[0].value)}
              </span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey={xAxisKey}
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
              tickFormatter={formatValue}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey={dataKey}
              fill={color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}