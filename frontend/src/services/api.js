import axios from 'axios'

const base = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: base
})

// Interceptor to normalize and log errors for easier debugging
api.interceptors.response.use(
  response => response,
  error => {
    try {
      const cfg = error.config || {}
      const method = (cfg.method || '').toUpperCase()
      const url = cfg.url || cfg.baseURL || 'unknown URL'
      if (error.response) {
        const status = error.response.status
        error.customMessage = `HTTP ${status} ${method} ${url}`
      } else {
        error.customMessage = `Network Error: ${error.message}`
      }
    } catch (e) {
      error.customMessage = error.message || 'Unknown API error'
    }
    // Keep original error visible in console
    // eslint-disable-next-line no-console
    console.error('API error ->', error.customMessage, error)
    return Promise.reject(error)
  }
)

export default api
