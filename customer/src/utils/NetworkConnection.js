import React, { useEffect, useState } from 'react'

// Check network connection
export function NetworkConnection(){
    const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleStatus = ()=>{
      setIsOnline(navigator.onLine)
    }

    window.addEventListener('online',handleStatus)
    window.addEventListener('offline',handleStatus)
  
    return () => {
      window.removeEventListener('online',handleStatus)
      window.removeEventListener('offline',handleStatus)
    }
  }, [isOnline])

  return {isOnline}
}