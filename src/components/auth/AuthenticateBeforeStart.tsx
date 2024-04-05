import { useEffect } from 'react'
import { useAuthStore } from '../../stores/useAuthStore'
import { useApplicationStore } from '@/stores/useStore'

export const AuthenticateBeforeStart: React.FC = () => {
  const { isAuthenticated, restoreAuthenticate } = useAuthStore()
  const { setLoading } = useApplicationStore()

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(true)
      try {
        restoreAuthenticate()
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}
