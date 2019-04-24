import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeading,
  faCode,
  faImage,
  faParagraph,
  faTable,
  faListUl,
  faListOl,
  faCircle,
  faChevronCircleRight,
  faStickyNote,
  faDatabase
} from "@fortawesome/free-solid-svg-icons";
import { BlockButton, PrimaryButton } from "../components/Buttons";
import styled from "styled-components";
import Popup from "reactjs-popup";
import { Input, InlineForm, Textarea, Label } from "../components/FormElements";
import { PopupWrapper } from "./Popup";

export const BlocksToolbar = props => {
  const { editor, onChange } = props;

  return (
    <BlocksToolbarWrapper>
      <BlockButton
        onClick={() => {
          if (editor.isList() && !editor.isBlockEmpty()) {
            editor.insertBlock("paragraph").unwrapList();
          } else {
            editor.setBlocks("paragraph").unwrapList();
          }
          editor.focus();
        }}
      >
        <FontAwesomeIcon icon={faParagraph} />
      </BlockButton>
      <BlockButton
        onClick={e => {
          e.preventDefault();
          editor.insertBlock("hr");
        }}
      >
        __
      </BlockButton>
      <BlockButton
        onClick={() => {
          if (editor.isBlockEmpty()) {
            editor.setBlocks("code");
          } else {
            editor.insertBlock("code").unwrapList();
          }

          editor.focus();
        }}
      >
        <FontAwesomeIcon icon={faCode} />
      </BlockButton>
      <BlockButton
        onClick={() => {
          if (editor.isBlockEmpty()) {
            editor.setBlocks("nonexecutable-code");
          } else {
            editor.insertBlock("nonexecutable-code").unwrapList();
          }

          editor.focus();
        }}
      >
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon={faCircle} size="lg" />
          <FontAwesomeIcon icon={faCode} size="xs" inverse />
        </span>
      </BlockButton>
      <BlockButton
        onClick={() => {
          if (editor.isBlockEmpty()) {
            editor.setBlocks("sample-output");
          } else {
            editor.insertBlock("sample-output").unwrapList();
          }

          editor.focus();
        }}
      >
        <FontAwesomeIcon icon={faChevronCircleRight} />
      </BlockButton>
      <BlockButton
        onClick={() => {
          editor.setBlocks("heading-1");
          !editor.isBlockEmpty() &&
            editor
              .moveToEndOfBlock()
              .insertBlock("paragraph")
              .unwrapList();
          editor.focus();
        }}
      >
        <FontAwesomeIcon icon={faHeading} />
      </BlockButton>
      <BlockButton
        onClick={() => {
          editor.setBlocks("heading-2");
          !editor.isBlockEmpty() &&
            editor
              .moveToEndOfBlock()
              .insertBlock("paragraph")
              .unwrapList();
          editor.focus();
        }}
      >
        <FontAwesomeIcon icon={faHeading} size="sm" />
      </BlockButton>
      <Popup
        modal
        trigger={
          <BlockButton className="tooltip-icon-button">
            <FontAwesomeIcon icon={faImage} />
          </BlockButton>
        }
      >
        {close => <InsertImagePopup {...props} closePopup={close} />}
      </Popup>

      <BlockButton
        onClick={e => {
          e.preventDefault();
          if (!editor.isList()) {
            onChange(editor.insertUnorderedList());
          } else {
            onChange(editor.unwrapList());
          }
        }}
      >
        <FontAwesomeIcon icon={faListUl} />
      </BlockButton>
      <BlockButton>
        <FontAwesomeIcon
          icon={faListOl}
          onClick={e => {
            e.preventDefault();
            if (!editor.isList()) {
              onChange(editor.insertOrderedList());
            } else {
              onChange(editor.unwrapList());
            }
          }}
        />
      </BlockButton>
      <BlockButton>
        <div
          onClick={e => {
            e.preventDefault();
            onChange(editor.insertBlock("pre"));
          }}
        >
          pre
        </div>
      </BlockButton>
      <BlockButton>
        <FontAwesomeIcon
          icon={faStickyNote}
          onClick={e => {
            e.preventDefault();
            onChange(editor.insertNote());
          }}
        />
      </BlockButton>
      <Popup
        trigger={
          <BlockButton>
            <FontAwesomeIcon
              icon={faDatabase}
              onClick={e => {
                e.preventDefault();
              }}
            />
          </BlockButton>
        }
        modal
      >
        {close => <InsertMetadataPopup {...props} closePopup={close} />}
      </Popup>

      <BlockButton>
        <FontAwesomeIcon
          icon={faTable}
          onClick={e => {
            e.preventDefault();
            onChange(editor.insertTable().unwrapList());
          }}
        />
      </BlockButton>
      {editor && editor.isSelectionInTable() && (
        <>
          <button onClick={() => onChange(editor.removeTable())}>
            Delete Table
          </button>
          <button onClick={() => onChange(editor.insertRow())}>
            Insert Row
          </button>
          <button onClick={() => onChange(editor.removeRow())}>
            Delete Row
          </button>
          <button onClick={() => onChange(editor.insertColumn())}>
            Insert Column
          </button>
          <button onClick={() => onChange(editor.removeColumn())}>
            Delete Column
          </button>
          <button onClick={() => onChange(editor.toggleTableHeaders())}>
            Toggle header
          </button>
        </>
      )}
    </BlocksToolbarWrapper>
  );
};

const BlocksToolbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 10%;
`;

const InsertImagePopup = props => {
  const { editor, closePopup } = props;
  const [imageUrl, setImageUrl] = useState("https://placekitten.com/200/300");

  return (
    <PopupWrapper>
      <InlineForm>
        <Input
          type="text"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />
        <PrimaryButton
          onClick={e => {
            e.preventDefault();
            const image = {
              type: "image",
              data: {
                src: imageUrl
              }
            };
            editor.isBlockEmpty()
              ? editor.setBlocks(image)
              : editor.insertBlock(image);
            editor.insertBlock("paragraph");
            editor.focus();
            closePopup();
          }}
        >
          Insert
        </PrimaryButton>
      </InlineForm>
    </PopupWrapper>
  );
};

const InsertMetadataPopup = props => {
  const { editor, closePopup } = props;

  const block = editor.value.startBlock;

  const [metaKey, setMetaKey] = useState(block.data.keySeq().first() || "");
  const [metaValue, setMetaValue] = useState(block.data.first() || "");

  return (
    <PopupWrapper>
      <h2>Add metadata</h2>

      <Label>Key</Label>
      <Input
        type="text"
        defaultValue={metaKey}
        onChange={e => setMetaKey(e.target.value)}
      />
      <Label>Value</Label>
      <Textarea
        defaultValue={metaValue}
        onChange={e => setMetaValue(e.target.value)}
      />
      <PrimaryButton
        onClick={e => {
          e.preventDefault();
          if (metaKey !== "" && metaValue !== "") {
            editor.setNodeByKey(block.key, { data: { [metaKey]: metaValue } });
          }
          editor.focus();
          closePopup();
        }}
      >
        Add metadata
      </PrimaryButton>
    </PopupWrapper>
  );
};
