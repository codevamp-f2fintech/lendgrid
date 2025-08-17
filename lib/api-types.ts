export interface ApiResponse<T = any> {
  success: boolean
  data: T
  page?: number
  count?: number
  error?: string
}

export interface User {
  id: string
  email: string
  name: string
  role: 'super_admin' | 'aggregator_admin' | 'lender_admin'
  company?: string
  orgId?: string
  createdAt: string
  updatedAt: string
}

export interface LoanApplication {
  id: string
  lenderName: string
  loanType: string
  disbursedAmount: number
  disbursedDate: string
  commissionPercent: number
  calculatedCommission: number
  payoutStatus: 'Pending' | 'Paid' | 'Disputed'
  payoutDate?: string
  aggregatorId: string
  lenderId: string
}

export interface Commission {
  id: string
  applicationId: string
  amount: number
  percentage: number
  status: 'Pending' | 'Paid' | 'Disputed'
  paidDate?: string
  aggregatorId: string
  lenderId: string
}

export interface LenderProduct {
  id: string
  name: string
  type: string
  interestRate: number
  commissionPercent: number
  eligibility: string[]
  requiredDocs: string[]
  lenderId: string
  isActive: boolean
}

export interface Payout {
  id: string
  amount: number
  status: 'Pending' | 'Approved' | 'Rejected'
  requestDate: string
  approvalDate?: string
  utrNumber?: string
  comments?: string
  aggregatorId: string
  lenderId: string
}
