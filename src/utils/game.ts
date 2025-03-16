import { QuestionLevel } from '@/enums/questionLevel'

export function getQuestionLevelPoints(level: QuestionLevel): number {
  switch (level) {
    case QuestionLevel.EASY:
      return 1
    case QuestionLevel.MEDIUM:
      return 2
    case QuestionLevel.HARD:
      return 3
    default:
      return 0
  }
}
