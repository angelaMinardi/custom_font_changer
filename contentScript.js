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

function removeCustomFont() {
  const styleElement = document.getElementById('customFontStyle');
  if (styleElement) {
    styleElement.remove();
  }
}

function init() {
  browser.storage.local.get(['customFontFace', 'customFontName']).then((result) => {
    if (result.customFontFace && result.customFontName) {
      applyCustomFont(result.customFontFace, result.customFontName);
    } else {
      removeCustomFont();
    }
  });
}

init();

// Update the storage change listener
browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && (changes.customFontFace || changes.customFontName)) {
    const customFontFace = changes.customFontFace ? changes.customFontFace.newValue : undefined;
    const customFontName = changes.customFontName ? changes.customFontName.newValue : undefined;

    if (customFontFace && customFontName) {
      applyCustomFont(customFontFace, customFontName);
    } else {
      removeCustomFont();
    }
  }
});
