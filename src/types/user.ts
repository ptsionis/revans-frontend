import type { UserAvailability } from '@/enums/userAvailability'
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
  historyPlayed: number
  historyWon: number
  geographyPlayed: number
  geographyWon: number
  whoIsPlayed: number
  whoIsWon: number
  logoPlayed: number
  logoWon: number
  triviaPlayed: number
  triviaWon: number
  secretPlayed: number
  secretWon: number
  createdAt: string
  availability?: UserAvailability
}
