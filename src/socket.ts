import { io } from 'socket.io-client'

export const socket = io(import.meta.env.VITE_SERVER_ORIGIN, {
  withCredentials: true,
  autoConnect: false,
})
