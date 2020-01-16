import Plain from "slate-plain-serializer";
import { Value } from "slate";
import { defaultSlateJson } from "../Nirmaan";

export const textToNirmaanJson = text => {
  return Plain.deserialize(text || "").toJSON();
};

export const nirmaanJsonToText = json => {
  return Plain.serialize(Value.fromJSON(json || defaultSlateJson));
};
