import { ref } from 'vue'

const isAuthenticated = ref<boolean>(false)

export function useAuth() {
  const checkAuth = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/auth/is-authenticated`, {
        credentials: 'include',
      })
      if (res.ok) {
        const data = await res.json()
        isAuthenticated.value = data.isAuthenticated
      }
    }
    catch (error) {
      console.error('Authentication check failed:', error)
    }
  }

  const loginWithFacebook = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_ORIGIN}/auth/facebook`
  }

  const loginWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_ORIGIN}/auth/google`
  }

  const logout = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_ORIGIN}/auth/logout`
  }

  return { isAuthenticated, checkAuth, loginWithFacebook, loginWithGoogle, logout }
}
