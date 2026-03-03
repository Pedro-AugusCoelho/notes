import styled from 'styled-components/native'

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  position: relative;
`

export const Title = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.xlarge}px;
  color: ${({ theme }) => theme.base.title};
`

export const MenuContainer = styled.View`
  position: relative;
`

export const MenuBackdrop = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`

export const MenuDropdown = styled.View`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: ${({ theme }) => theme.base.shape_secondary};
  border-radius: 8px;
  padding: 8px;
  min-width: 160px;
  z-index: 1000;
`

export const MenuOption = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 6px;
`

export const MenuOptionText = styled.Text`
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.small}px;
  color: ${({ theme }) => theme.base.title};
`

export const Form = styled.View`
  flex: 1;
`

export const Field = styled.View`
  margin-bottom: 12px;
`

export const DescriptionField = styled.View`
  flex: 1;
  margin-bottom: 12px;
`

export const ErrorText = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.font.family.regular};
  color: ${({ theme }) => theme.product.red_500};
  margin-top: 4px;
`

export const GroupSelectorField = styled.View`
  margin-bottom: 12px;
`

interface GroupSelectorProps {
  borderColor: string;
}

export const GroupSelector = styled.Pressable<GroupSelectorProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px 6px;
  border-radius: 6px;
  border: 1px solid ${({ borderColor }) => borderColor};
  background-color: ${({ theme }) => theme.base.shape_primary};
`

export const GroupSelectorText = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.font.family.regular};
  font-size: ${({ theme }) => theme.font.sizes.small}px;
  color: ${({ theme }) => theme.base.title};
`

export const SheetWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
`

export const SheetBackdrop = styled.Pressable`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`

export const SheetContainer = styled.View`
  background-color: ${({ theme }) => theme.base.shape_secondary};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 16px;
  max-height: 60%;
`

export const SheetHandle = styled.View`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.base.shape_third};
  align-self: center;
  margin-bottom: 12px;
`

export const SheetTitle = styled.Text`
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.medium}px;
  color: ${({ theme }) => theme.base.title};
  margin-bottom: 12px;
`

export const CreateGroupButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 2px dashed ${({ theme }) => theme.product.green_500};
  background-color: ${({ theme }) => theme.base.shape_primary};
`

export const CreateGroupButtonText = styled.Text`
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.small}px;
  color: ${({ theme }) => theme.product.green_500};
`

export const EmptyGroupsContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
`

export const EmptyGroupsText = styled.Text`
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.medium}px;
  color: ${({ theme }) => theme.base.title};
  text-align: center;
  margin-top: 16px;
`

export const EmptyGroupsSubtext = styled.Text`
  font-family: ${({ theme }) => theme.font.family.regular};
  font-size: ${({ theme }) => theme.font.sizes.small}px;
  color: ${({ theme }) => theme.base.placeholder};
  text-align: center;
  margin-top: 8px;
`

interface GroupOptionProps {
  isSelected: boolean;
  borderColor: string;
}

export const GroupOption = styled.Pressable<GroupOptionProps>`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  border: 2px solid ${({ isSelected, borderColor, theme }) => isSelected ? borderColor : theme.base.shape_third};
  background-color: ${({ isSelected }) => isSelected ? 'rgba(0, 0, 0, 0.05)' : 'transparent'};
`

export const GroupOptionDot = styled.View<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${({ color }) => color};
  margin-right: 12px;
`

export const GroupOptionName = styled.Text`
  font-family: ${({ theme }) => theme.font.family.regular};
  font-size: ${({ theme }) => theme.font.sizes.medium}px;
  color: ${({ theme }) => theme.base.title};
`

export const PasswordModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
`

export const PasswordModalContent = styled.View`
  background-color: ${({ theme }) => theme.base.shape_secondary};
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
`

export const PasswordModalIcon = styled.View`
  align-items: center;
  margin-bottom: 16px;
`

export const PasswordModalTitle = styled.Text`
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.xlarge}px;
  color: ${({ theme }) => theme.base.title};
  text-align: center;
  margin-bottom: 12px;
`

export const PasswordModalDescription = styled.Text`
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

export const PasswordModalButtons = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-top: 8px;
`

interface PasswordModalButtonProps {
  variant: 'primary' | 'secondary';
}

export const PasswordModalButton = styled.Pressable<PasswordModalButtonProps>`
  flex: 1;
  padding: 14px;
  border-radius: 8px;
  align-items: center;
  background-color: ${({ variant, theme }) => 
    variant === 'primary' ? theme.product.green_500 : theme.base.shape_third};
`

export const PasswordModalButtonText = styled.Text<PasswordModalButtonProps>`
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.medium}px;
  color: ${({ variant, theme }) => 
    variant === 'primary' ? theme.base.white : theme.base.text};
`
