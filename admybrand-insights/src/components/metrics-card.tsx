"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency, formatNumber, formatPercentage, cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface MetricsCardProps {
  title: string
  value: number
  change: number
  changeType: "currency" | "number" | "percentage"
  valueType: "currency" | "number" | "percentage"
  icon?: React.ReactNode
  className?: string
}

export function MetricsCard({
  title,
  value,
  change,
  changeType,
  valueType,
  icon,
  className
}: MetricsCardProps) {
  const formatValue = (val: number) => {
    switch (valueType) {
      case "currency":
        return formatCurrency(val)
      case "percentage":
        return formatPercentage(val)
      default:
        return formatNumber(val)
    }
  }

  const formatChange = (val: number) => {
    const prefix = val > 0 ? "+" : ""
    switch (changeType) {
      case "currency":
        return `${prefix}${formatCurrency(val)}`
      case "percentage":
        return `${prefix}${formatPercentage(val)}`
      default:
        return `${prefix}${formatNumber(val)}`
    }
  }

  const getTrendIcon = () => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-muted-foreground" />
  }

  const getTrendColor = () => {
    if (change > 0) return "text-green-500"
    if (change < 0) return "text-red-500"
    return "text-muted-foreground"
  }

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-lg", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatValue(value)}</div>
        <div className="flex items-center space-x-1 text-xs">
          {getTrendIcon()}
          <span className={cn("font-medium", getTrendColor())}>
            {formatChange(change)}
          </span>
          <span className="text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}