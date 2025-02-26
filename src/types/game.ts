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
}

export interface GamePointsInterface {
  userId: string
  userPoints: number
}
