import { TextInputProps } from 'react-native'
import * as S from './styled'
import { forwardRef } from 'react'

interface InputProps extends TextInputProps {
    readonly?: boolean;
}

export const Input = forwardRef<any, InputProps>(({ readonly = false, ...rest}, ref) => {
    return <S.Input ref={ref} {...rest} readonly={readonly} />
})