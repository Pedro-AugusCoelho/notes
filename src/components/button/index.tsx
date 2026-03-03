import * as S from './styled'
import { TouchableOpacityProps } from 'react-native'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'transparent';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'children'> {
  variant?: ButtonVariant
  title: string
}

export default function Button ({ variant = 'primary', title, ...rest }: ButtonProps) {
  return (
    <S.ButtonContainer variant={variant} {...rest}>
        <S.ButtonText variant={variant}>
          {title}
        </S.ButtonText>
    </S.ButtonContainer>
  )
}