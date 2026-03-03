import AsyncStorage from '@react-native-async-storage/async-storage'
import { Group } from '@src/@types/group'
import { nanoid } from 'nanoid/non-secure'

const GROUPS_KEY = '@notas:groups'

export const groupsStorage = {
  async getAll(): Promise<Group[]> {
    try {
      const data = await AsyncStorage.getItem(GROUPS_KEY)
      return data ? JSON.parse(data) : []
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao buscar grupos:', error)
      return []
    }
  },

  async getById(id: string): Promise<Group | null> {
    try {
      const groups = await this.getAll()
      return groups.find((g) => g.id === id) || null
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao buscar grupo:', error)
      return null
    }
  },

  async create(data: Omit<Group, 'id'>): Promise<Group> {
    try {
      const groups = await this.getAll()
      const newGroup: Group = {
        ...data,
        id: nanoid(),
      }
      groups.push(newGroup)
      await AsyncStorage.setItem(GROUPS_KEY, JSON.stringify(groups))
      return newGroup
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao criar grupo:', error)
      throw error
    }
  },

  async update(id: string, data: Partial<Omit<Group, 'id'>>): Promise<Group | null> {
    try {
      const groups = await this.getAll()
      const index = groups.findIndex((g) => g.id === id)
      
      if (index === -1) {
        return null
      }

      groups[index] = { ...groups[index], ...data }
      await AsyncStorage.setItem(GROUPS_KEY, JSON.stringify(groups))
      return groups[index]
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao atualizar grupo:', error)
      throw error
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const groups = await this.getAll()
      const filtered = groups.filter((g) => g.id !== id)
      
      if (filtered.length === groups.length) {
        return false
      }

      await AsyncStorage.setItem(GROUPS_KEY, JSON.stringify(filtered))
      return true
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao deletar grupo:', error)
      throw error
    }
  },

  async deleteAndUnlinkNotes(id: string): Promise<{ success: boolean; unlinkedNotesCount: number }> {
    try {
      // Importar notesStorage dinamicamente para evitar dependência circular
      const { notesStorage } = await import('./notesStorage')
      
      // Desvincular as notas do grupo
      const unlinkedNotesCount = await notesStorage.unlinkNotesFromGroup(id)
      
      // Deletar o grupo
      const success = await this.delete(id)
      
      return { success, unlinkedNotesCount }
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao deletar grupo e desvincular notas:', error)
      throw error
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(GROUPS_KEY)
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao limpar grupos:', error)
      throw error
    }
  },
}
