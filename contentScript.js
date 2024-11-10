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

// Updated storage change listener
browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && (changes.customFontFace || changes.customFontName)) {
    // Fetch the current values from storage
    browser.storage.local.get(['customFontFace', 'customFontName']).then((result) => {
      if (result.customFontFace && result.customFontName) {
        applyCustomFont(result.customFontFace, result.customFontName);
      } else {
        removeCustomFont();
      }
    });
  }
});
