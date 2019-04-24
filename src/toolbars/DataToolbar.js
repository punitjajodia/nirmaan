import React, { useState } from "react";
import { Value } from "slate";
import styled from "styled-components";
import Popup from "reactjs-popup";
import { fontFamilies } from "../styles/fonts";
import { PrimaryButton } from "../components/Buttons";
import htmlSerializer from "../serializers/HtmlSerializer";

export const DataToolbar = props => {
  const { editor, onChange } = props;
  const [editorJson, setEditorJson] = useState({});
  const [importHtml, setImportHtml] = useState("<p></p>");
  return (
    <DataToolbarWrapper>
      <Popup modal trigger={<button>Import JSON</button>}>
        {close => {
          return (
            <>
              <Header>
                <h3>Paste JSON here</h3>
                <PrimaryButton
                  onClick={() => {
                    onChange({
                      value: Value.fromJSON(JSON.parse(editorJson))
                    });
                    close();
                  }}
                >
                  Import
                </PrimaryButton>
              </Header>

              <PasteArea
                rows={20}
                onChange={e => setEditorJson(e.target.value)}
              />
            </>
          );
        }}
      </Popup>
      <Popup modal trigger={<button>Import HTML</button>}>
        {close => {
          return (
            <>
              <Header>
                <h3>Paste HTML here</h3>

                <PrimaryButton
                  onClick={() => {
                    const value = htmlSerializer.deserialize(importHtml);
                    const valueJson = htmlSerializer.deserialize(importHtml, {
                      toJSON: true
                    });
                    console.log("The value is ", valueJson);
                    onChange({
                      value: htmlSerializer.deserialize(importHtml)
                    });
                    close();
                  }}
                >
                  Import
                </PrimaryButton>
              </Header>

              <PasteArea
                rows={20}
                onChange={e => {
                  const html = e.target.value.replace(/>\s+</g, "><");

                  setImportHtml(html);
                }}
              />
            </>
          );
        }}
      </Popup>
    </DataToolbarWrapper>
  );
};

const DataToolbarWrapper = styled.div`
  justify-self: end;
`;

const PasteArea = styled.textarea`
  font-family: ${fontFamilies.MONOSPACE};
  outline: none;
  width: calc(100% - 50px);
  margin: 0 auto;
  display: block;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  cursor: pointer;
`;
