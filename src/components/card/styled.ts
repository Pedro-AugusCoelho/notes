import styled from 'styled-components/native'

export const CardContainer = styled.Pressable`
  flex: 1;
`

export const Container = styled.View`
  background-color: ${({ theme }) => theme.base.shape_secondary};
  border-radius: 8px;
  padding: 16px;
  padding-left: 22px;
  min-height: 110px;
  justify-content: space-between;
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;
  flex-direction: column;
`

export const MainContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
`

export const Ribbon = styled.View<{ ribbonColor: string }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6px;
  background-color: ${({ ribbonColor }) => ribbonColor};
`

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`

export const RightSection = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

export const GroupIndicator = styled.View<{ groupColor: string }>`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${({ groupColor }) => groupColor};
  align-items: center;
  justify-content: center;
`

export const ArrowIcon = styled.View`
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
`

export const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`

export const Title = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.large}px;
  color: ${({ theme }) => theme.base.title};
`

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.font.family.regular};
  font-size: ${({ theme }) => theme.font.sizes.medium}px;
  color: ${({ theme }) => theme.base.text};
`

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`

export const FooterItem = styled.View`
  flex-direction: row;
  align-items: center;
`

export const DateText = styled.Text`
  font-family: ${({ theme }) => theme.font.family.regular};
  font-size: ${({ theme }) => theme.font.sizes.small}px;
  color: ${({ theme }) => theme.base.placeholder};
`
