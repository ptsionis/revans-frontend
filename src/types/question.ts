import type { QuestionCategory } from '@/enums/questionCategory'
import type { QuestionLevel } from '@/enums/questionLevel'

export interface QuestionInterface {
  question: string
  imageUrl?: string | null
  category: QuestionCategory
  level: QuestionLevel
  answers: string[]
}

export interface PlayedQuestionInterface {
  category: QuestionCategory
  level: QuestionLevel
}
