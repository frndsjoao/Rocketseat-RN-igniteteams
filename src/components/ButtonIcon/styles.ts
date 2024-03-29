import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export type ButtonIconTypeStyleProps = "PRIMARY" | "SECONDARY";
type Props = {
  type: ButtonIconTypeStyleProps;
};

export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;
  margin-left: 12px;

  justify-content: center;
  align-items: center;
`;

export const Icon = styled(MaterialIcons).attrs<Props>(({ theme, type = "PRIMARY" }) => ({
  size: 24,
  color: type === "PRIMARY" ? theme.COLORS.GREEN_700 : theme.COLORS.RED,
}))``;
