import styled from "styled-components/native"

interface InputProps {
    readonly: boolean;
}

export const Input = styled.TextInput.attrs<InputProps>(({ theme, readonly }) => ({
    placeholderTextColor: theme.base.text,
    editable: !readonly,
}))<InputProps>`
    font-size: ${({ theme }) => theme.font.sizes.medium}px;
    font-family: ${({ theme }) => theme.font.family.regular};

    background-color: ${({ theme }) => theme.base.shape_primary };
    color: ${({ theme }) => theme.base.title };
    opacity: ${({ readonly }) => readonly ? 0.6 : 1};
    
    border-width: ${({ readonly }) => readonly ? '1px' : '0px'};
    border-style: ${({ readonly }) => readonly ? 'dashed' : 'solid'};
    border-color: ${({ theme, readonly }) => readonly ? theme.base.placeholder : 'transparent'};
    border-radius: 6px;
    
    padding: 16px 10px;

    width: 100%;
`
