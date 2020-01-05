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
  faDatabase,
  faPlus,
  faCross
} from "@fortawesome/free-solid-svg-icons";
import { BlockButton, PrimaryButton, Button } from "../components/Buttons";
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
          editor.insertText("\n");
          editor.focus();
        }}
      >
        &lt;br&gt;
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
          editor.setBlocks("code");
          editor.focus();
        }}
      >
        <FontAwesomeIcon icon={faCode} />
      </BlockButton>
      <BlockButton
        onClick={() => {
          editor.setBlocks("nonexecutable-code");
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
          editor.setBlocks("sample-output");
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
      <BlockButton
        onClick={() => {
          editor.setBlocks("heading-3");
          !editor.isBlockEmpty() &&
            editor
              .moveToEndOfBlock()
              .insertBlock("paragraph")
              .unwrapList();
          editor.focus();
        }}
      >
        <FontAwesomeIcon icon={faHeading} size="xs" />
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
            editor.setBlocks("pre");
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
        <React.Fragment>
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
        </React.Fragment>
      )}
    </BlocksToolbarWrapper>
  );
};

const BlocksToolbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 4%;
`;

const InsertImagePopup = props => {
  const { editor, closePopup } = props;
  const [imageUrl, setImageUrl] = useState("https://placekitten.com/200/300");
  const [imageTitle, setImageTitle] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  return (
    <PopupWrapper>
      <React.Fragment>
        <Label>Url</Label>
        <Input
          type="text"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />
        <Label>Alt</Label>
        <Input
          type="text"
          value={imageAlt}
          onChange={e => setImageAlt(e.target.value)}
        />
        <Label>Title</Label>
        <Input
          type="text"
          value={imageTitle}
          onChange={e => setImageTitle(e.target.value)}
        />
        <PrimaryButton
          onClick={e => {
            e.preventDefault();
            const image = {
              type: "image",
              data: {
                src: imageUrl,
                title: imageTitle,
                alt: imageAlt
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
      </React.Fragment>
    </PopupWrapper>
  );
};

const InsertMetadataPopup = props => {
  const { editor, closePopup } = props;

  const block = editor.value.startBlock;

  let defaultMeta = Object.entries(block.data.toJS()).map(([key, value]) => {
    return {
      key,
      value
    };
  });

  if (defaultMeta.length === 0) defaultMeta = [{ key: "", value: "" }];

  const [meta, setMeta] = useState(defaultMeta);

  const metaInputs = meta.map((m, i) => {
    return (
      <MetaDataFormInputWrapper key={i}>
        <div>
          <Label>Key</Label>
          <Input
            type="text"
            value={m.key}
            onChange={e => {
              const newKey = e.target.value;
              setMeta(oldMeta => {
                return [
                  ...oldMeta.slice(0, i),
                  {
                    key: newKey,
                    value: oldMeta[i].value
                  },
                  ...oldMeta.slice(i + 1)
                ];
              });
            }}
          />
        </div>
        <div>
          <Label>Value</Label>
          <Input
            value={m.value}
            onChange={e => {
              const newValue = e.target.value;
              setMeta(oldMeta => {
                return [
                  ...oldMeta.slice(0, i),
                  {
                    key: oldMeta[i].key,
                    value: newValue
                  },
                  ...oldMeta.slice(i + 1)
                ];
              });
            }}
          />
        </div>
        <div>
          <CloseButton
            onClick={() => {
              setMeta(oldMeta => {
                return [...oldMeta.slice(0, i), ...oldMeta.slice(i + 1)];
              });
            }}
          >
            ×
          </CloseButton>
        </div>
      </MetaDataFormInputWrapper>
    );
  });

  return (
    <PopupWrapper>
      <h2>Update metadata</h2>
      {metaInputs}
      <Button
        onClick={() => setMeta(meta => [...meta, { key: "", value: "" }])}
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
      <PrimaryButton
        onClick={e => {
          e.preventDefault();
          const data = meta.reduce((obj, m) => {
            obj[m.key] = m.value;
            return obj;
          }, {});

          editor.setNodeByKey(block.key, { data });

          editor.focus();
          closePopup();
        }}
      >
        Update metadata
      </PrimaryButton>
    </PopupWrapper>
  );
};

const CloseButton = styled.div`
  line-height: 100px;
  font-size: 25px;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: thin;
  cursor: pointer;
`;

const MetaDataFormInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 45% 45% 10%;
  width: 100%;
`;
