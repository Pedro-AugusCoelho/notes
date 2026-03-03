// theme.ts

// Cores de produto (mantidas em ambos os temas)
const productColors = {
  green_700: '#00875F',
  green_500: '#00B37E',
  
  purple_700: '#6A3CBC',
  purple_500: '#8A5FD8',
  
  blue_700: '#1E6BD6',
  blue_500: '#3B82F6',
  
  red_700: '#D43C4A',
  red_500: '#F75A68',
  
  yellow_700: '#C9A227',
  yellow_500: '#F5C542',
  
  orange_700: '#C75B12',
  orange_500: '#F97316',
  
  pink_700: '#C0266D',
  pink_500: '#EC4899',
} as const

// Tema escuro (padrão)
const darkBase = {
  background: '#121214',
  shape_primary: '#202024',
  shape_secondary: '#29292E',
  shape_third: '#323238',
  placeholder: '#7C7C8A',
  text: '#C4C4CC',
  title: '#E1E1E6',
  white: '#FFFFFF',
  transparent: 'transparent',
} as const

// Tema claro
const lightBase = {
  background: '#F5F5F5',
  shape_primary: '#FFFFFF',
  shape_secondary: '#F0F0F0',
  shape_third: '#E5E5E5',
  placeholder: '#8A8A8A',
  text: '#52525B',
  title: '#27272A',
  white: '#FFFFFF',
  transparent: 'transparent',
} as const

const fontConfig = {
  family: {
    regular: 'Roboto_400Regular',
    bold: 'Roboto_700Bold',
  },
  lineHeight: '160%',
  sizes: {
    small: 14,
    medium: 16,
    large: 18,
    xlarge: 24,
  },
} as const

export const darkTheme = {
  product: productColors,
  base: darkBase,
  font: fontConfig,
} as const

export const lightTheme = {
  product: productColors,
  base: lightBase,
  font: fontConfig,
} as const

// Exporta o tema dark como padrão para compatibilidade
export const theme = darkTheme

// Tipo explícito do tema
export type ThemeType = {
  product: typeof productColors
  base: typeof darkBase
  font: typeof fontConfig
}