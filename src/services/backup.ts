import { Paths, File } from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const backupService = {
  async createBackup() {
    // Pega todos os dados do AsyncStorage
    const keys = await AsyncStorage.getAllKeys()
    const items = await AsyncStorage.multiGet(keys)
    
    const backup = {
      version: '1.0.0',
      date: new Date().toISOString(),
      data: Object.fromEntries(items)
    }

    // Salva em arquivo JSON
    const fileName = `notas_backup_${new Date().getTime()}.json`
    const file = new File(Paths.cache, fileName)
    
    await file.write(JSON.stringify(backup, null, 2))

    // Compartilha o arquivo
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(file.uri, {
        mimeType: 'application/json',
        dialogTitle: 'Salvar backup das notas'
      })
    }

    return true
  },

  async restoreBackup(fileUri: string, mode: 'overwrite' | 'merge' = 'overwrite') {
    const file = new File(fileUri)
    const content = await file.text()
    const backup = JSON.parse(content)

    if (!backup.data) {
      throw new Error('Formato de backup inválido')
    }

    const entries = Object.entries(backup.data) as [string, string][]

    if (mode === 'overwrite') {
      // Limpa tudo antes de restaurar
      const existingKeys = await AsyncStorage.getAllKeys()
      await AsyncStorage.multiRemove(existingKeys)
      await AsyncStorage.multiSet(entries)
    } else {
      // Merge: mantém dados existentes e adiciona novos (pode duplicar)
      await AsyncStorage.multiSet(entries)
    }

    return true
  }
}
