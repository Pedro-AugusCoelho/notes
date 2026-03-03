import { useEffect } from 'react'
import * as S from './styled'
import BackgroundScreen from '@src/components/background-screen'
import ButtonIcon from '@src/components/button-icon'
import { useAppNavigation, useGroups } from '@src/hooks'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function GroupList() {
  const navigation = useAppNavigation()
  const insets = useSafeAreaInsets()
  const { groups, loadGroups } = useGroups()

  // Recarregar grupos quando a tela ganha foco
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadGroups()
    })

    return unsubscribe
  }, [navigation, loadGroups])

  return (
    <BackgroundScreen isStackPage>
      <S.HeaderRow>
        <ButtonIcon
          icon="arrow-back"
          variant="ghost"
          onPress={() => navigation.goBack()}
        />
        <S.Title>Grupos</S.Title>
      </S.HeaderRow>

      <S.GroupsList
        contentContainerStyle={{
          paddingBottom: insets.bottom + 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {groups.map((group) => (
          <S.GroupItem key={group.id}>
            <S.GroupBadge colorKey={group.colorKey} />
            <S.GroupName>{group.name}</S.GroupName>
            <ButtonIcon
              icon="pencil"
              variant="ghost"
              size={20}
              onPress={() => navigation.navigate('CreateGroup')}
            />
          </S.GroupItem>
        ))}
      </S.GroupsList>

      <S.CreateButtonWrapper>
        <ButtonIcon
          icon="add"
          size={26}
          onPress={() => navigation.navigate('CreateGroup')}
        />
      </S.CreateButtonWrapper>
    </BackgroundScreen>
  )
}
