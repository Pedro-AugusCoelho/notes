import { useCallback, useEffect, useState } from 'react'
import { groupsStorage } from '@src/services/storage'
import { Group } from '@src/@types/group'

export function useGroups() {
  const [groups, setGroups] = useState<Group[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadGroups = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await groupsStorage.getAll()
      setGroups(data)
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao carregar grupos:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createGroup = useCallback(
    async (data: Omit<Group, 'id'>) => {
      try {
        const newGroup = await groupsStorage.create(data)
        setGroups((prev) => [...prev, newGroup])
        return newGroup
      } catch (error) {
        // eslint-disable-next-line no-undef
        console.error('Erro ao criar grupo:', error)
        throw error
      }
    },
    [],
  )

  const updateGroup = useCallback(
    async (id: string, data: Partial<Omit<Group, 'id'>>) => {
      try {
        const updated = await groupsStorage.update(id, data)
        if (updated) {
          setGroups((prev) =>
            prev.map((g) => (g.id === id ? updated : g)),
          )
        }
        return updated
      } catch (error) {
        // eslint-disable-next-line no-undef
        console.error('Erro ao atualizar grupo:', error)
        throw error
      }
    },
    [],
  )

  const deleteGroup = useCallback(
    async (id: string) => {
      try {
        const success = await groupsStorage.delete(id)
        if (success) {
          setGroups((prev) => prev.filter((g) => g.id !== id))
        }
        return success
      } catch (error) {
        // eslint-disable-next-line no-undef
        console.error('Erro ao deletar grupo:', error)
        throw error
      }
    },
    [],
  )

  const deleteGroupAndUnlinkNotes = useCallback(
    async (id: string) => {
      try {
        const result = await groupsStorage.deleteAndUnlinkNotes(id)
        if (result.success) {
          setGroups((prev) => prev.filter((g) => g.id !== id))
        }
        return result
      } catch (error) {
        // eslint-disable-next-line no-undef
        console.error('Erro ao deletar grupo e desvincular notas:', error)
        throw error
      }
    },
    [],
  )

  const clearGroups = useCallback(async () => {
    try {
      await groupsStorage.clear()
      setGroups([])
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao limpar grupos:', error)
      throw error
    }
  }, [])

  useEffect(() => {
    loadGroups()
  }, [loadGroups])

  return {
    groups,
    isLoading,
    loadGroups,
    createGroup,
    updateGroup,
    deleteGroup,
    deleteGroupAndUnlinkNotes,
    clearGroups,
  }
}
