import styled from "styled-components/native"

import { ActivityIndicator } from "react-native"

export const BoxLoading = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const Loading = styled(ActivityIndicator).attrs(({ theme }) => ({
  size: 40,
  color: theme.product.green_500
}))``