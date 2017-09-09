
export function FullscreenElement(element: HTMLElement, zindex: string = '1000'): void {
  element.style.width = "100%";
  element.style.height = "100%";
  element.style.display = "block";

  element.style.position = 'absolute';
  element.style.zIndex = zindex;
  element.style.top = '0';
  element.style.left = '0';
}
