import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faCode,
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faLink,
  faUnlink
} from "@fortawesome/free-solid-svg-icons";
import { InlineButton, PrimaryButton } from "../components/Buttons";
import { Input, InlineForm, Textarea, Label } from "../components/FormElements";
import Popup from "reactjs-popup";
import { PopupWrapper } from "./Popup";

export const FormatToolbar = props => {
  const { editor, onChange } = props;
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
        <div
          onClick={() => {
            editor.toggleMark("samp");
            editor.focus();
          }}
        >
          samp
        </div>
      </InlineButton>
      <InlineButton className="tooltip-icon-button">
        <div
          onClick={() => {
            editor.toggleMark("var");
            editor.focus();
          }}
        >
          var
        </div>
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
      <InlineButton className="tooltip-icon-button">
        <div
          onClick={() => {
            editor.toggleMark("sup");
            editor.focus();
          }}
        >
          sup
        </div>
      </InlineButton>
      <InlineButton className="tooltip-icon-button">
        <div
          onClick={() => {
            editor.toggleMark("sub");
            editor.focus();
          }}
        >
          sub
        </div>
      </InlineButton>
      {editor &&
        (editor.hasLinks() ? (
          <InlineButton className="tooltip-icon-button">
            <FontAwesomeIcon
              icon={faUnlink}
              onClick={() => {
                editor.unwrapLink();
              }}
            />
          </InlineButton>
        ) : (
          <Popup
            modal
            trigger={
              <InlineButton className="tooltip-icon-button">
                <FontAwesomeIcon icon={faLink} />
              </InlineButton>
            }
          >
            {close => <InsertLinkPopup {...props} closePopup={close} />}
          </Popup>
        ))}
    </FormatToolbarWrapper>
  );
};

const InsertLinkPopup = props => {
  const { editor, closePopup, onChange } = props;
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const isCollapsed = editor.value.selection.isCollapsed;

  return (
    <PopupWrapper>
      {isCollapsed && (
        <>
          <Label>Text</Label>
          <Input
            type="text"
            value={linkText}
            onChange={e => setLinkText(e.target.value)}
          />
        </>
      )}
      <Label>Link</Label>
      <Input
        type="text"
        value={linkUrl}
        onChange={e => setLinkUrl(e.target.value)}
      />
      <PrimaryButton
        onClick={e => {
          e.preventDefault();
          const href = linkUrl;

          if (isCollapsed) {
            editor
              .insertText(linkText)
              .moveFocusBackward(linkText.length)
              .wrapLink(href)
              .focus();
          } else {
            editor.wrapLink(href);
          }
          closePopup();
        }}
      >
        Insert
      </PrimaryButton>
    </PopupWrapper>
  );
};

const FormatToolbarWrapper = styled.div`
  display: flex;
  border-bottom: solid 1.7px rgba(199, 198, 255, 0.15);
  padding: 10px 0;
  background: white;
`;
