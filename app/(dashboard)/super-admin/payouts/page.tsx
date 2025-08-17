import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { SuperAdminPayouts } from '@/components/dashboard/super-admin/super-admin-payouts'

export default function SuperAdminPayoutsPage() {
  return (
    <DashboardLayout userRole="super_admin">
      <SuperAdminPayouts />
    </DashboardLayout>
  )
}
