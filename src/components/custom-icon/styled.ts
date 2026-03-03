import styled from "styled-components/native"
import { Ionicons } from "@expo/vector-icons"
import type { ComponentProps } from "react"

type IoniconsName = ComponentProps<typeof Ionicons>['name']

interface IconStyleProps {
  color: string
}

export const Icon = styled(Ionicons).attrs<Partial<ComponentProps<typeof Ionicons>>>(({ name, size }) => ({
  name: (name ?? 'help') as IoniconsName,
  size: size ?? 24,
}))<IconStyleProps>`
  color: ${({ theme, color }) =>
  color in theme.base
    ? theme.base[color as keyof typeof theme.base]
    : theme.product[color as keyof typeof theme.product]
  };
`