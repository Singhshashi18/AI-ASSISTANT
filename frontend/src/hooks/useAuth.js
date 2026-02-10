import { useDispatch, useSelector } from 'react-redux'
import { authService } from '@/services/api'
import { setUser, setToken, setLoading, setError, logout } from '@/store/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, token, loading, error } = useSelector((state) => state.auth)

  const login = async (email, password) => {
    dispatch(setLoading(true))
    try {
      const response = await authService.login({ email, password })
      dispatch(setToken(response.data.token))
      dispatch(setUser(response.data.user))
      dispatch(setError(null))
      return response.data
    } catch (err) {
      dispatch(setError(err.response?.data?.message || 'Login failed'))
      throw err
    } finally {
      dispatch(setLoading(false))
    }
  }

  const register = async (name, email, password) => {
    dispatch(setLoading(true))
    try {
      const response = await authService.register({ name, email, password })
      dispatch(setToken(response.data.token))
      dispatch(setUser(response.data.user))
      dispatch(setError(null))
      return response.data
    } catch (err) {
      dispatch(setError(err.response?.data?.message || 'Registration failed'))
      throw err
    } finally {
      dispatch(setLoading(false))
    }
  }

  const logoutUser = () => {
    dispatch(logout())
  }

  return {
    user,
    token,
    loading,
    error,
    login,
    register,
    logoutUser,
    isAuthenticated: !!token,
  }
}
