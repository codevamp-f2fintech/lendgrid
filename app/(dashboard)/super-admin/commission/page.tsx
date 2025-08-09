import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { SuperAdminCommission } from '@/components/dashboard/super-admin/super-admin-commission'

export default function SuperAdminCommissionPage() {
  return (
    <DashboardLayout userRole="super_admin">
      <SuperAdminCommission />
    </DashboardLayout>
  )
}
