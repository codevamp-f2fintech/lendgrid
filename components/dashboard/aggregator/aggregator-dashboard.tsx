"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { TrendingUp, DollarSign, CreditCard, Building2, Download, Filter, Search, Bell, FileText, Calendar } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

const mockData = {
  metrics: {
    totalDisbursed: 12500000,
    totalCommission: 500000,
    pendingPayouts: 125000,
    activeLenders: 8
  },
  chartData: [
    { month: 'Jan', amount: 1200000 },
    { month: 'Feb', amount: 1800000 },
    { month: 'Mar', amount: 2200000 },
    { month: 'Apr', amount: 1900000 },
    { month: 'May', amount: 2500000 },
    { month: 'Jun', amount: 2800000 }
  ],
  applications: [
    {
      id: 'APP001',
      lenderName: 'HDFC Bank',
      loanType: 'Personal Loan',
      disbursedAmount: 500000,
      disbursedDate: '2025-01-15',
      commissionPercent: 4,
      calculatedCommission: 20000,
      payoutStatus: 'Paid',
      payoutDate: '2025-01-20'
    },
    {
      id: 'APP002',
      lenderName: 'ICICI Bank',
      loanType: 'Home Loan',
      disbursedAmount: 2500000,
      disbursedDate: '2025-01-18',
      commissionPercent: 3.5,
      calculatedCommission: 87500,
      payoutStatus: 'Pending',
      payoutDate: null
    },
    {
      id: 'APP003',
      lenderName: 'Bajaj Finance',
      loanType: 'Business Loan',
      disbursedAmount: 1000000,
      disbursedDate: '2025-01-20',
      commissionPercent: 4.5,
      calculatedCommission: 45000,
      payoutStatus: 'Paid',
      payoutDate: '2025-01-25'
    }
  ]
}

export function AggregatorDashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLender, setFilterLender] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const MetricCard = ({ title, value, icon: Icon, trend, color }: any) => (
    <Card className="bg-gray-800/50 border-gray-700 hover:border-gold/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white mt-2">{value}</p>
            {trend && (
              <p className="text-sm text-green-400 mt-1 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                {trend}
              </p>
            )}
          </div>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <DashboardLayout userRole="aggregator">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">Welcome back! Here's your performance overview.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-gray-600 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Last 30 days
            </Button>
            <Button className="bg-gradient-to-r from-gold to-blue text-dark">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Disbursed Amount"
            value={formatCurrency(mockData.metrics.totalDisbursed)}
            icon={DollarSign}
            trend="+12.5% from last month"
            color="bg-green-500/20 text-green-400"
          />
          <MetricCard
            title="Total Commission Earned"
            value={formatCurrency(mockData.metrics.totalCommission)}
            icon={TrendingUp}
            trend="+8.2% from last month"
            color="bg-gold/20 text-gold"
          />
          <MetricCard
            title="Pending Payouts"
            value={formatCurrency(mockData.metrics.pendingPayouts)}
            icon={CreditCard}
            color="bg-orange-500/20 text-orange-400"
          />
          <MetricCard
            title="Active Lender Products"
            value={mockData.metrics.activeLenders}
            icon={Building2}
            trend="+2 new this month"
            color="bg-blue/20 text-blue"
          />
        </div>

        {/* Chart */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Monthly Disbursal Trend</CardTitle>
            <CardDescription className="text-gray-400">
              Track your loan disbursal performance over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [formatCurrency(value as number), 'Amount']}
                  />
                  <Bar dataKey="amount" fill="url(#goldGradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#FFA500" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Disbursed Applications</CardTitle>
                <CardDescription className="text-gray-400">
                  Track all your loan applications and commission status
                </CardDescription>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-900 border-gray-600 text-white w-64"
                  />
                </div>
                <Select value={filterLender} onValueChange={setFilterLender}>
                  <SelectTrigger className="w-40 bg-gray-900 border-gray-600 text-white">
                    <SelectValue placeholder="All Lenders" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Lenders</SelectItem>
                    <SelectItem value="hdfc">HDFC Bank</SelectItem>
                    <SelectItem value="icici">ICICI Bank</SelectItem>
                    <SelectItem value="bajaj">Bajaj Finance</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32 bg-gray-900 border-gray-600 text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-300">App ID</TableHead>
                    <TableHead className="text-gray-300">Lender</TableHead>
                    <TableHead className="text-gray-300">Loan Type</TableHead>
                    <TableHead className="text-gray-300">Disbursed Amount</TableHead>
                    <TableHead className="text-gray-300">Commission %</TableHead>
                    <TableHead className="text-gray-300">Commission Amount</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Payout Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    [...Array(5)].map((_, i) => (
                      <TableRow key={i} className="border-gray-700">
                        <TableCell><Skeleton className="h-4 w-20 bg-gray-700" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24 bg-gray-700" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-28 bg-gray-700" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24 bg-gray-700" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-16 bg-gray-700" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-20 bg-gray-700" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-16 bg-gray-700" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-20 bg-gray-700" /></TableCell>
                      </TableRow>
                    ))
                  ) : (
                    mockData.applications.map((app) => (
                      <TableRow key={app.id} className="border-gray-700 hover:bg-gray-800/50">
                        <TableCell className="text-white font-medium">{app.id}</TableCell>
                        <TableCell className="text-white">{app.lenderName}</TableCell>
                        <TableCell className="text-gray-300">{app.loanType}</TableCell>
                        <TableCell className="text-white">{formatCurrency(app.disbursedAmount)}</TableCell>
                        <TableCell className="text-gold">{app.commissionPercent}%</TableCell>
                        <TableCell className="text-green-400">{formatCurrency(app.calculatedCommission)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={app.payoutStatus === 'Paid' ? 'default' : 'secondary'}
                            className={app.payoutStatus === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}
                          >
                            {app.payoutStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {app.payoutDate || 'Pending'}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
