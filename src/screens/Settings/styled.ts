import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
  padding: 16px 16px;
  padding-bottom: 12px;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.xlarge}px;
  color: ${({ theme }) => theme.base.title};
`

export const Content = styled.ScrollView`
  flex: 1;
  padding: 0 16px;
`

export const Section = styled.View`
  margin-bottom: 32px;
`

export const SectionTitle = styled.Text`
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.small}px;
  color: ${({ theme }) => theme.base.placeholder};
  text-transform: uppercase;
  margin-bottom: 8px;
  letter-spacing: 1px;
`

interface OptionButtonProps {
  isLast?: boolean;
}

export const OptionButton = styled.Pressable<OptionButtonProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom-width: ${({ isLast }) => isLast ? '0px' : '1px'};
  border-bottom-color: ${({ theme }) => theme.base.shape_third};
`

export const OptionLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  flex: 1;
`

export const OptionIcon = styled.View``

export const OptionInfo = styled.View`
  flex: 1;
`

export const OptionTitle = styled.Text`
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.medium}px;
  color: ${({ theme }) => theme.base.title};
  margin-bottom: 2px;
`

export const OptionDescription = styled.Text`
  font-family: ${({ theme }) => theme.font.family.regular};
  font-size: ${({ theme }) => theme.font.sizes.small}px;
  color: ${({ theme }) => theme.base.text};
`

export const OptionRight = styled.View``

export const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
`

export const ModalContent = styled.View`
  background-color: ${({ theme }) => theme.base.shape_secondary};
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
`

export const ModalIcon = styled.View`
  align-items: center;
  margin-bottom: 16px;
`

export const ModalTitle = styled.Text`
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.xlarge}px;
  color: ${({ theme }) => theme.base.title};
  text-align: center;
  margin-bottom: 12px;
`

export const ModalDescription = styled.Text`
  font-family: ${({ theme }) => theme.font.family.regular};
  font-size: ${({ theme }) => theme.font.sizes.small}px;
  color: ${({ theme }) => theme.base.text};
  text-align: center;
  margin-bottom: 24px;
  line-height: 20px;
`

export const PasswordField = styled.View`
  margin-bottom: 12px;
`

export const ModalButtons = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-top: 8px;
`

interface ModalButtonProps {
  variant: 'primary' | 'secondary';
}

export const ModalButton = styled.Pressable<ModalButtonProps>`
  flex: 1;
  padding: 14px;
  border-radius: 8px;
  align-items: center;
  background-color: ${({ variant, theme }) => 
    variant === 'primary' ? theme.product.green_500 : theme.base.shape_third};
`

export const ModalButtonText = styled.Text<ModalButtonProps>`
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.medium}px;
  color: ${({ variant, theme }) => 
    variant === 'primary' ? theme.base.white : theme.base.text};
`
