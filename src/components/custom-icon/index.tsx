import * as S from './styled'

import { theme } from '../../../theme'
import { Ionicons } from "@expo/vector-icons"

type IconName = keyof typeof Ionicons.glyphMap

interface IconProps {
  name: IconName
  size: number
  color: keyof typeof theme.base | keyof typeof theme.product | string
}

export function CustomIcon ({color, name, size}: IconProps) {
  return <S.Icon name={name} color={color} size={size} />
}