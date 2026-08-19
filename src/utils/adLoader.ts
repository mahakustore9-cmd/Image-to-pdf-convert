/**
 * Safely injects ad code (HTML with embedded scripts or plain JS) into a container element.
 * Prevents "Unexpected token '<'" SyntaxErrors caused by appending raw HTML to a script tag.
 */
export function injectAdCode(container: HTMLElement, rawCode: string): void {
  if (!container || !rawCode || rawCode.trim() === '') return;

  try {
    container.innerHTML = '';
    const trimmed = rawCode.trim();

    // Check if the snippet contains HTML markup
    if (trimmed.includes('<') && trimmed.includes('>')) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = trimmed;

      // Process and append all child nodes
      Array.from(tempDiv.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName.toLowerCase() === 'script') {
          const oldScript = node as HTMLScriptElement;
          const newScript = document.createElement('script');

          // Copy all attributes (src, type, async, etc.)
          Array.from(oldScript.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value);
          });

          // Copy inline JS content (if not external script)
          if (oldScript.innerHTML) {
            newScript.textContent = oldScript.innerHTML;
          }

          container.appendChild(newScript);
        } else {
          container.appendChild(node.cloneNode(true));
        }
      });
    } else {
      // Pure JavaScript code
      const scriptTag = document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.textContent = trimmed;
      container.appendChild(scriptTag);
    }
  } catch (error) {
    console.warn('Ad injection error caught safely:', error);
  }
}
