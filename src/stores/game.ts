import type { GameEndDTOInterface, GameInterface, GamePointsInterface } from '@/types/game'
import type { PlayedQuestionInterface, QuestionInterface } from '@/types/question'
import { useToast } from '@/components/ui/toast/use-toast'
import { QuestionCategory } from '@/enums/questionCategory'
import { QuestionLevel } from '@/enums/questionLevel'
import { socket } from '@/socket'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const defaultOpponentState = {
  id: '',
  name: '',
  pictureUrl: null,
  score: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  createdAt: '',
}
const defaultQuestionState: QuestionInterface = {
  question: '',
  category: QuestionCategory.DEFAULT,
  level: QuestionLevel.DEFAULT,
  answers: [],
  createdAt: '',
}
const defaultGameState: GameInterface = {
  id: '',
  opponent: { ...defaultOpponentState },
  isUserTurn: false,
  isUserChallenger: false,
  userPoints: 0,
  opponentPoints: 0,
  currentQuestion: { ...defaultQuestionState },
  playedQuestions: [],
  timer: 0,
  status: { state: null, winnerId: '', loserId: '' },
}
const timerInterval = ref<number | null>(null)

export const useGameStore = defineStore('game', () => {
  const game = ref<GameInterface>({ ...defaultGameState })
  const { toast } = useToast()

  function clearTimer() {
    if (timerInterval.value !== null) {
      clearInterval(timerInterval.value)
      timerInterval.value = null
    }
  }

  function startCountdown(duration: number) {
    clearTimer()
    game.value.timer = duration
    timerInterval.value = setInterval(() => {
      if (game.value.timer > 0) {
        game.value.timer--
      }
      else {
        clearTimer()
      }
    }, 1000)
  }

  function bindEvents() {
    socket.on('game:init', (data: GameInterface) => {
      game.value = data
      game.value.status.state = 'intro'
    })

    socket.on('game:timer_start', startCountdown)

    socket.on('game:set_question', (data: QuestionInterface) => {
      game.value.currentQuestion = data
      game.value.status.state = 'question'
    })

    socket.on('game:add_played_question', (data: PlayedQuestionInterface) => {
      game.value.playedQuestions.push(data)
    })

    socket.on('game:answer_selected', (data: string) => {
      clearTimer()
      game.value.selectedAnswer = data
    })

    socket.on('game:answer_reveal', (data: string) => {
      game.value.correctAnswer = data
    })

    socket.on('game:update_points', (data: GamePointsInterface) => {
      const isOpponent = data.userId === game.value.opponent.id
      isOpponent ? game.value.opponentPoints = data.userPoints : game.value.userPoints = data.userPoints
    })

    socket.on('game:next_round', (data: string) => {
      game.value.currentQuestion = { ...defaultQuestionState }
      game.value.selectedAnswer = ''
      game.value.correctAnswer = ''
      game.value.isUserTurn = data !== game.value.opponent.id
      game.value.status.state = 'categories'
    })

    socket.on('game:end', (data: GameEndDTOInterface) => {
      clearTimer()
      game.value.status.winnerId = data.winnerId
      game.value.status.loserId = data.loserId
      game.value.status.state = 'end'
      setTimeout($reset, 10000)
    })

    socket.on('game:out_of_time', () => {
      $reset()
      toast({ variant: 'destructive', title: 'DEFEAT!', description: 'You have run out of time.' })
    })

    socket.on('disconnect', $reset)

    socket.on('game:opponent_quit', () => {
      $reset()
      toast({ variant: 'success', title: 'WIN!', description: 'Opponent quit.' })
    })
  }

  function $reset() {
    game.value = { ...defaultGameState }
    game.value.status.state = null
    clearTimer()
  }

  return { game, bindEvents }
})
