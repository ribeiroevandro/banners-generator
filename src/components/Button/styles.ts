import styled from 'styled-components';

export const Container = styled.button`
  background-color: var(--primary);
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;
  &:hover {
    background-color: var(--secondary);
  }
`;
