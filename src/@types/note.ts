export type UUID = string

export interface Note {
  id: UUID
  id_group: UUID
  title: string
  description: string
  isSecret?: boolean
}
