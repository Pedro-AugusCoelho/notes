import AsyncStorage from '@react-native-async-storage/async-storage'

const PASSWORD_KEY = '@notas:password'

export const passwordStorage = {
  async hasPassword(): Promise<boolean> {
    try {
      const password = await AsyncStorage.getItem(PASSWORD_KEY)
      return password !== null
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao verificar senha:', error)
      return false
    }
  },

  async setPassword(password: string): Promise<void> {
    try {
      await AsyncStorage.setItem(PASSWORD_KEY, password)
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao definir senha:', error)
      throw error
    }
  },

  async verifyPassword(password: string): Promise<boolean> {
    try {
      const storedPassword = await AsyncStorage.getItem(PASSWORD_KEY)
      return storedPassword === password
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao verificar senha:', error)
      return false
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(PASSWORD_KEY)
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao limpar senha:', error)
      throw error
    }
  },
}
