import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { SuperAdminAggregators } from '@/components/dashboard/super-admin/super-admin-aggregators'

export default function SuperAdminAggregatorsPage() {
  return (
    <DashboardLayout userRole="super_admin">
      <SuperAdminAggregators />
    </DashboardLayout>
  )
}
