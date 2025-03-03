import type { OpponentInterface } from './opponent'
import type { PlayedQuestionInterface, QuestionInterface } from './question'

export interface GameInterface {
  id: string
  opponent: OpponentInterface
  isUserTurn: boolean
  isUserChallenger: boolean
  userPoints: number
  opponentPoints: number
  currentQuestion?: QuestionInterface
  selectedAnswer?: string
  correctAnswer?: string
  playedQuestions: PlayedQuestionInterface[]
  timer: number
  status: GameEndDTOInterface
}

export interface GamePointsInterface {
  userId: string
  userPoints: number
}

export interface GameEndDTOInterface {
  state: null | 'intro' | 'categories' | 'question' | 'end'
  winnerId: null | string
  loserId: null | string
}
