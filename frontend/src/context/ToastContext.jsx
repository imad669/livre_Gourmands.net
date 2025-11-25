import React, { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

export function useToast(){
  return useContext(ToastContext)
}

let idCounter = 1

export function ToastProvider({ children }){
  const [toasts, setToasts] = useState([])

  const show = useCallback((message, opts = {}) => {
    const id = idCounter++
    const toast = { id, message, variant: opts.variant || 'info' }
    setToasts(t => [toast, ...t])
    if(opts.duration !== 0){
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), opts.duration || 4000)
    }
  }, [])

  const remove = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), [])

  return (
    <ToastContext.Provider value={{ show, remove }}>
      {children}
      <div aria-live="polite" aria-atomic="true" style={{position:'fixed', top:16, right:16, zIndex:1080}}>
        {toasts.map(t => (
          <div key={t.id} className={`toast show align-items-center text-bg-${t.variant} mb-2`} role="alert">
            <div className="d-flex">
              <div className="toast-body">{t.message}</div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" aria-label="Close" onClick={() => remove(t.id)}></button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
