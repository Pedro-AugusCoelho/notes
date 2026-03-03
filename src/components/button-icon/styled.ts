import styled, { css, DefaultTheme } from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import type { ComponentProps } from 'react'
import { ButtonIconVariant } from '.'

type IoniconsName = ComponentProps<typeof Ionicons>['name']

// Cores de fundo por variante
const backgroundVariant = {
  primary: (theme: DefaultTheme) => theme.product.green_500,
  secondary: (theme: DefaultTheme) => theme.product.green_700,
  outline: () => 'transparent',
  ghost: () => 'transparent',
}

// Cores do ícone por variante
const iconColorVariant = {
  primary: (theme: DefaultTheme) => theme.base.white,
  secondary: (theme: DefaultTheme) => theme.base.white,
  outline: (theme: DefaultTheme) => theme.product.green_500,
  ghost: (theme: DefaultTheme) => theme.product.green_500,
}

export const ButtonContainer = styled.TouchableOpacity<{ variant: ButtonIconVariant }>`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;

  ${({ theme, variant }) => css`
    background-color: ${backgroundVariant[variant](theme)};
    border: ${variant === 'outline' ? `2px solid ${theme.product.green_500}` : 'none'};
  `}
`

export const Icon = styled(Ionicons).attrs<Partial<ComponentProps<typeof Ionicons>>>(({ name, size }) => ({
  name: (name ?? 'help') as IoniconsName,
  size: size ?? 24,
}))<{ variant: ButtonIconVariant; customColor?: string }>`
  color: ${({ theme, variant, customColor }) => customColor || iconColorVariant[variant](theme)};
`
