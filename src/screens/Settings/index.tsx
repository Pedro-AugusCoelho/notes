import * as S from './styled'
import BackgroundScreen from '@src/components/background-screen'
import { Input } from '@src/components/input'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Modal, Alert, Switch, KeyboardAvoidingView, Platform } from 'react-native'
import * as Haptics from 'expo-haptics'
import { passwordStorage } from '@src/services/storage'
import { backupService } from '@src/services/backup'
import * as DocumentPicker from 'expo-document-picker'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@src/contexts/ThemeContext'

export default function Settings() {
  const insets = useSafeAreaInsets()
  const { theme, themeMode, toggleTheme } = useTheme()
  const [resetPasswordModalVisible, setResetPasswordModalVisible] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const handleToggleTheme = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    toggleTheme()
  }

  const handleBackup = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      await backupService.createBackup()
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    } catch {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      Alert.alert('Erro', 'Não foi possível criar o backup')
    }
  }

  const handleRestore = async () => {
    Alert.alert(
      'Modo de Restauração',
      'Escolha como deseja restaurar o backup:',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sobrescrever',
          style: 'destructive',
          onPress: () => performRestore('overwrite')
        },
        {
          text: 'Mesclar Dados',
          onPress: () => performRestore('merge')
        }
      ]
    )
  }

  const performRestore = async (mode: 'overwrite' | 'merge') => {
    const modeText = mode === 'overwrite' 
      ? 'Isso irá APAGAR todas as notas atuais e substituir pelo backup.' 
      : 'Isso irá MANTER as notas atuais e adicionar as do backup (pode criar duplicatas).'

    Alert.alert(
      mode === 'overwrite' ? 'Sobrescrever Tudo?' : 'Mesclar Dados?',
      modeText + ' Deseja continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Continuar',
          style: mode === 'overwrite' ? 'destructive' : 'default',
          onPress: async () => {
            try {
              const result = await DocumentPicker.getDocumentAsync({
                type: 'application/json',
                copyToCacheDirectory: true
              })

              if (result.assets?.[0]?.uri) {
                await backupService.restoreBackup(result.assets[0].uri, mode)
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                Alert.alert('Sucesso', 'Backup restaurado! Reinicie o app.')
              }
            } catch {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
              Alert.alert('Erro', 'Não foi possível restaurar o backup')
            }
          }
        }
      ]
    )
  }

  const handleResetPasswordPress = async () => {
    const hasPassword = await passwordStorage.hasPassword()
    
    if (!hasPassword) {
      Alert.alert(
        'Nenhuma Senha Definida',
        'Você ainda não definiu uma senha. Crie uma nota bloqueada para definir sua senha.',
        [{ text: 'OK' }]
      )
      return
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setResetPasswordModalVisible(true)
  }

  const handleResetPasswordSubmit = async () => {
    // Verificar senha atual
    const isCurrentValid = await passwordStorage.verifyPassword(currentPassword)
    
    if (!isCurrentValid) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      Alert.alert('Erro', 'Senha atual incorreta')
      return
    }

    // Validar nova senha
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Erro', 'As senhas não coincidem')
      return
    }

    if (newPassword.length < 4) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 4 caracteres')
      return
    }

    if (newPassword === currentPassword) {
      Alert.alert('Erro', 'A nova senha deve ser diferente da senha atual')
      return
    }

    try {
      await passwordStorage.setPassword(newPassword)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      Alert.alert('Sucesso', 'Senha redefinida com sucesso!')
      setResetPasswordModalVisible(false)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
    } catch {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      Alert.alert('Erro', 'Não foi possível redefinir a senha')
    }
  }

  return (
    <BackgroundScreen>
      <S.Container>
        <S.Header>
          <S.Title>Configurações</S.Title>
        </S.Header>

        <S.Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 24,
          }}
        >
          <S.Section>
            <S.SectionTitle>Aparência</S.SectionTitle>
            
            <S.OptionButton onPress={handleToggleTheme} isLast>
              <S.OptionLeft>
                <S.OptionIcon>
                  <Ionicons 
                    name={themeMode === 'dark' ? 'moon' : 'sunny'} 
                    size={24} 
                    color={theme.product.purple_500} 
                  />
                </S.OptionIcon>
                <S.OptionInfo>
                  <S.OptionTitle>Tema {themeMode === 'dark' ? 'Escuro' : 'Claro'}</S.OptionTitle>
                  <S.OptionDescription>
                    Alternar entre tema claro e escuro
                  </S.OptionDescription>
                </S.OptionInfo>
              </S.OptionLeft>
              <S.OptionRight>
                <Switch
                  value={themeMode === 'dark'}
                  onValueChange={handleToggleTheme}
                  trackColor={{ 
                    false: theme.base.shape_third, 
                    true: theme.product.purple_500 
                  }}
                  thumbColor={theme.base.white}
                  ios_backgroundColor={theme.base.shape_third}
                />
              </S.OptionRight>
            </S.OptionButton>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Segurança</S.SectionTitle>
            
            <S.OptionButton onPress={handleResetPasswordPress} isLast>
              <S.OptionLeft>
                <S.OptionIcon>
                  <Ionicons name="key" size={24} color={theme.product.green_500} />
                </S.OptionIcon>
                <S.OptionInfo>
                  <S.OptionTitle>Redefinir Senha</S.OptionTitle>
                  <S.OptionDescription>
                    Altere a senha de proteção das notas bloqueadas
                  </S.OptionDescription>
                </S.OptionInfo>
              </S.OptionLeft>
              <S.OptionRight>
                <Ionicons name="chevron-forward" size={20} color={theme.base.placeholder} />
              </S.OptionRight>
            </S.OptionButton>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Backup</S.SectionTitle>
            
            <S.OptionButton onPress={handleBackup}>
              <S.OptionLeft>
                <S.OptionIcon>
                  <Ionicons name="cloud-upload" size={24} color={theme.product.blue_500} />
                </S.OptionIcon>
                <S.OptionInfo>
                  <S.OptionTitle>Fazer Backup</S.OptionTitle>
                  <S.OptionDescription>
                    Salvar cópia das suas notas
                  </S.OptionDescription>
                </S.OptionInfo>
              </S.OptionLeft>
              <S.OptionRight>
                <Ionicons name="chevron-forward" size={20} color={theme.base.placeholder} />
              </S.OptionRight>
            </S.OptionButton>

            <S.OptionButton onPress={handleRestore} isLast>
              <S.OptionLeft>
                <S.OptionIcon>
                  <Ionicons name="cloud-download" size={24} color={theme.product.green_500} />
                </S.OptionIcon>
                <S.OptionInfo>
                  <S.OptionTitle>Restaurar Backup</S.OptionTitle>
                  <S.OptionDescription>
                    Recuperar notas de um backup
                  </S.OptionDescription>
                </S.OptionInfo>
              </S.OptionLeft>
              <S.OptionRight>
                <Ionicons name="chevron-forward" size={20} color={theme.base.placeholder} />
              </S.OptionRight>
            </S.OptionButton>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Sobre</S.SectionTitle>
            
            <S.OptionButton onPress={() => {}} isLast>
              <S.OptionLeft>
                <S.OptionIcon>
                  <Ionicons name="information-circle" size={24} color={theme.product.blue_500} />
                </S.OptionIcon>
                <S.OptionInfo>
                  <S.OptionTitle>Versão do App</S.OptionTitle>
                  <S.OptionDescription>
                    1.0.0
                  </S.OptionDescription>
                </S.OptionInfo>
              </S.OptionLeft>
            </S.OptionButton>
          </S.Section>
        </S.Content>
      </S.Container>

      <Modal
        visible={resetPasswordModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => {
          setResetPasswordModalVisible(false)
          setCurrentPassword('')
          setNewPassword('')
          setConfirmNewPassword('')
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <S.ModalOverlay>
            <S.ModalContent>
            <S.ModalIcon>
              <Ionicons name="key" size={48} color={theme.product.green_500} />
            </S.ModalIcon>
            
            <S.ModalTitle>Redefinir Senha</S.ModalTitle>
            <S.ModalDescription>
              Digite sua senha atual e escolha uma nova senha para suas notas bloqueadas.
            </S.ModalDescription>

            <S.PasswordField>
              <Input
                placeholder="Senha atual"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
                autoFocus
              />
            </S.PasswordField>

            <S.PasswordField>
              <Input
                placeholder="Nova senha"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />
            </S.PasswordField>

            <S.PasswordField>
              <Input
                placeholder="Confirme a nova senha"
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
                secureTextEntry
              />
            </S.PasswordField>

            <S.ModalButtons>
              <S.ModalButton 
                variant="secondary" 
                onPress={() => {
                  setResetPasswordModalVisible(false)
                  setCurrentPassword('')
                  setNewPassword('')
                  setConfirmNewPassword('')
                }}
              >
                <S.ModalButtonText variant="secondary">
                  Cancelar
                </S.ModalButtonText>
              </S.ModalButton>

              <S.ModalButton 
                variant="primary" 
                onPress={handleResetPasswordSubmit}
              >
                <S.ModalButtonText variant="primary">
                  Confirmar
                </S.ModalButtonText>
              </S.ModalButton>
            </S.ModalButtons>
            </S.ModalContent>
          </S.ModalOverlay>
        </KeyboardAvoidingView>
      </Modal>
    </BackgroundScreen>
  )
}
