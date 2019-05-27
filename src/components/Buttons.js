import styled from "styled-components";
import { palette } from "../styles/palette";
import { fontFamilies } from "../styles/fonts";

export const Button = styled.button`
  cursor: pointer;
  outline: none;
`;

export const BlockButton = styled(Button)`
  border: 1px solid #ccc;
  padding: 7px;
  margin: 3px;
  cursor: pointer;
  outline: none;
  font-size: 13px;
  color: #777;
`;

export const InlineButton = styled(Button)`
  font-size: 13px;
`;

export const PrimaryButton = styled.button`
  background: ${palette.TEAL};
  color: ${palette.WHITE};
  height: 30px;
  margin: 0 10px;
  font-size: 16px;
  font-family: ${fontFamilies.MONOSPACE};
`;
