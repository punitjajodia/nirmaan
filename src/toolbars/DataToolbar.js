import React, { useState } from "react";
import { Value } from "slate";
import styled from "styled-components";
import Popup from "reactjs-popup";
import { fontFamilies } from "../styles/fonts";
import { PrimaryButton } from "../components/Buttons";

export const DataToolbar = props => {
  const { editor, onChange } = props;
  const [editorJson, setEditorJson] = useState({});
  return (
    <DataToolbarWrapper>
      <Popup modal trigger={<button>Import</button>}>
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

              <JsonPasteArea
                rows={20}
                onChange={e => setEditorJson(e.target.value)}
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

const JsonPasteArea = styled.textarea`
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
