import { useCallback, useEffect, useState } from 'react'
import { notesStorage, NoteWithTimestamp } from '@src/services/storage'
import { Note } from '@src/@types/note'

export function useNotes() {
  const [notes, setNotes] = useState<NoteWithTimestamp[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadNotes = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await notesStorage.getAll()
      setNotes(data)
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao carregar notas:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getNotesByGroup = useCallback(
    async (groupId: string) => {
      try {
        return await notesStorage.getByGroupId(groupId)
      } catch (error) {
        // eslint-disable-next-line no-undef
        console.error('Erro ao buscar notas do grupo:', error)
        return []
      }
    },
    [],
  )

  const getNotesWithoutGroup = useCallback(() => {
    return notes.filter((note) => !note.id_group || note.id_group === '')
  }, [notes])

  const createNote = useCallback(
    async (data: Omit<Note, 'id'>) => {
      try {
        const newNote = await notesStorage.create(data)
        setNotes((prev) => [...prev, newNote])
        return newNote
      } catch (error) {
        // eslint-disable-next-line no-undef
        console.error('Erro ao criar nota:', error)
        throw error
      }
    },
    [],
  )

  const updateNote = useCallback(
    async (id: string, data: Partial<Omit<Note, 'id'>>) => {
      try {
        const updated = await notesStorage.update(id, data)
        if (updated) {
          setNotes((prev) =>
            prev.map((n) => (n.id === id ? updated : n)),
          )
        }
        return updated
      } catch (error) {
        // eslint-disable-next-line no-undef
        console.error('Erro ao atualizar nota:', error)
        throw error
      }
    },
    [],
  )

  const deleteNote = useCallback(
    async (id: string) => {
      try {
        const success = await notesStorage.delete(id)
        if (success) {
          setNotes((prev) => prev.filter((n) => n.id !== id))
        }
        return success
      } catch (error) {
        // eslint-disable-next-line no-undef
        console.error('Erro ao deletar nota:', error)
        throw error
      }
    },
    [],
  )

  const deleteNotesByGroup = useCallback(
    async (groupId: string) => {
      try {
        await notesStorage.deleteByGroupId(groupId)
        setNotes((prev) => prev.filter((n) => n.id_group !== groupId))
      } catch (error) {
        // eslint-disable-next-line no-undef
        console.error('Erro ao deletar notas do grupo:', error)
        throw error
      }
    },
    [],
  )

  const clearNotes = useCallback(async () => {
    try {
      await notesStorage.clear()
      setNotes([])
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao limpar notas:', error)
      throw error
    }
  }, [])

  useEffect(() => {
    loadNotes()
  }, [loadNotes])

  return {
    notes,
    isLoading,
    loadNotes,
    getNotesByGroup,
    getNotesWithoutGroup,
    createNote,
    updateNote,
    deleteNote,
    deleteNotesByGroup,
    clearNotes,
  }
}
