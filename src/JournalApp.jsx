import { useState } from 'react'
import { AppRouter } from './routes/AppRouter'
import { AppTheme } from './theme'

function JournalApp() {
  const [count, setCount] = useState(0)

  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  )
}

export default JournalApp
