import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faCode,
  faAlignCenter,
  faAlignLeft,
  faAlignRight
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { InlineButton } from "../components/Buttons";

export const FormatToolbar = props => {
  const { editor } = props;
  return (
    <FormatToolbarWrapper>
      <InlineButton className="tooltip-icon-button">
        <FontAwesomeIcon
          icon={faBold}
          onClick={() => {
            editor.toggleMark("bold");
            editor.focus();
          }}
        />
      </InlineButton>
      <InlineButton className="tooltip-icon-button">
        <FontAwesomeIcon
          icon={faItalic}
          onClick={() => {
            editor.toggleMark("italic");
            editor.focus();
          }}
        />
      </InlineButton>
      <InlineButton className="tooltip-icon-button">
        <FontAwesomeIcon
          icon={faCode}
          onClick={() => {
            editor.toggleMark("code");
            editor.focus();
          }}
        />
      </InlineButton>
      <InlineButton className="tooltip-icon-button">
        <FontAwesomeIcon
          icon={faAlignLeft}
          onClick={() => {
            editor.alignLeft();
            editor.focus();
          }}
        />
      </InlineButton>
      <InlineButton className="tooltip-icon-button">
        <FontAwesomeIcon
          icon={faAlignCenter}
          onClick={() => {
            editor.alignCenter();
            editor.focus();
          }}
        />
      </InlineButton>
      <InlineButton className="tooltip-icon-button">
        <FontAwesomeIcon
          icon={faAlignRight}
          onClick={() => {
            editor.alignRight();
            editor.focus();
          }}
        />
      </InlineButton>
    </FormatToolbarWrapper>
  );
};

const FormatToolbarWrapper = styled.div`
  display: flex;
  border-bottom: solid 1.7px rgba(199, 198, 255, 0.15);
  padding: 10px 0;
  margin: 0 0 10px 0;
`;
