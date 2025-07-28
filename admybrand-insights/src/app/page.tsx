"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { MetricsCard } from "@/components/metrics-card"
import { LineChartComponent } from "@/components/charts/line-chart"
import { BarChartComponent } from "@/components/charts/bar-chart"
import { DonutChartComponent } from "@/components/charts/donut-chart"
import { DataTable } from "@/components/data-table"
import { MetricsCardSkeleton, ChartSkeleton, TableSkeleton } from "@/components/loading-skeleton"
import { generateMockData, mockTableData } from "@/lib/utils"
import { 
  DollarSign, 
  Users, 
  MousePointerClick, 
  TrendingUp,
  Eye,
  Clock,
  Target
} from "lucide-react"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [chartData, setChartData] = useState<Array<{
    date: string;
    revenue: number;
    users: number;
    conversions: number;
    sessions: number;
    bounceRate: number;
    pageViews: number;
  }>>([])
  const [realtimeData, setRealtimeData] = useState({
    revenue: 145750,
    users: 12543,
    conversions: 2.4,
    growth: 8.2
  })

  // Simulate loading and real-time updates
  useEffect(() => {
    const loadData = async () => {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      setChartData(generateMockData())
      setIsLoading(false)
    }

    loadData()

    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      setRealtimeData(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 1000) - 500,
        users: prev.users + Math.floor(Math.random() * 20) - 10,
        conversions: Math.max(0, prev.conversions + (Math.random() - 0.5) * 0.2),
        growth: prev.growth + (Math.random() - 0.5) * 0.5
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Prepare chart data
  const revenueChartData = chartData.map(item => ({
    date: item.date,
    revenue: item.revenue
  }))

  const usersChartData = chartData.map(item => ({
    date: item.date,
    users: item.users
  }))

  const channelData = [
    { name: "Google Ads", value: 35, revenue: 52500 },
    { name: "Facebook", value: 28, revenue: 42000 },
    { name: "Instagram", value: 20, revenue: 30000 },
    { name: "LinkedIn", value: 12, revenue: 18000 },
    { name: "TikTok", value: 5, revenue: 7500 }
  ]

  const deviceData = [
    { device: "Desktop", sessions: 8500 },
    { device: "Mobile", sessions: 12000 },
    { device: "Tablet", sessions: 3200 }
  ]

  const tableColumns = [
    { key: "campaign", label: "Campaign", sortable: true, type: "text" },
    { key: "channel", label: "Channel", sortable: true, type: "text" },
    { key: "impressions", label: "Impressions", sortable: true, type: "number" },
    { key: "clicks", label: "Clicks", sortable: true, type: "number" },
    { key: "conversions", label: "Conversions", sortable: true, type: "number" },
    { key: "revenue", label: "Revenue", sortable: true, type: "currency" },
    { key: "ctr", label: "CTR", sortable: true, type: "percentage" },
    { key: "status", label: "Status", sortable: true, type: "text" }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto p-6 space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome to your marketing analytics dashboard. Track your key metrics and campaign performance.
          </p>
        </div>

        {/* Key Metrics Cards */}
        <section id="overview" className="space-y-4">
          <h2 className="text-2xl font-semibold">Key Metrics</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <MetricsCardSkeleton key={i} />
              ))
            ) : (
              <>
                <MetricsCard
                  title="Total Revenue"
                  value={realtimeData.revenue}
                  change={12500}
                  changeType="currency"
                  valueType="currency"
                  icon={<DollarSign className="h-4 w-4" />}
                />
                <MetricsCard
                  title="Active Users"
                  value={realtimeData.users}
                  change={1250}
                  changeType="number"
                  valueType="number"
                  icon={<Users className="h-4 w-4" />}
                />
                <MetricsCard
                  title="Conversion Rate"
                  value={realtimeData.conversions}
                  change={0.3}
                  changeType="percentage"
                  valueType="percentage"
                  icon={<Target className="h-4 w-4" />}
                />
                <MetricsCard
                  title="Growth Rate"
                  value={realtimeData.growth}
                  change={1.2}
                  changeType="percentage"
                  valueType="percentage"
                  icon={<TrendingUp className="h-4 w-4" />}
                />
              </>
            )}
          </div>
        </section>

        {/* Charts Section */}
        <section id="analytics" className="space-y-4">
          <h2 className="text-2xl font-semibold">Analytics</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <ChartSkeleton key={i} />
              ))
            ) : (
              <>
                <LineChartComponent
                  title="Revenue Trend"
                  description="Daily revenue over the last 30 days"
                  data={revenueChartData}
                  dataKey="revenue"
                  xAxisKey="date"
                  color="#3b82f6"
                  valueType="currency"
                />
                <LineChartComponent
                  title="User Growth"
                  description="Daily active users over the last 30 days"
                  data={usersChartData}
                  dataKey="users"
                  xAxisKey="date"
                  color="#10b981"
                  valueType="number"
                />
                <BarChartComponent
                  title="Sessions by Device"
                  description="User sessions breakdown by device type"
                  data={deviceData}
                  dataKey="sessions"
                  xAxisKey="device"
                  color="#8b5cf6"
                  valueType="number"
                />
                <DonutChartComponent
                  title="Revenue by Channel"
                  description="Revenue distribution across marketing channels"
                  data={channelData}
                  dataKey="revenue"
                  nameKey="name"
                  valueType="currency"
                />
              </>
            )}
          </div>
        </section>

        {/* Data Table Section */}
        <section id="campaigns" className="space-y-4">
          <h2 className="text-2xl font-semibold">Campaign Performance</h2>
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <DataTable
              title="Active Campaigns"
              description="Detailed performance metrics for all active marketing campaigns"
              data={mockTableData}
              columns={tableColumns}
              pageSize={5}
            />
          )}
        </section>

        {/* Additional Metrics */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Additional Insights</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <MetricsCardSkeleton key={i} />
              ))
            ) : (
              <>
                <MetricsCard
                  title="Page Views"
                  value={89234}
                  change={5420}
                  changeType="number"
                  valueType="number"
                  icon={<Eye className="h-4 w-4" />}
                />
                <MetricsCard
                  title="Avg. Session Duration"
                  value={4.2}
                  change={0.3}
                  changeType="number"
                  valueType="number"
                  icon={<Clock className="h-4 w-4" />}
                />
                <MetricsCard
                  title="Click-through Rate"
                  value={3.8}
                  change={0.2}
                  changeType="percentage"
                  valueType="percentage"
                  icon={<MousePointerClick className="h-4 w-4" />}
                />
              </>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built with Next.js, Tailwind CSS, and Recharts. © 2024 ADmyBRAND Insights.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
