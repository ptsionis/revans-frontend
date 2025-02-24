import type { GameInterface } from '@/types/game'
import type { PlayedQuestionInterface, QuestionInterface } from '@/types/question'
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
    },
    playedQuestions: [],
  })
  const challengeStore = useChallengeStore()

  function setGameStore(data: GameInterface) {
    game.value = data
  }

  function bindEvents() {
    socket.on('game:init', (data: GameInterface) => {
      challengeStore.$reset()
      setGameStore(data)
    })
    socket.on('game:set_question', (data: QuestionInterface) => {
      game.value.currentQuestion = data
    })
    socket.on('game:add_played_question', (data: PlayedQuestionInterface) => {
      game.value.playedQuestions.push(data)
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
      },
      playedQuestions: [],
    }
  }

  return { game, setGameStore, bindEvents, $reset }
})
