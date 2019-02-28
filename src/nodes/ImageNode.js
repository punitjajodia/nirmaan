import React from "react";
import { Image } from "../components/Image";

export const ImageNode = props => {
  const { attributes } = props;
  return <Image {...attributes} src={props.src} />;
};
