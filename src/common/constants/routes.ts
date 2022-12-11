export enum Routes {
  LOGIN = 'LOGIN',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  ADMIN_LEASES = 'ADMIN_LEASES',
  ADMIN_PROPERTIES = 'ADMIN_PROPERTIES',
  ADMIN_FACILITIES = 'ADMIN_FACILITIES',
  ADMIN_RESERVATIONS = 'ADMIN_RESERVATIONS',
  ADMIN_PAYMENTS = 'ADMIN_PAYMENTS',
  ADMIN_TENANTS = 'ADMIN_TENANTS',
  ADMIN_STAFFS = 'ADMIN_STAFFS',
  ADMIN_ANNOUNCEMENTS = 'ADMIN_ANNOUNCEMENTS',
  ADMIN_POLLS = 'ADMIN_POLLS',
  ADMIN_SETTINGS = 'ADMIN_SETTINGS',

  TENANT_DASHBOARD = 'TENANT_DASHBOARD',
  TENANT_FACILITIES = 'TENANT_FACILITIES',
  TENANT_LEASES = 'TENANT_LEASES',
  TENANT_PAYMENTS = 'TENANT_PAYMENTS',
  TENANT_RESERVATIONS = 'TENANT_RESERVATIONS',
  TENANT_ANNOUNCEMENTS = 'TENANT_ANNOUNCEMENTS',
  TENANT_POLLS = 'TENANT_POLLS',
}

export const routes: {
  [key: string]: {
    path: string;
  };
} = {
  [Routes.LOGIN]: {
    path: '/auth/login',
  },

  // Admin
  [Routes.ADMIN_DASHBOARD]: {
    path: '/admin/dashboard',
  },
  [Routes.ADMIN_LEASES]: {
    path: '/admin/leases',
  },
  [Routes.ADMIN_PAYMENTS]: {
    path: '/admin/payments',
  },
  [Routes.ADMIN_PROPERTIES]: {
    path: '/admin/properties',
  },
  [Routes.ADMIN_FACILITIES]: {
    path: '/admin/facilities',
  },
  [Routes.ADMIN_RESERVATIONS]: {
    path: '/admin/reservations',
  },
  [Routes.ADMIN_TENANTS]: {
    path: '/admin/tenants',
  },
  [Routes.ADMIN_STAFFS]: {
    path: '/admin/staffs',
  },
  [Routes.ADMIN_ANNOUNCEMENTS]: {
    path: '/admin/announcements',
  },
  [Routes.ADMIN_POLLS]: {
    path: '/admin/polls',
  },
  [Routes.ADMIN_SETTINGS]: {
    path: '/admin/settings/property-types',
  },

  // Tenant
  [Routes.TENANT_DASHBOARD]: {
    path: '/tenant/dashboard',
  },
  [Routes.TENANT_LEASES]: {
    path: '/tenant/leases',
  },
  [Routes.TENANT_PAYMENTS]: {
    path: '/tenant/payments',
  },
  [Routes.TENANT_FACILITIES]: {
    path: '/tenant/facilities',
  },
  [Routes.TENANT_RESERVATIONS]: {
    path: '/tenant/reservations',
  },
  [Routes.TENANT_ANNOUNCEMENTS]: {
    path: '/tenant/announcements',
  },
  [Routes.TENANT_POLLS]: {
    path: '/tenant/polls',
  },
};
