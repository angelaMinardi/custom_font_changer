// contentScript.js

function applyCustomFont(fontFace, fontName) {
  let styleElement = document.getElementById('customFontStyle');
  if (styleElement) {
    styleElement.remove();
  }
  styleElement = document.createElement('style');
  styleElement.id = 'customFontStyle';
  styleElement.innerHTML = `
    ${fontFace}
    * {
      font-family: '${fontName}', '${fontName} Condensed' !important;
    }
  `;
  document.head.appendChild(styleElement);
}
