import { Ranks } from '@/enums/ranks'

export function getRankIconString(score: number) {
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

export function getRankName(score: number) {
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

export function getWinrate(gamesPlayed: number, gamesWon: number) {
  if (gamesPlayed === 0) {
    return 0
  }
  return Math.round((gamesWon / gamesPlayed) * 100)
}
