// Button.tsx
import styled, { css, DefaultTheme } from 'styled-components/native'
import { ButtonVariant } from '.'

// Cores por variante
const backgroundVariant = {
  primary: (theme: DefaultTheme) => theme.product.green_500,
  secondary: (theme: DefaultTheme) => theme.product.green_700,
  outline: () => 'transparent',
  transparent: (theme: DefaultTheme) => theme.base.transparent,
}

const textVariant = {
  primary: (theme: DefaultTheme) => theme.base.white,
  secondary: (theme: DefaultTheme) => theme.base.white,
  outline: (theme: DefaultTheme) => theme.product.green_500,
  transparent: (theme: DefaultTheme) => theme.product.green_500,
}


export const ButtonContainer = styled.TouchableOpacity<{ variant: ButtonVariant }>`
  width: 100%;
  padding: 14px 12px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;

  ${({ theme, variant }) => css`
    background-color: ${backgroundVariant[variant](theme)};
    border: ${variant === 'outline' ? `2px solid ${theme.product.green_500}` : 'none'};
  `}
`

export const ButtonText = styled.Text<{ variant: ButtonVariant }>`
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.small}px;
  color: ${({ theme, variant }) => textVariant[variant](theme)};
`