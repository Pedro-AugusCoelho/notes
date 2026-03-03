import styled from 'styled-components/native'

export const HeaderRow = styled.View`
  margin-bottom: 12px;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.xlarge}px;
  color: ${({ theme }) => theme.base.title};
  margin-bottom: 16px;
`

export const Field = styled.View`
  margin-bottom: 16px;
`

export const SectionTitle = styled.Text`
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.small}px;
  color: ${({ theme }) => theme.base.text};
  margin-bottom: 8px;
`

export const ColorGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
`

export const ColorButton = styled.Pressable<{ color: string; selected: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: ${({ color }) => color};
  border-width: ${({ selected }) => (selected ? '3px' : '0px')};
  border-color: ${({ theme }) => theme.base.white};
`
