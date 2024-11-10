function applyCustomFont(fontFace, fontName) {
  let styleElement = document.getElementById('customFontStyle');
  if (styleElement) {
    styleElement.remove();
  }
  styleElement = document.createElement('style');
  styleElement.id = 'customFontStyle';
  styleElement.innerHTML = `
    ${fontFace}
    body, body * {
      font-family: '${fontName}' !important;
    }
  `;
  document.head.appendChild(styleElement);
}

function init() {
  browser.storage.local.get(['customFontFace', 'customFontName']).then((result) => {
    if (result.customFontFace && result.customFontName) {
      applyCustomFont(result.customFontFace, result.customFontName);
    }
  });
}

init();

// Listen for changes in storage to update the font dynamically
browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && (changes.customFontFace || changes.customFontName)) {
    if (changes.customFontFace && changes.customFontName) {
      applyCustomFont(changes.customFontFace.newValue, changes.customFontName.newValue);
    } else {
      // If font is reset
      const styleElement = document.getElementById('customFontStyle');
      if (styleElement) {
        styleElement.remove();
      }
    }
  }
});
