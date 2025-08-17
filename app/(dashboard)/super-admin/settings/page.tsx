import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { SuperAdminSettings } from '@/components/dashboard/super-admin/super-admin-settings'

export default function SuperAdminSettingsPage() {
  return (
    <DashboardLayout userRole="super_admin">
      <SuperAdminSettings />
    </DashboardLayout>
  )
}
