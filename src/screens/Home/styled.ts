import styled from "styled-components/native"

export const Header = styled.View`
  gap: 12px;
`

export const TopRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const InputWrapper = styled.View`
  flex: 1;
`

export const GroupsScrollView = styled.ScrollView`
  flex-direction: row;
`

export const GroupButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  border-radius: 8px;
  margin-right: 8px;
  min-height: 40px;
  gap: 6px;
  background-color: ${({ theme }) => theme.product.green_500};
  border-width: 1px;
  border-color: ${({ theme }) => theme.base.shape_third};
`

export const GroupButtonText = styled.Text`
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.small}px;
  color: ${({ theme }) => theme.base.white};
`

interface GroupTagProps {
  isActive: boolean
  backgroundColor: string
}

export const GroupTag = styled.Pressable<GroupTagProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 8px;
  margin-right: 8px;
  min-height: 40px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-width: ${({ isActive }) => isActive ? '2px' : '0px'};
  border-color: ${({ theme, isActive }) => isActive ? theme.product.green_500 : 'transparent'};
`

export const GroupDot = styled.View<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ color }) => color};
  margin-right: 6px;
`

interface GroupTagTextProps {
  isActive: boolean
}

export const GroupTagText = styled.Text<GroupTagTextProps>`
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.small}px;
  color: ${({ theme }) => theme.base.white};
`

export const BottomRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
`

export const Actions = styled.View`
  flex-direction: row;
  gap: 8px;
`

export const ErrorText = styled.Text`
  font-size: 12px;
  font-family: ${ ({ theme }) => theme.font.family.regular };
  color: ${ ({ theme }) => theme.product.red_500 };
`

export const FabWrapper = styled.View`
  position: absolute;
  right: 16px;
`

export const Body = styled.ScrollView`
  flex: 1;
  margin-top: 16px;
`

export const BodyContent = styled.View`
  padding-top: 4px;
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
  font-size: ${({ theme }) => theme.font.sizes.large}px;
  color: ${({ theme }) => theme.base.title};
  margin-bottom: 12px;
`

export const EmptyStateContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`

export const EmptyStateText = styled.Text`
  font-family: ${({ theme }) => theme.font.family.regular};
  font-size: ${({ theme }) => theme.font.sizes.small}px;
  color: ${({ theme }) => theme.base.placeholder};
  text-align: center;
  margin-top: 12px;
`

export const EmptyStateEmoji = styled.Text`
  font-size: 48px;
`

export const TutorialOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

export const TutorialBackdrop = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
`

export const TutorialCard = styled.View`
  background-color: ${({ theme }) => theme.base.shape_secondary};
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
`

export const TutorialIcon = styled.View`
  align-items: center;
  margin-bottom: 16px;
`

export const TutorialTitle = styled.Text`
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.xlarge}px;
  color: ${({ theme }) => theme.base.title};
  text-align: center;
  margin-bottom: 20px;
`

export const TutorialContent = styled.View`
  gap: 16px;
  margin-bottom: 24px;
`

export const TutorialItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
`

export const TutorialText = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.font.family.regular};
  font-size: ${({ theme }) => theme.font.sizes.medium}px;
  color: ${({ theme }) => theme.base.text};
  line-height: 22px;
`

export const TutorialBold = styled.Text`
  font-family: ${({ theme }) => theme.font.family.bold};
  color: ${({ theme }) => theme.product.green_500};
`

export const TutorialButton = styled.Pressable`
  background-color: ${({ theme }) => theme.product.green_500};
  padding: 14px;
  border-radius: 8px;
  align-items: center;
`

export const TutorialButtonText = styled.Text`
  font-family: ${({ theme }) => theme.font.family.bold};
  font-size: ${({ theme }) => theme.font.sizes.medium}px;
  color: ${({ theme }) => theme.base.white};
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