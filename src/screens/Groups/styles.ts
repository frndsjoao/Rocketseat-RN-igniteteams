import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  align-items: center;
  padding: 60px 24px 0;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 16px;
`;
