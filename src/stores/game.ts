import type { GameInterface, GamePointsInterface } from '@/types/game'
import type { PlayedQuestionInterface, QuestionInterface } from '@/types/question'
import { useToast } from '@/components/ui/toast/use-toast'
import { QuestionCategory } from '@/enums/questionCategory'
import { QuestionLevel } from '@/enums/questionLevel'
import { socket } from '@/socket'
import { useChallengeStore } from '@/stores/challenge'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('game', () => {
  const game = ref<GameInterface>({
    id: '',
    opponent: {
      id: '',
      name: '',
      pictureUrl: null,
      score: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      createdAt: '',
    },
    isUserTurn: false,
    isUserChallenger: false,
    userPoints: 0,
    opponentPoints: 0,
    currentQuestion: {
      question: '',
      category: QuestionCategory.DEFAULT,
      level: QuestionLevel.DEFAULT,
      answers: [],
      createdAt: '',
    },
    playedQuestions: [],
    timer: 90,
  })
  const timerInterval = ref<number | null>(null)
  const challengeStore = useChallengeStore()
  const { toast } = useToast()

  function setGameStore(data: GameInterface) {
    game.value = data
  }

  const startCountdown = (duration: number) => {
    if (timerInterval !== null) {
      if (timerInterval.value !== null)
        clearInterval(timerInterval.value)
    }

    game.value.timer = duration

    timerInterval.value = setInterval(() => {
      if (game.value.timer > 0) {
        game.value.timer--
      }
      else {
        if (timerInterval.value !== null)
          clearInterval(timerInterval.value)
        timerInterval.value = null
      }
    }, 1000)
  }

  function bindEvents() {
    socket.on('game:init', (data: GameInterface) => {
      challengeStore.$reset()
      setGameStore(data)
      startCountdown(90)
    })
    socket.on('game:set_question', (data: QuestionInterface) => {
      game.value.currentQuestion = data
    })
    socket.on('game:add_played_question', (data: PlayedQuestionInterface) => {
      game.value.playedQuestions.push(data)
    })
    socket.on('game:answer_selected', (data: string) => {
      game.value.selectedAnswer = data
    })
    socket.on('game:answer_reveal', (data: string) => {
      game.value.correctAnswer = data
    })
    socket.on('game:update_points_user', (data: number) => {
      game.value.userPoints = data
    })
    socket.on('game:update_points', (data: GamePointsInterface) => {
      data.userId === game.value.opponent.id ? game.value.opponentPoints = data.userPoints : game.value.userPoints = data.userPoints
    })
    socket.on('game:next_round', (data: string) => {
      game.value.currentQuestion = {
        question: '',
        category: QuestionCategory.DEFAULT,
        level: QuestionLevel.DEFAULT,
        answers: [],
        createdAt: '',
      }
      game.value.selectedAnswer = ''
      game.value.correctAnswer = ''
      game.value.isUserTurn = data !== game.value.opponent.id
      game.value.timer = 90
      startCountdown(90)
    })
    socket.on('game:cancelled', () => {
      $reset()
      toast({
        variant: 'destructive',
        title: 'Opponent quit!',
        description: 'You have won.',
      })
    })
    socket.on('disconnect', () => {
      $reset()
    })
  }

  function $reset() {
    game.value = {
      id: '',
      opponent: {
        id: '',
        name: '',
        pictureUrl: null,
        score: 0,
        gamesPlayed: 0,
        gamesWon: 0,
        createdAt: '',
      },
      isUserTurn: false,
      isUserChallenger: false,
      userPoints: 0,
      opponentPoints: 0,
      currentQuestion: {
        question: '',
        category: QuestionCategory.DEFAULT,
        level: QuestionLevel.DEFAULT,
        answers: [],
        createdAt: '',
      },
      playedQuestions: [],
      timer: 90,
    }
  }

  return { game, setGameStore, bindEvents, $reset }
})
