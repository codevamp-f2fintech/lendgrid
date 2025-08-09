export const navigationPaths = {
  // Public routes
  home: '/',
  login: '/login',
  signup: '/signup',
  forgotPassword: '/forgot-password',

  // Super Admin routes
  superAdmin: {
    dashboard: '/super-admin',
    revenue: '/super-admin/revenue',
    analytics: '/super-admin/analytics',
    lenders: '/super-admin/lenders',
    aggregators: '/super-admin/aggregators',
    commission: '/super-admin/commission',
    payouts: '/super-admin/payouts',
    settings: '/super-admin/settings'
  },

  // Aggregator routes
  aggregator: {
    dashboard: '/aggregator',
    commission: '/aggregator/commission',
    reports: '/aggregator/reports',
    applications: '/aggregator/applications',
    settings: '/aggregator/settings'
  },

  // Lender routes
  lender: {
    dashboard: '/dashboard/lender',
    products: '/lender/products',
    insights: '/lender/insights',
    payouts: '/lender/payouts',
    settings: '/lender/settings'
  }
}

export const getNavigationByRole = (role: string) => {
  switch (role) {
    case 'super_admin':
      return navigationPaths.superAdmin
    case 'aggregator_admin':
      return navigationPaths.aggregator
    case 'lender_admin':
      return navigationPaths.lender
    default:
      return navigationPaths.aggregator
  }
}
