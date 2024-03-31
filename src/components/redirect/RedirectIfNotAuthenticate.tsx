import { useAuthStore } from '../../stores/useAuthStore'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
export const RedirectIfNotAuthenticate = () => {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login' })
    }
  }, [isAuthenticated, navigate])

  return null
}
