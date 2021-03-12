import styled, { css } from 'styled-components'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
  border-radius: 10px;
  border: 2px solid #fff;
  padding: 0 16px;
  width: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }

  &:parent {
    margin-top: 8px;
    background: #000;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
      svg {
        margin-right: 0;
      }
    `}
  ${(props) =>
    props.isFocused &&
    css`
      color: #fff;
      border-color: #fff;
    `}
  ${(props) =>
    props.isFilled &&
    css`
      color: #fff;
    `}
  input {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--background);
    line-height: 4.3rem;
    &::placeholder {
      color: #fff;
    }
  }
  svg {
    margin-right: 16px;
    width: 1.5em;
    height: 1.5em;
  }
`
