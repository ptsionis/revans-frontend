export enum UserAvailability {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  PENDING = 'PENDING',
  INGAME = 'INGAME',
}

export const availabilityOrder: Record<UserAvailability, number> = {
  ONLINE: 1,
  PENDING: 2,
  INGAME: 3,
  OFFLINE: 4,
}
