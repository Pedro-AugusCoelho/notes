import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'

import Routes from '@src/routes'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider, useTheme } from '@src/contexts/ThemeContext'

function AppContent() {
  const { theme } = useTheme()

  return (
    <StyledThemeProvider theme={theme}>
      <Routes />
    </StyledThemeProvider>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
