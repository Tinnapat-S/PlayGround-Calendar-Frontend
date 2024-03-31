import { useAuthStore } from '../../stores/useAuthStore'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
export const RedirectIfAuthenticate = () => {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/calendar' })
    }
  }, [isAuthenticated, navigate])

  return null
}
