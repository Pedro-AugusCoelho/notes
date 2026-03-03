import styled from 'styled-components/native'
import { theme } from '@src/../theme'

type ProductColorKey = keyof typeof theme.product

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.xlarge}px;
  color: ${({ theme }) => theme.base.title};
`

export const GroupsList = styled.ScrollView`
  flex: 1;
`

export const GroupItem = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.base.shape_secondary};
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 8px;
  gap: 12px;
`

export const GroupBadge = styled.View<{ colorKey: ProductColorKey }>`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${({ theme, colorKey }) => theme.product[colorKey]};
`

export const GroupName = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.medium}px;
  color: ${({ theme }) => theme.base.title};
`

export const CreateButtonWrapper = styled.View`
  position: absolute;
  bottom: 16px;
  right: 16px;
`
