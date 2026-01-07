import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type UserRole = 'user'

export interface User {
  email: string
  role: UserRole
  name?: string
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const rememberMe = ref(false)

  // Getters
  const isAuthenticated = computed(() => user.value !== null)

  // Actions
  const login = async (email: string, password: string, remember: boolean): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (password === 'password') {
      user.value = {
        email,
        role: 'user',
      }
      rememberMe.value = remember

      // Simulate remember me by storing in localStorage
      if (remember) {
        localStorage.setItem('rememberedEmail', email)
      }

      return true
    }
    return false
  }

  const loginWithGoogle = async (): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate Google login
    user.value = {
      email: 'user@gmail.com',
      role: 'user',
      name: 'Google User',
    }

    return true
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (email && password.length >= 6 && name) {
      user.value = {
        email,
        role: 'user',
        name,
      }
      return true
    }
    return false
  }

  const registerWithGoogle = async (): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate Google registration
    user.value = {
      email: 'newuser@gmail.com',
      role: 'user',
      name: 'New Google User',
    }

    return true
  }

  const resetPassword = async (email: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return email.includes('@')
  }

  const logout = () => {
    if (!rememberMe.value) {
      localStorage.removeItem('rememberedEmail')
    }
    user.value = null
  }

  const getRememberedEmail = (): string => {
    return localStorage.getItem('rememberedEmail') || ''
  }

  return {
    user,
    rememberMe,
    isAuthenticated,
    login,
    loginWithGoogle,
    register,
    registerWithGoogle,
    resetPassword,
    logout,
    getRememberedEmail,
  }
})
