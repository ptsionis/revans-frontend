import type { UserInterface } from '@/types/user'
import { QuestionCategory } from '@/enums/questionCategory'
import { Ranks } from '@/enums/ranks'

export function getRankIconString(score: number): string {
  if (score < Ranks.RANK1) {
    return 'noto:baby-chick'
  }
  else if (score < Ranks.RANK2) {
    return 'noto:fox'
  }
  else if (score < Ranks.RANK3) {
    return 'noto:eagle'
  }
  else if (score < Ranks.RANK4) {
    return 'noto:shark'
  }
  else if (score < Ranks.RANK5) {
    return 'noto:wolf'
  }
  else if (score < Ranks.RANK6) {
    return 'noto:noto:tiger-face'
  }
  else if (score < Ranks.RANK7) {
    return 'noto:lion'
  }
  else if (score < Ranks.RANK8) {
    return 'noto:dragon'
  }
  else if (score < Ranks.RANK9) {
    return 'noto:phoenix'
  }
  else {
    return 'noto:goat'
  }
}

export function getRankName(score: number): string {
  if (score < Ranks.RANK1) {
    return 'Newbie'
  }
  else if (score < Ranks.RANK2) {
    return 'Rookie'
  }
  else if (score < Ranks.RANK3) {
    return 'Striker'
  }
  else if (score < Ranks.RANK4) {
    return 'Pro'
  }
  else if (score < Ranks.RANK5) {
    return 'Ace'
  }
  else if (score < Ranks.RANK6) {
    return 'Champion'
  }
  else if (score < Ranks.RANK7) {
    return 'Master'
  }
  else if (score < Ranks.RANK8) {
    return 'Grandmaster'
  }
  else if (score < Ranks.RANK9) {
    return 'Legend'
  }
  else {
    return 'GOAT'
  }
}

export function getWinrate(gamesPlayed: number, gamesWon: number): number {
  if (gamesPlayed === 0) {
    return 0
  }
  return Math.round((gamesWon / gamesPlayed) * 100)
}

export function getCategoryWinrate(profile: UserInterface, category: QuestionCategory): number {
  switch (category) {
    case QuestionCategory.HISTORY:
      if (profile.historyPlayed === 0)
        return 0
      return Math.round(profile.historyWon / profile.historyPlayed * 100)
    case QuestionCategory.GEOGRAPHY:
      if (profile.geographyPlayed === 0)
        return 0
      return Math.round(profile.geographyWon / profile.geographyPlayed * 100)
    case QuestionCategory.FINANCE:
      if (profile.financePlayed === 0)
        return 0
      return Math.round(profile.financeWon / profile.financePlayed * 100)
    case QuestionCategory.LOGO:
      if (profile.logoPlayed === 0)
        return 0
      return Math.round(profile.logoWon / profile.logoPlayed * 100)
    case QuestionCategory.TRIVIA:
      if (profile.triviaPlayed === 0)
        return 0
      return Math.round(profile.triviaWon / profile.triviaPlayed * 100)
    case QuestionCategory.SECRET:
      if (profile.secretPlayed === 0)
        return 0
      return Math.round(profile.secretWon / profile.secretWon)
    default:
      return 0
  }
}
