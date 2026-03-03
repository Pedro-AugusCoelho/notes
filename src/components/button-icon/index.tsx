import { GestureResponderEvent } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as S from './styled'

type IconName = keyof typeof Ionicons.glyphMap

export type ButtonIconVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

export interface ButtonIconProps {
  variant?: ButtonIconVariant
  icon: IconName
  size?: number
  color?: string
  // eslint-disable-next-line no-unused-vars
  onPress?: (event: GestureResponderEvent) => void
}

export default function ButtonIcon({ 
  variant = 'primary', 
  icon, 
  size = 24,
  color,
  onPress 
}: ButtonIconProps) {
  return (
    <S.ButtonContainer variant={variant} onPress={onPress}>
      <S.Icon name={icon} size={size} variant={variant} customColor={color} />
    </S.ButtonContainer>
  )
}
