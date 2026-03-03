import { theme } from '@src/../theme'

export type UUID = string
export type ProductColorKey = keyof typeof theme.product

export interface Group {
  id: UUID
  name: string
  colorKey: ProductColorKey
}
