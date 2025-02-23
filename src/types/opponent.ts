export interface OpponentInterface {
  id: string
  name: string
  pictureUrl?: string | null
  score: number
  gamesPlayed: number
  gamesWon: number
  createdAt: string
}
