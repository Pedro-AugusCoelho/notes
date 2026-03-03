import { StatusBar } from 'react-native'
import type { ReactNode } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@src/contexts/ThemeContext'
import * as S from './styled'

interface ScreenDefaultProps {
  isStackPage?: boolean
  children: ReactNode
}

export default function BackgroundScreen({ children, isStackPage = false }: ScreenDefaultProps) {
  const insets = useSafeAreaInsets()
  const { themeMode } = useTheme()

    return (
        <>
        <StatusBar
            translucent
            backgroundColor='transparent'
            barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'}
        />

        <S.Container
            style={{
            paddingBottom: isStackPage ? insets.bottom + 8 : 0,
            paddingTop: insets.top + 8,
            }}
            edges={['bottom', 'top']}
        >
            {children}
        </S.Container>
        </>
    )
}
