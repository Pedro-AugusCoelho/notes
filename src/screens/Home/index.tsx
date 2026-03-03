import * as S from './styled'
import BackgroundScreen from '@src/components/background-screen'
import { Input } from '@src/components/input'

import ButtonIcon from '@src/components/button-icon'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Card from '@src/components/card'
import { useAppNavigation, useNotes, useGroups } from '@src/hooks'
import { useEffect, useState, useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '@src/../theme'
import { TextInput, Alert, Modal } from 'react-native'
import * as Haptics from 'expo-haptics'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { passwordStorage } from '@src/services/storage'
import { NoteWithTimestamp } from '@src/services/storage'

const TUTORIAL_KEY = '@notas:tutorial_shown'

export default function Home() {
  const insets = useSafeAreaInsets()
  const navigation = useAppNavigation()
  const { notes, isLoading, loadNotes } = useNotes()
  const { groups, deleteGroupAndUnlinkNotes, loadGroups } = useGroups()
  const [searchText, setSearchText] = useState('')
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)
  const [showTutorial, setShowTutorial] = useState(false)
  const [passwordModalVisible, setPasswordModalVisible] = useState(false)
  const [isSettingPassword, setIsSettingPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedNote, setSelectedNote] = useState<NoteWithTimestamp | null>(null)
  const searchInputRef = useRef<TextInput>(null)

  // Verificar se é a primeira vez do usuário
  useEffect(() => {
    const checkFirstTime = async () => {
      try {
        const tutorialShown = await AsyncStorage.getItem(TUTORIAL_KEY)
        if (!tutorialShown) {
          setShowTutorial(true)
        }
      } catch {
        // Ignorar erro
      }
    }
    checkFirstTime()
  }, [])

  // Recarregar notas quando a tela ganha foco
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadNotes()
      loadGroups()
    })

    return unsubscribe
  }, [navigation, loadNotes, loadGroups])

  // Fechar tutorial
  const handleCloseTutorial = async () => {
    try {
      await AsyncStorage.setItem(TUTORIAL_KEY, 'true')
      setShowTutorial(false)
    } catch {
      setShowTutorial(false)
    }
  }

  // Função para lidar com clique no card
  const handleNotePress = async (note: NoteWithTimestamp) => {
    if (note.isSecret) {
      // Verificar se há senha definida para notas bloqueadas
      const hasPassword = await passwordStorage.hasPassword()
      
      if (!hasPassword) {
        // Primeira vez, pedir para definir senha
        setIsSettingPassword(true)
        setSelectedNote(note)
        setPasswordModalVisible(true)
      } else {
        // Já tem senha, pedir para verificar
        setIsSettingPassword(false)
        setSelectedNote(note)
        setPasswordModalVisible(true)
      }
    } else {
      navigation.navigate('NoteDetails', { note })
    }
  }

  // Função para verificar ou definir senha
  const handlePasswordSubmit = async () => {
    if (isSettingPassword) {
      // Definindo senha pela primeira vez
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
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        setPasswordModalVisible(false)
        setPassword('')
        setConfirmPassword('')
        
        if (selectedNote) {
          navigation.navigate('NoteDetails', { note: selectedNote })
          setSelectedNote(null)
        }
      } catch {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        Alert.alert('Erro', 'Não foi possível definir a senha')
      }
    } else {
      // Verificando senha
      const isValid = await passwordStorage.verifyPassword(password)
      
      if (isValid && selectedNote) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        setPasswordModalVisible(false)
        setPassword('')
        navigation.navigate('NoteDetails', { note: selectedNote })
        setSelectedNote(null)
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        Alert.alert('Erro', 'Senha incorreta')
        setPassword('')
      }
    }
  }

  // Função para deletar grupo
  const handleDeleteGroup = (groupId: string, groupName: string) => {
    // Feedback tátil
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    Alert.alert(
      'Deletar Grupo',
      `Tem certeza que deseja deletar o grupo "${groupName}"?\n\nAs notas vinculadas a este grupo não serão deletadas, apenas perderão o vínculo com o grupo.`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              // Feedback tátil de sucesso
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
              const result = await deleteGroupAndUnlinkNotes(groupId)
              if (result.success) {
                // Se o grupo deletado estava selecionado, limpar a seleção
                if (selectedGroupId === groupId) {
                  setSelectedGroupId(null)
                }
                // Recarregar notas e grupos para refletir as mudanças
                await loadNotes()
                await loadGroups()
              }
            } catch {
              // Feedback tátil de erro
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
              Alert.alert('Erro', 'Não foi possível deletar o grupo')
            }
          },
        },
      ]
    )
  }

  // Filtrar notas baseado na busca e grupo selecionado
  const filteredNotes = notes.filter((note) => {
    // Filtro por busca
    const matchesSearch = searchText.trim() === '' 
      ? true
      : note.title.toLowerCase().includes(searchText.toLowerCase()) ||
        note.description.toLowerCase().includes(searchText.toLowerCase())
    
    // Filtro por grupo
    const matchesGroup = selectedGroupId 
      ? note.id_group === selectedGroupId
      : true
    
    return matchesSearch && matchesGroup
  })
  
  return (
    <BackgroundScreen>
      <S.Header>
        <S.TopRow>
          <S.InputWrapper>
            <Input
              ref={searchInputRef}
              placeholder="Pesquisar"
              value={searchText}
              onChangeText={setSearchText}
            />
          </S.InputWrapper>

          <ButtonIcon
            icon={searchText ? "close" : "search"}
            onPress={() => {
              if (searchText) {
                setSearchText('')
              } else {
                searchInputRef.current?.focus()
              }
            }}
          />
        </S.TopRow>

        <S.GroupsScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <S.GroupButton onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            navigation.navigate('CreateGroup')
          }}>
            <Ionicons
              name="add-circle-outline"
              size={20}
              color={theme.base.white}
            />
            <S.GroupButtonText>Novo Grupo</S.GroupButtonText>
          </S.GroupButton>

          {groups.map((item) => (
            <S.GroupTag
              key={item.id}
              isActive={selectedGroupId === item.id}
              backgroundColor={theme.product[item.colorKey]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                setSelectedGroupId(selectedGroupId === item.id ? null : item.id)
              }}
              onLongPress={() => handleDeleteGroup(item.id, item.name)}
              delayLongPress={500}
            >
              <S.GroupTagText isActive={selectedGroupId === item.id}>
                {item.name}
              </S.GroupTagText>
              {selectedGroupId === item.id && (
                <Ionicons
                  name="checkmark"
                  size={16}
                  color={theme.base.white}
                  style={{ marginLeft: 6 }}
                />
              )}
            </S.GroupTag>
          ))}
        </S.GroupsScrollView>
      </S.Header>

      <S.Body
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 96,
        }}
      >
        <S.BodyContent>
          {isLoading ? (
            <S.BodyContent>
              {/* Loading indicator can be added here */}
            </S.BodyContent>
          ) : filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <Card
                key={note.id}
                title={note.title}
                description={note.description}
                groupId={note.id_group}
                isSecret={note.isSecret}
                createdAt={note.createdAt}
                onPress={() => handleNotePress(note)}
              />
            ))
          ) : (
            <S.EmptyStateContainer>
              <Ionicons
                name="document-text-outline"
                size={40}
                color={theme.product.green_700}
              />
              <S.EmptyStateText>Nenhuma nota criada ainda</S.EmptyStateText>
            </S.EmptyStateContainer>
          )}
        </S.BodyContent>
      </S.Body>

      <S.FabWrapper
        style={{
          bottom: insets.bottom + 12,
        }}
      >
        <ButtonIcon
          icon="add"
          size={26}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
            navigation.navigate('CreateNote')
          }}
        />
      </S.FabWrapper>

      <Modal
        visible={showTutorial}
        transparent
        animationType="fade"
        onRequestClose={handleCloseTutorial}
      >
        <S.TutorialOverlay>
          <S.TutorialBackdrop onPress={handleCloseTutorial} />
          <S.TutorialCard>
            <S.TutorialIcon>
              <Ionicons
                name="information-circle"
                size={48}
                color={theme.product.green_500}
              />
            </S.TutorialIcon>
            
            <S.TutorialTitle>Bem-vindo ao Notas!</S.TutorialTitle>
            
            <S.TutorialContent>
              <S.TutorialItem>
                <Ionicons name="add-circle" size={20} color={theme.product.green_500} />
                <S.TutorialText>
                  Toque em <S.TutorialBold>"Novo Grupo"</S.TutorialBold> para criar grupos e organizar suas notas
                </S.TutorialText>
              </S.TutorialItem>

              <S.TutorialItem>
                <Ionicons name="trash" size={20} color={theme.product.red_500} />
                <S.TutorialText>
                  <S.TutorialBold>Pressione e segure</S.TutorialBold> um grupo para deletá-lo (as notas não serão apagadas)
                </S.TutorialText>
              </S.TutorialItem>

              <S.TutorialItem>
                <Ionicons name="create" size={20} color={theme.product.blue_500} />
                <S.TutorialText>
                  Toque no <S.TutorialBold>botão "+"</S.TutorialBold> no canto inferior para criar novas anotações
                </S.TutorialText>
              </S.TutorialItem>
            </S.TutorialContent>

            <S.TutorialButton onPress={handleCloseTutorial}>
              <S.TutorialButtonText>Entendi!</S.TutorialButtonText>
            </S.TutorialButton>
          </S.TutorialCard>
        </S.TutorialOverlay>
      </Modal>

      <Modal
        visible={passwordModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => {
          setPasswordModalVisible(false)
          setPassword('')
          setConfirmPassword('')
          setSelectedNote(null)
        }}
      >
        <S.PasswordModalOverlay>
          <S.PasswordModalContent>
            <S.PasswordModalIcon>
              <Ionicons name="lock-closed" size={48} color={theme.product.green_500} />
            </S.PasswordModalIcon>
            
            <S.PasswordModalTitle>
              {isSettingPassword ? 'Definir Senha' : 'Nota Bloqueada'}
            </S.PasswordModalTitle>
            <S.PasswordModalDescription>
              {isSettingPassword 
                ? 'Esta é sua primeira nota bloqueada. Defina uma senha para proteger suas notas bloqueadas.'
                : 'Digite sua senha para visualizar esta nota'
              }
            </S.PasswordModalDescription>

            <S.PasswordField>
              <Input
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoFocus
              />
            </S.PasswordField>

            {isSettingPassword && (
              <S.PasswordField>
                <Input
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </S.PasswordField>
            )}

            <S.PasswordModalButtons>
              <S.PasswordModalButton 
                variant="secondary" 
                onPress={() => {
                  setPasswordModalVisible(false)
                  setPassword('')
                  setConfirmPassword('')
                  setSelectedNote(null)
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