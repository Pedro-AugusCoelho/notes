import * as S from './styled'
import BackgroundScreen from '@src/components/background-screen'
import { Input } from '@src/components/input'
import Button from '@src/components/button'
import ButtonIcon from '@src/components/button-icon'
import { useAppNavigation, useNotes, useGroups } from '@src/hooks'
import { theme } from '@src/../theme'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { Modal, ScrollView, Alert } from 'react-native'
import { NoteWithTimestamp } from '@src/services/storage'
import * as Haptics from 'expo-haptics'
import { Ionicons } from '@expo/vector-icons'
import { passwordStorage } from '@src/services/storage'

type NoteFormData = {
  title: string
  description: string
}

const schema: yup.ObjectSchema<NoteFormData> = yup.object({
  title: yup.string().defined().required('Informe um titulo.'),
  description: yup.string().defined().required('Informe uma descricao.'),
})

const textAreaStyle = {
  flex: 1,
  minHeight: 140,
  textAlignVertical: 'top' as const,
}

const titleInputStyle = {
  fontSize: theme.font.sizes.xlarge,
  fontFamily: theme.font.family.bold,
}

interface NoteDetailsScreenProps {
  route: any
}

export default function NoteDetails({ route }: NoteDetailsScreenProps) {
  const { note } = route.params as { note: NoteWithTimestamp }
  const navigation = useAppNavigation()
  const { updateNote, deleteNote } = useNotes()
  const { groups, loadGroups } = useGroups()
  const [isSaving, setIsSaving] = useState(false)
  const [groupSelectorVisible, setGroupSelectorVisible] = useState(false)
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(note.id_group || null)
  const [isSecret, setIsSecret] = useState(note.isSecret || false)
  const [menuVisible, setMenuVisible] = useState(false)
  const [passwordModalVisible, setPasswordModalVisible] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Recarregar grupos quando a tela ganha foco
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadGroups()
    })
    return unsubscribe
  }, [navigation, loadGroups])

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NoteFormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      title: note.title,
      description: note.description,
    },
  })

  const selectedGroup = selectedGroupId ? groups.find(g => g.id === selectedGroupId) : null

  function handleCreateGroupPress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    setGroupSelectorVisible(false)
    navigation.navigate('CreateGroup')
  }

  async function onSubmit(data: NoteFormData) {
    try {
      setIsSaving(true)
      
      // Se for bloqueada e não tinha antes, verificar se há senha definida
      if (isSecret && !note.isSecret) {
        const hasPassword = await passwordStorage.hasPassword()
        if (!hasPassword) {
          // Primeira vez, pedir para definir senha
          setPasswordModalVisible(true)
          setIsSaving(false)
          return
        }
      }
      
      await updateNote(note.id, {
        title: data.title,
        description: data.description,
        id_group: selectedGroupId || '',
        isSecret: isSecret,
      })
      navigation.goBack()
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao atualizar nota:', error)
    } finally {
      setIsSaving(false)
    }
  }

  async function handlePasswordSubmit() {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem')
      return
    }

    if (password.length < 4) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 4 caracteres')
      return
    }

    try {
      await passwordStorage.setPassword(password)
      setPasswordModalVisible(false)
      setPassword('')
      setConfirmPassword('')
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      
      // Continuar salvando a nota
      const data = control._formValues as NoteFormData
      setIsSaving(true)
      await updateNote(note.id, {
        title: data.title,
        description: data.description,
        id_group: selectedGroupId || '',
        isSecret: isSecret,
      })
      navigation.goBack()
    } catch {
      Alert.alert('Erro', 'Não foi possível definir a senha')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete() {
    try {
      await deleteNote(note.id)
      navigation.goBack()
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao deletar nota:', error)
    }
  }

  useEffect(() => {
    reset({
      title: note.title,
      description: note.description,
    })
    setSelectedGroupId(note.id_group || null)
    setIsSecret(note.isSecret || false)
  }, [note, reset])

  return (
    <BackgroundScreen isStackPage>
      {menuVisible && (
        <S.MenuBackdrop onPress={() => setMenuVisible(false)} />
      )}
      
      <S.HeaderRow>
        <ButtonIcon
          icon="arrow-back"
          variant="ghost"
          onPress={() => navigation.goBack()}
        />
        <S.Title>Editar nota</S.Title>

        <S.MenuContainer>
          <ButtonIcon
            icon="ellipsis-horizontal"
            variant="ghost"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              setMenuVisible(!menuVisible)
            }}
          />
          {menuVisible && (
            <S.MenuDropdown>
              <S.MenuOption
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                  setIsSecret(!isSecret)
                  setMenuVisible(false)
                }}
              >
                <Ionicons
                  name={isSecret ? "lock-open-outline" : "lock-closed"}
                  size={20}
                  color={theme.product.green_500}
                />
                <S.MenuOptionText>
                  {isSecret ? 'Desbloquear' : 'Bloquear'}
                </S.MenuOptionText>
              </S.MenuOption>
              
              <S.MenuDivider />
              
              <S.MenuOption
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                  setMenuVisible(false)
                  handleDelete()
                }}
              >
                <Ionicons
                  name="trash"
                  size={20}
                  color={theme.product.green_500}
                />
                <S.MenuOptionText>
                  Deletar
                </S.MenuOptionText>
              </S.MenuOption>
            </S.MenuDropdown>
          )}
        </S.MenuContainer>
      </S.HeaderRow>

      <S.Form>
        <S.Field>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Título"
                value={value}
                onChangeText={onChange}
                style={titleInputStyle}
              />
            )}
          />
          {errors.title && <S.ErrorText>{errors.title.message}</S.ErrorText>}
        </S.Field>

        <S.GroupSelectorField>
          <S.GroupSelector
            onPress={() => setGroupSelectorVisible(true)}
            borderColor={selectedGroup ? theme.product[selectedGroup.colorKey] : theme.base.shape_third}
          >
            <S.GroupSelectorText>
              {selectedGroup ? selectedGroup.name : 'Selecione um grupo'}
            </S.GroupSelectorText>
            <ButtonIcon
              icon={selectedGroup ? "close" : "arrow-down"}
              size={20}
              variant="ghost"
              color={selectedGroup ? theme.product[selectedGroup.colorKey] : undefined}
              onPress={(e) => {
                if (selectedGroup) {
                  e.stopPropagation()
                  setSelectedGroupId(null)
                }
              }}
            />
          </S.GroupSelector>
        </S.GroupSelectorField>

        <S.DescriptionField>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Insira o conteúdo aqui"
                value={value}
                onChangeText={onChange}
                multiline
                style={textAreaStyle}
              />
            )}
          />
          {errors.description && (
            <S.ErrorText>{errors.description.message}</S.ErrorText>
          )}
        </S.DescriptionField>
      </S.Form>

      <Button
        title={isSaving ? 'Salvando...' : 'Salvar'}
        onPress={handleSubmit(onSubmit)}
        disabled={isSaving}
      />

      <Modal
        visible={groupSelectorVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setGroupSelectorVisible(false)}
      >
        <S.SheetWrapper>
          <S.SheetBackdrop onPress={() => setGroupSelectorVisible(false)} />
          <S.SheetContainer>
            <S.SheetHandle />
            <S.SheetTitle>Selecione um grupo</S.SheetTitle>
            
            <S.CreateGroupButton onPress={handleCreateGroupPress}>
              <Ionicons name="add-circle" size={20} color={theme.product.green_500} />
              <S.CreateGroupButtonText>Criar novo grupo</S.CreateGroupButtonText>
            </S.CreateGroupButton>

            <ScrollView showsVerticalScrollIndicator={false}>
              {groups.length === 0 ? (
                <S.EmptyGroupsContainer>
                  <Ionicons name="folder-open-outline" size={48} color={theme.base.placeholder} />
                  <S.EmptyGroupsText>Nenhum grupo criado ainda</S.EmptyGroupsText>
                  <S.EmptyGroupsSubtext>Crie seu primeiro grupo para organizar suas notas</S.EmptyGroupsSubtext>
                </S.EmptyGroupsContainer>
              ) : (
                groups.map((group) => (
                  <S.GroupOption
                    key={group.id}
                    isSelected={group.id === selectedGroupId}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                      setSelectedGroupId(group.id)
                      setGroupSelectorVisible(false)
                    }}
                    borderColor={theme.product[group.colorKey]}
                  >
                    <S.GroupOptionDot color={theme.product[group.colorKey]} />
                    <S.GroupOptionName>{group.name}</S.GroupOptionName>
                  </S.GroupOption>
                ))
              )}
            </ScrollView>
          </S.SheetContainer>
        </S.SheetWrapper>
      </Modal>

      <Modal
        visible={passwordModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <S.PasswordModalOverlay>
          <S.PasswordModalContent>
            <S.PasswordModalIcon>
              <Ionicons name="lock-closed" size={48} color={theme.product.green_500} />
            </S.PasswordModalIcon>
            
            <S.PasswordModalTitle>Definir Senha</S.PasswordModalTitle>
            <S.PasswordModalDescription>
              Esta é sua primeira nota bloqueada. Defina uma senha para proteger suas notas bloqueadas.
            </S.PasswordModalDescription>

            <S.PasswordField>
              <Input
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </S.PasswordField>

            <S.PasswordField>
              <Input
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </S.PasswordField>

            <S.PasswordModalButtons>
              <S.PasswordModalButton 
                variant="secondary" 
                onPress={() => {
                  setPasswordModalVisible(false)
                  setPassword('')
                  setConfirmPassword('')
                  setIsSecret(false)
                }}
              >
                <S.PasswordModalButtonText variant="secondary">
                  Cancelar
                </S.PasswordModalButtonText>
              </S.PasswordModalButton>

              <S.PasswordModalButton 
                variant="primary" 
                onPress={handlePasswordSubmit}
              >
                <S.PasswordModalButtonText variant="primary">
                  Confirmar
                </S.PasswordModalButtonText>
              </S.PasswordModalButton>
            </S.PasswordModalButtons>
          </S.PasswordModalContent>
        </S.PasswordModalOverlay>
      </Modal>
    </BackgroundScreen>
  )
}
