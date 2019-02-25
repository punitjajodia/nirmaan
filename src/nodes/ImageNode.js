import React from "react";
import styled from "styled-components";
import { Image } from "../components/Image";

export const ImageNode = props => {
  const { node, attributes, children } = props;
  return <Image {...attributes} src={props.src} />;
};
