"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Building2, Plus, Search, Filter, Edit, Trash2, CheckCircle, XCircle, Eye, AlertCircle, TrendingUp, Users, CreditCard } from 'lucide-react'
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { TablePagination } from "@/components/ui/pagination"
import { CardSkeleton, TableSkeleton } from "@/components/ui/loading-skeleton"

const mockData = {
  metrics: {
    totalLenders: 16,
    activeLenders: 14,
    pendingApprovals: 3,
    avgCommissionRate: 4.2
  },
  lenders: [
    {
      id: 'LEN001',
      name: 'HDFC Bank',
      type: 'Bank',
      status: 'Active',
      joinDate: '2023-01-15',
      totalVolume: 5200000,
      productsCount: 8,
      avgCommission: 3.8,
      contactPerson: 'Rajesh Kumar',
      email: 'rajesh.kumar@hdfcbank.com',
      phone: '+91 98765 43210',
      address: 'Mumbai, Maharashtra',
      kycStatus: 'Verified',
      lastActivity: '2025-01-20'
    },
    {
      id: 'LEN002',
      name: 'ICICI Bank',
      type: 'Bank',
      status: 'Active',
      joinDate: '2023-02-20',
      totalVolume: 4100000,
      productsCount: 6,
      avgCommission: 3.5,
      contactPerson: 'Priya Sharma',
      email: 'priya.sharma@icicibank.com',
      phone: '+91 98765 43211',
      address: 'Bangalore, Karnataka',
      kycStatus: 'Verified',
      lastActivity: '2025-01-19'
    },
    {
      id: 'LEN003',
      name: 'Bajaj Finance',
      type: 'NBFC',
      status: 'Active',
      joinDate: '2023-03-10',
      totalVolume: 3800000,
      productsCount: 5,
      avgCommission: 4.5,
      contactPerson: 'Amit Patel',
      email: 'amit.patel@bajajfinance.com',
      phone: '+91 98765 43212',
      address: 'Pune, Maharashtra',
      kycStatus: 'Verified',
      lastActivity: '2025-01-18'
    },
    {
      id: 'LEN004',
      name: 'ABC Finance Ltd',
      type: 'NBFC',
      status: 'Pending',
      joinDate: '2025-01-15',
      totalVolume: 0,
      productsCount: 0,
      avgCommission: 0,
      contactPerson: 'Suresh Gupta',
      email: 'suresh.gupta@abcfinance.com',
      phone: '+91 98765 43213',
      address: 'Delhi, Delhi',
      kycStatus: 'Under Review',
      lastActivity: '2025-01-15'
    },
    {
      id: 'LEN005',
      name: 'XYZ Bank',
      type: 'Bank',
      status: 'Inactive',
      joinDate: '2023-08-05',
      totalVolume: 1200000,
      productsCount: 2,
      avgCommission: 3.2,
      contactPerson: 'Neha Singh',
      email: 'neha.singh@xyzbank.com',
      phone: '+91 98765 43214',
      address: 'Chennai, Tamil Nadu',
      kycStatus: 'Verified',
      lastActivity: '2023-12-15'
    }
  ]
}

export function SuperAdminLenders() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterType, setFilterType] = useState('')
  const [selectedLender, setSelectedLender] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [isTableLoading, setIsTableLoading] = useState(true)
  const [cardsLoading, setCardsLoading] = useState(true)
  const tableTopRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const t = setTimeout(() => {
      setIsTableLoading(false)
      setCardsLoading(false)
    }, 2000)
    return () => clearTimeout(t)
  }, [])

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1)
  }, [searchTerm, filterStatus, filterType])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400'
      case 'Pending': return 'bg-orange-500/20 text-orange-400'
      case 'Inactive': return 'bg-gray-500/20 text-gray-400'
      case 'Rejected': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-500/20 text-green-400'
      case 'Under Review': return 'bg-orange-500/20 text-orange-400'
      case 'Rejected': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const filteredLenders = useMemo(() => {
    return mockData.lenders.filter((lender) => {
      const matchesSearch =
        lender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lender.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = !filterStatus || filterStatus === "all" || lender.status === filterStatus
      const matchesType = !filterType || filterType === "all" || lender.type === filterType
      return matchesSearch && matchesStatus && matchesType
    })
  }, [searchTerm, filterStatus, filterType])

  const total = filteredLenders.length
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredLenders.slice(start, start + pageSize)
  }, [filteredLenders, page, pageSize])

  // For server-side pagination later
  const handlePageChange = async (newPage: number) => {
    setIsTableLoading(true)
    // Replace this with API call later. Keep skeleton visible during fetch.
    await new Promise((r) => setTimeout(r, 350))
    setPage(newPage)
    setIsTableLoading(false)
    tableTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handlePageSizeChange = async (size: number) => {
    setIsTableLoading(true)
    await new Promise((r) => setTimeout(r, 350))
    setPageSize(size)
    setPage(1)
    setIsTableLoading(false)
    tableTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const MetricCard = ({ title, value, icon: Icon, color, subtitle }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gray-800/50 border-gray-700 hover:border-gold/50 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{title}</p>
              <p className="text-2xl font-bold text-white mt-2">{value}</p>
              {subtitle && (
                <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
              )}
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <DashboardLayout userRole="super_admin">
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Lender Management</h1>
            <p className="text-gray-400 mt-1">Manage and monitor all registered lenders</p>
          </div>
          <Button className="bg-gradient-to-r from-gold to-blue text-dark">
            <Plus className="w-4 h-4 mr-2" />
            Add New Lender
          </Button>
        </motion.div>

        {/* Metrics Cards */}
        {cardsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardSkeleton headerLines={2} bodyHeight={20} />
            <CardSkeleton headerLines={2} bodyHeight={20} />
            <CardSkeleton headerLines={2} bodyHeight={20} />
            <CardSkeleton headerLines={2} bodyHeight={20} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Lenders"
              value={mockData.metrics.totalLenders}
              icon={Building2}
              color="bg-blue/20 text-blue"
              subtitle="Registered partners"
            />
            <MetricCard
              title="Active Lenders"
              value={mockData.metrics.activeLenders}
              icon={CheckCircle}
              color="bg-green-500/20 text-green-400"
              subtitle="Currently operational"
            />
            <MetricCard
              title="Pending Approvals"
              value={mockData.metrics.pendingApprovals}
              icon={AlertCircle}
              color="bg-orange-500/20 text-orange-400"
              subtitle="Awaiting review"
            />
            <MetricCard
              title="Avg Commission Rate"
              value={`${mockData.metrics.avgCommissionRate}%`}
              icon={TrendingUp}
              color="bg-gold/20 text-gold"
              subtitle="Platform average"
            />
          </div>
        )}

        {/* Lenders Table */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">All Lenders</CardTitle>
                  <CardDescription className="text-gray-400">
                    Complete list of registered lenders and their status
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search lenders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-900 border-gray-600 text-white w-64"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32 bg-gray-900 border-gray-600 text-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32 bg-gray-900 border-gray-600 text-white">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Bank">Bank</SelectItem>
                      <SelectItem value="NBFC">NBFC</SelectItem>
                      <SelectItem value="Fintech">Fintech</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div ref={tableTopRef} />
              <div className="overflow-x-auto">
                {isTableLoading ? (
                  <TableSkeleton columns={9} rows={pageSize} />
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="text-gray-300">Lender</TableHead>
                        <TableHead className="text-gray-300">Type</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">KYC Status</TableHead>
                        <TableHead className="text-gray-300">Total Volume</TableHead>
                        <TableHead className="text-gray-300">Products</TableHead>
                        <TableHead className="text-gray-300">Avg Commission</TableHead>
                        <TableHead className="text-gray-300">Join Date</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginated.map((lender, index) => (
                        <motion.tr
                          key={lender.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border-gray-700 hover:bg-gray-800/50"
                        >
                          <TableCell>
                            <div>
                              <p className="text-white font-medium">{lender.name}</p>
                              <p className="text-sm text-gray-400">{lender.contactPerson}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-gray-600 text-gray-300">
                              {lender.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(lender.status)}>
                              {lender.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getKycStatusColor(lender.kycStatus)}>
                              {lender.kycStatus}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-white">
                            {lender.totalVolume > 0 ? formatCurrency(lender.totalVolume) : '-'}
                          </TableCell>
                          <TableCell className="text-white">{lender.productsCount}</TableCell>
                          <TableCell className="text-gold">
                            {lender.avgCommission > 0 ? `${lender.avgCommission}%` : '-'}
                          </TableCell>
                          <TableCell className="text-gray-300">{lender.joinDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedLender(lender)
                                  setIsViewDialogOpen(true)
                                }}
                                className="text-blue hover:text-white hover:bg-gray-700"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gold hover:text-white hover:bg-gray-700">
                                <Edit className="w-4 h-4" />
                              </Button>
                              {lender.status === 'Pending' && (
                                <>
                                  <Button variant="ghost" size="sm" className="text-green-400 hover:text-white hover:bg-gray-700">
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-white hover:bg-gray-700">
                                    <XCircle className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>

              <TablePagination
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                className="mt-4"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* View Lender Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Lender Details</DialogTitle>
              <DialogDescription className="text-gray-400">
                Complete information about the selected lender
              </DialogDescription>
            </DialogHeader>
            {selectedLender && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300">Lender Name</Label>
                    <p className="text-white font-semibold mt-1">{selectedLender.name}</p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Type</Label>
                    <p className="text-white font-semibold mt-1">{selectedLender.type}</p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Status</Label>
                    <Badge className={`${getStatusColor(selectedLender.status)} mt-1`}>
                      {selectedLender.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-gray-300">KYC Status</Label>
                    <Badge className={`${getKycStatusColor(selectedLender.kycStatus)} mt-1`}>
                      {selectedLender.kycStatus}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300">Contact Person</Label>
                    <p className="text-white font-semibold mt-1">{selectedLender.contactPerson}</p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Email</Label>
                    <p className="text-white font-semibold mt-1">{selectedLender.email}</p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Phone</Label>
                    <p className="text-white font-semibold mt-1">{selectedLender.phone}</p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Address</Label>
                    <p className="text-white font-semibold mt-1">{selectedLender.address}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <Label className="text-gray-300">Total Volume</Label>
                    <p className="text-white font-semibold mt-1">
                      {selectedLender.totalVolume > 0 ? formatCurrency(selectedLender.totalVolume) : 'No transactions yet'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Products Count</Label>
                    <p className="text-white font-semibold mt-1">{selectedLender.productsCount}</p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Avg Commission</Label>
                    <p className="text-white font-semibold mt-1">
                      {selectedLender.avgCommission > 0 ? `${selectedLender.avgCommission}%` : 'Not applicable'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300">Join Date</Label>
                    <p className="text-white font-semibold mt-1">{selectedLender.joinDate}</p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Last Activity</Label>
                    <p className="text-white font-semibold mt-1">{selectedLender.lastActivity}</p>
                  </div>
                </div>

                {selectedLender.status === 'Pending' && (
                  <div className="flex items-center space-x-4 pt-4 border-t border-gray-700">
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Lender
                    </Button>
                    <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white">
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject Application
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
