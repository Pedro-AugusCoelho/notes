import * as S from './styled'
import { useGroups } from '@src/hooks'
import { useTheme } from '@src/contexts/ThemeContext'
import { GestureResponderEvent } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export interface CardProps {
  title: string
  description: string
  groupId?: string
  isSecret?: boolean
  createdAt?: string | number
  // eslint-disable-next-line no-unused-vars
  onPress?: (event: GestureResponderEvent) => void
}

export default function Card({ title, description, groupId, isSecret, createdAt, onPress }: CardProps) {
  const { groups } = useGroups()
  const { theme } = useTheme()
  const group = groupId ? groups.find(g => g.id === groupId) : null
  const ribbonColor = group ? theme.product[group.colorKey] : theme.product.green_500

  const displayTitle = isSecret ? title.replace(/./g, '*') : title
  const displayDescription = isSecret ? '********************' : description

  // Formatar data para dd-mm-yyyy
  const formatDate = (timestamp?: string | number) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  // Determinar cor do ícone de bloqueio
  const getLockIconColor = () => {
    if (!isSecret) {
      // Não está bloqueada, usar cor placeholder
      return theme.base.placeholder
    } else {
      // Está bloqueada
      if (group) {
        // Tem grupo, usar cor do grupo
        return theme.product[group.colorKey]
      } else {
        // Não tem grupo, usar cor padrão (green_500)
        return theme.product.green_500
      }
    }
  }

  return (
    <S.CardContainer onPress={onPress}>
      <S.Container>
        <S.Ribbon ribbonColor={ribbonColor} />
        <S.MainContent>
          
          <S.Content>
            <S.TitleRow>
              <S.Title numberOfLines={1} ellipsizeMode="tail">
                {displayTitle}
              </S.Title>
            </S.TitleRow>
            <S.Description numberOfLines={2} ellipsizeMode="tail">
              {displayDescription}
            </S.Description>
          </S.Content>
          
          <S.RightSection>
            <S.ArrowIcon>
              <Ionicons name="chevron-forward" size={22} color={theme.base.placeholder} />
            </S.ArrowIcon>
          </S.RightSection>
        </S.MainContent>

        <S.Footer>
          <S.FooterItem>
            <Ionicons name="lock-closed" size={14} color={getLockIconColor()} />
          </S.FooterItem>
          {createdAt && (
            <S.DateText>{formatDate(createdAt)}</S.DateText>
          )}
        </S.Footer>

      </S.Container>
    </S.CardContainer>
  )
}
