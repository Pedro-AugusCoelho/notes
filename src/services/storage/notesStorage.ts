import AsyncStorage from '@react-native-async-storage/async-storage'
import { Note } from '@src/@types/note'
import { nanoid } from 'nanoid/non-secure'

const NOTES_KEY = '@notas:notes'

export interface NoteWithTimestamp extends Note {
  createdAt: string
  updatedAt: string
}

export const notesStorage = {
  async getAll(): Promise<NoteWithTimestamp[]> {
    try {
      const data = await AsyncStorage.getItem(NOTES_KEY)
      return data ? JSON.parse(data) : []
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao buscar notas:', error)
      return []
    }
  },

  async getById(id: string): Promise<NoteWithTimestamp | null> {
    try {
      const notes = await this.getAll()
      return notes.find((n) => n.id === id) || null
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao buscar nota:', error)
      return null
    }
  },

  async getByGroupId(groupId: string): Promise<NoteWithTimestamp[]> {
    try {
      const notes = await this.getAll()
      return notes.filter((n) => n.id_group === groupId)
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao buscar notas do grupo:', error)
      return []
    }
  },

  async create(data: Omit<Note, 'id'>): Promise<NoteWithTimestamp> {
    try {
      const notes = await this.getAll()
      const now = new Date().toISOString()
      const newNote: NoteWithTimestamp = {
        ...data,
        id: nanoid(),
        createdAt: now,
        updatedAt: now,
      }
      notes.push(newNote)
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes))
      return newNote
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao criar nota:', error)
      throw error
    }
  },

  async update(
    id: string,
    data: Partial<Omit<Note, 'id'>>,
  ): Promise<NoteWithTimestamp | null> {
    try {
      const notes = await this.getAll()
      const index = notes.findIndex((n) => n.id === id)

      if (index === -1) {
        return null
      }

      notes[index] = {
        ...notes[index],
        ...data,
        updatedAt: new Date().toISOString(),
      }
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes))
      return notes[index]
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao atualizar nota:', error)
      throw error
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const notes = await this.getAll()
      const filtered = notes.filter((n) => n.id !== id)

      if (filtered.length === notes.length) {
        return false
      }

      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(filtered))
      return true
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao deletar nota:', error)
      throw error
    }
  },

  async deleteByGroupId(groupId: string): Promise<number> {
    try {
      const notes = await this.getAll()
      const filtered = notes.filter((n) => n.id_group !== groupId)
      const deletedCount = notes.length - filtered.length

      if (deletedCount > 0) {
        await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(filtered))
      }

      return deletedCount
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao deletar notas do grupo:', error)
      throw error
    }
  },

  async unlinkNotesFromGroup(groupId: string): Promise<number> {
    try {
      const notes = await this.getAll()
      const notesToUnlink = notes.filter((n) => n.id_group === groupId)
      
      if (notesToUnlink.length === 0) {
        return 0
      }

      const updatedNotes = notes.map((note) => {
        if (note.id_group === groupId) {
          return {
            ...note,
            id_group: '',
            updatedAt: new Date().toISOString(),
          }
        }
        return note
      })

      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes))
      return notesToUnlink.length
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao desvincular notas do grupo:', error)
      throw error
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(NOTES_KEY)
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao limpar notas:', error)
      throw error
    }
  },
}
