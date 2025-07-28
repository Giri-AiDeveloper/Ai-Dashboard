import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

export function formatPercentage(num: number): string {
  return `${num.toFixed(1)}%`
}

export function generateMockData() {
  const now = new Date()
  const data = []
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      revenue: Math.floor(Math.random() * 50000) + 10000,
      users: Math.floor(Math.random() * 1000) + 200,
      conversions: Math.floor(Math.random() * 100) + 20,
      sessions: Math.floor(Math.random() * 2000) + 500,
      bounceRate: Math.random() * 30 + 20,
      pageViews: Math.floor(Math.random() * 5000) + 1000,
    })
  }
  
  return data
}

export const mockTableData = [
  {
    id: 1,
    campaign: "Summer Sale 2024",
    channel: "Google Ads",
    impressions: 125000,
    clicks: 3250,
    conversions: 145,
    revenue: 28500,
    ctr: 2.6,
    status: "Active"
  },
  {
    id: 2,
    campaign: "Black Friday Prep",
    channel: "Facebook Ads",
    impressions: 98000,
    clicks: 2100,
    conversions: 98,
    revenue: 19600,
    ctr: 2.1,
    status: "Active"
  },
  {
    id: 3,
    campaign: "Brand Awareness Q3",
    channel: "Instagram",
    impressions: 156000,
    clicks: 1890,
    conversions: 67,
    revenue: 13400,
    ctr: 1.2,
    status: "Paused"
  },
  {
    id: 4,
    campaign: "Retargeting Campaign",
    channel: "LinkedIn",
    impressions: 45000,
    clicks: 1350,
    conversions: 89,
    revenue: 17800,
    ctr: 3.0,
    status: "Active"
  },
  {
    id: 5,
    campaign: "Holiday Special",
    channel: "TikTok",
    impressions: 89000,
    clicks: 2670,
    conversions: 112,
    revenue: 22400,
    ctr: 3.0,
    status: "Active"
  }
]