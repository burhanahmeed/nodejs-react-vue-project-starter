import { RULES } from './rules';

export const ROLES = {
  admin: { id: 1, name: 'admin'},
  editor: { id: 2, name: 'editor'},
  viewer: { id: 3, name: 'viewer'},
}

export const ROLES_MAP = Object.fromEntries(
  Object.entries(ROLES).map(([key, value]) => [value.id, key])
);

export const PERMISSION = {
  ADMIN: [
    RULES.CAN_CREATE, RULES.CAN_DELETE, RULES.CAN_EDIT, RULES.CAN_VIEW, RULES.SUPER
  ],
  EDITOR: [ RULES.CAN_CREATE, RULES.CAN_DELETE, RULES.CAN_EDIT, RULES.CAN_VIEW ],
  VIEWER: [ RULES.CAN_VIEW ],
}
