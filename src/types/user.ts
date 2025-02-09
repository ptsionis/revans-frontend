import type { UserRole } from '@/enums/userRole'

export interface UserInterface {
  id: string
  facebookId?: string | null
  googleId?: string | null
  role: UserRole
  name: string
  pictureUrl?: string | null
  score: number
  gamesPlayed: number
  gamesWon: number
  createdAt: string
}
