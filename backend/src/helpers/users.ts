import { ROLES, USER_DEPARTEMENT } from '../constants/roles';

export const isAdmin = (role: string) => {
  if (ROLES.ADMIN !== role) {
    return false;
  }

  return true;
}

export const isPurchasing = (role: string) => {
  if (ROLES.PURCHASING !== role) {
    return false;
  }

  return true;
}

export const isWarehouse = (role: string) => {
  if (ROLES.WAREHOUSE !== role) {
    return false;
  }

  return true;
}

export const isDepartement = (role: string) => {
  if (!USER_DEPARTEMENT.includes(role)) {
    return false;
  }

  return true;
}
