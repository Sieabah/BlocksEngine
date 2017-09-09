
export function AddElementToDom(element): HTMLElement {
  if(document.body)
    return document.body.appendChild(element);

  throw Error('No body tag found in document');
}
