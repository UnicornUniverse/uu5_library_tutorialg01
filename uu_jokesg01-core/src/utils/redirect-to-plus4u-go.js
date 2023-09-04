//@@viewOn:imports
import { Environment } from "uu5g05";
//@@viewOff:imports

function addPrefixToParams(params) {
  const prefixedParams = {};

  for (const [key, value] of Object.entries(params)) {
    prefixedParams[`_${key}`] = value;
  }

  return prefixedParams;
}

export function redirectToPlus4UGo(uu5Tag, componentProps, goParams) {
  const goPrefixedParams = addPrefixToParams(goParams);
  const query = new URLSearchParams({ _uu5Tag: uu5Tag, ...componentProps, ...goPrefixedParams });
  const plus4uGoUri = new URL(Environment.componentUveUri);
  plus4uGoUri.search = query.toString();
  window.open(plus4uGoUri.toString());
}

export default redirectToPlus4UGo;
