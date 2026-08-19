/**
 * Generates a clean, safe HTML document string for embedding ad scripts in an iframe.
 * Isolates third-party ad scripts from the main React DOM, preventing uncaught SyntaxErrors
 * (such as 'Unexpected end of input' or 'Unexpected token <') from affecting the application.
 */
export function createAdIframeSrcDoc(rawCode: string, minHeight: number = 90): string {
  if (!rawCode || rawCode.trim() === '') return '';

  const trimmed = rawCode.trim();
  const content = trimmed.startsWith('<') ? trimmed : `<script type="text/javascript">${trimmed}<\/script>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base target="_blank">
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      min-height: ${minHeight}px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;
}
