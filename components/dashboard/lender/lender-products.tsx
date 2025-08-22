"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Plus,
  Search,
  Filter,
  TrendingUp,
  Users,
  DollarSign,
  FileText,
  Edit,
  Eye,
  MoreHorizontal,
  Percent,
  Calendar,
  CreditCard,
  Target,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CardSkeleton } from "@/components/ui/loading-skeleton"

const mockProducts = [
  {
    id: "1",
    name: "Personal Loan Premium",
    type: "Personal Loan",
    interestRate: 12.5,
    commissionPercent: 2.5,
    minAmount: 50000,
    maxAmount: 1000000,
    tenure: "12-60 months",
    applications: 245,
    approvalRate: 78,
    totalDisbursed: 12500000,
    isActive: true,
    eligibility: ["Salaried", "Age 21-60", "Min Income 25k"],
    requiredDocs: ["PAN", "Aadhaar", "Salary Slips", "Bank Statements"],
  },
  {
    id: "2",
    name: "Business Growth Loan",
    type: "Business Loan",
    interestRate: 15.0,
    commissionPercent: 3.0,
    minAmount: 100000,
    maxAmount: 5000000,
    tenure: "12-84 months",
    applications: 89,
    approvalRate: 65,
    totalDisbursed: 8900000,
    isActive: true,
    eligibility: ["Business Owner", "Age 25-65", "Min Turnover 10L"],
    requiredDocs: ["PAN", "GST Certificate", "ITR", "Bank Statements"],
  },
  {
    id: "3",
    name: "Home Loan Express",
    type: "Home Loan",
    interestRate: 8.5,
    commissionPercent: 1.5,
    minAmount: 500000,
    maxAmount: 10000000,
    tenure: "60-360 months",
    applications: 156,
    approvalRate: 82,
    totalDisbursed: 25600000,
    isActive: true,
    eligibility: ["Salaried/Self-employed", "Age 21-65", "Min Income 40k"],
    requiredDocs: ["PAN", "Aadhaar", "Income Proof", "Property Papers"],
  },
  {
    id: "4",
    name: "Vehicle Loan Fast",
    type: "Vehicle Loan",
    interestRate: 10.5,
    commissionPercent: 2.0,
    minAmount: 100000,
    maxAmount: 2000000,
    tenure: "12-84 months",
    applications: 198,
    approvalRate: 85,
    totalDisbursed: 15800000,
    isActive: false,
    eligibility: ["Salaried/Self-employed", "Age 21-65", "Min Income 20k"],
    requiredDocs: ["PAN", "Aadhaar", "Income Proof", "Vehicle Invoice"],
  },
]

export function LenderProducts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [cardsLoading, setCardsLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setCardsLoading(false)
    }, 2000)
    return () => clearTimeout(t)
  }, [])

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && product.isActive) ||
      (filterStatus === "inactive" && !product.isActive)
    return matchesSearch && matchesFilter
  })

  const totalProducts = mockProducts.length
  const activeProducts = mockProducts.filter((p) => p.isActive).length
  const totalApplications = mockProducts.reduce((sum, p) => sum + p.applications, 0)
  const avgApprovalRate = mockProducts.reduce((sum, p) => sum + p.approvalRate, 0) / mockProducts.length

  return (
    <DashboardLayout userRole="lender">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Product Management</h1>
            <p className="text-gray-400 mt-1">Manage your loan products and track performance</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-gold to-blue hover:from-gold/80 hover:to-blue/80 text-dark">
                <Plus className="w-4 h-4 mr-2" />
                Create Product
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Product</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Add a new loan product to your portfolio
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input id="productName" placeholder="Enter product name" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productType">Product Type</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="personal">Personal Loan</SelectItem>
                      <SelectItem value="business">Business Loan</SelectItem>
                      <SelectItem value="home">Home Loan</SelectItem>
                      <SelectItem value="vehicle">Vehicle Loan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input id="interestRate" type="number" placeholder="12.5" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commission">Commission (%)</Label>
                  <Input id="commission" type="number" placeholder="2.5" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minAmount">Min Amount (₹)</Label>
                  <Input id="minAmount" type="number" placeholder="50000" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxAmount">Max Amount (₹)</Label>
                  <Input id="maxAmount" type="number" placeholder="1000000" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="eligibility">Eligibility Criteria</Label>
                  <Textarea
                    id="eligibility"
                    placeholder="Enter eligibility criteria..."
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <Switch id="isActive" />
                  <Label htmlFor="isActive">Active Product</Label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-gold to-blue text-dark">Create Product</Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cardsLoading ? (
            <CardSkeleton headerLines={2} bodyHeight={16} />
          ) : (
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Products</p>
                    <p className="text-2xl font-bold text-white">{totalProducts}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue" />
                </div>
              </CardContent>
            </Card>
          )}
          {cardsLoading ? (
            <CardSkeleton headerLines={2} bodyHeight={16} />
          ) : (
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Products</p>
                    <p className="text-2xl font-bold text-white">{activeProducts}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          )}
          {cardsLoading ? (
            <CardSkeleton headerLines={2} bodyHeight={16} />
          ) : (
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Applications</p>
                    <p className="text-2xl font-bold text-white">{totalApplications}</p>
                  </div>
                  <Users className="w-8 h-8 text-gold" />
                </div>
              </CardContent>
            </Card>
          )}

          {cardsLoading ? (
            <CardSkeleton headerLines={2} bodyHeight={16} />
          ) : (
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Avg Approval Rate</p>
                    <p className="text-2xl font-bold text-white">{avgApprovalRate.toFixed(1)}%</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue" />
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900/50 border-gray-800 text-white"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-48 bg-gray-900/50 border-gray-800 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-800">
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="inactive">Inactive Only</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -4 }}
              className="group"
            >
              {cardsLoading ? (
                <CardSkeleton bodyHeight={254} />
              ) : (
                <Card className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-gray-700/50 hover:border-gold/30 transition-all duration-300 overflow-hidden group-hover:shadow-2xl group-hover:shadow-gold/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${product.isActive ? "bg-green-400 shadow-lg shadow-green-400/50" : "bg-gray-500"} animate-pulse`}
                          />
                          <CardTitle className="text-xl font-bold text-white group-hover:text-gold transition-colors duration-300">
                            {product.name}
                          </CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={product.isActive ? "default" : "secondary"}
                            className={`${product.isActive
                              ? "bg-gradient-to-r from-green-500/20 to-green-400/20 text-green-400 border-green-400/30"
                              : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                              } font-medium`}
                          >
                            {product.isActive ? "Active" : "Inactive"}
                          </Badge>
                          <CardDescription className="text-gray-300 font-medium">{product.type}</CardDescription>
                        </div>
                      </div>
                      {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-gold hover:bg-gold/10 transition-colors"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800 border-gray-700">
                          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Product
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu> */}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6 relative z-10">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue/10 to-blue/5 rounded-lg p-4 border border-blue/20 group-hover:border-blue/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Percent className="w-4 h-4 text-blue" />
                          <p className="text-gray-400 text-sm font-medium">Interest Rate</p>
                        </div>
                        <p className="text-2xl font-bold text-white">{product.interestRate}%</p>
                      </div>

                      <div className="bg-gradient-to-br from-gold/10 to-gold/5 rounded-lg p-4 border border-gold/20 group-hover:border-gold/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-gold" />
                          <p className="text-gray-400 text-sm font-medium">Commission</p>
                        </div>
                        <p className="text-2xl font-bold text-white">{product.commissionPercent}%</p>
                      </div>

                      <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg p-4 border border-green-500/20 group-hover:border-green-500/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="w-4 h-4 text-green-400" />
                          <p className="text-gray-400 text-sm font-medium">Loan Range</p>
                        </div>
                        <p className="text-lg font-bold text-white">
                          ₹{(product.minAmount / 100000).toFixed(1)}L - ₹{(product.maxAmount / 100000).toFixed(1)}L
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-lg p-4 border border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-purple-400" />
                          <p className="text-gray-400 text-sm font-medium">Tenure</p>
                        </div>
                        <p className="text-lg font-bold text-white">{product.tenure}</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                      <h4 className="text-gray-300 font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-gold" />
                        Performance Metrics
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="bg-blue/10 rounded-lg p-3 mb-2">
                            <Users className="w-5 h-5 text-blue mx-auto mb-1" />
                            <p className="text-gray-400 text-xs font-medium">Applications</p>
                            <p className="text-xl font-bold text-white">{product.applications}</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="bg-green-500/10 rounded-lg p-3 mb-2">
                            <Target className="w-5 h-5 text-green-400 mx-auto mb-1" />
                            <p className="text-gray-400 text-xs font-medium">Approval Rate</p>
                            <p className="text-xl font-bold text-white">{product.approvalRate}%</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="bg-gold/10 rounded-lg p-3 mb-2">
                            <DollarSign className="w-5 h-5 text-gold mx-auto mb-1" />
                            <p className="text-gray-400 text-xs font-medium">Disbursed</p>
                            <p className="text-xl font-bold text-white">
                              ₹{(product.totalDisbursed / 10000000).toFixed(1)}Cr
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-blue/10 hover:border-blue/50 hover:text-blue transition-all bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-gold to-blue hover:from-gold/80 hover:to-blue/80 text-dark font-medium transition-all"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Product
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
