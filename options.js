// options.js

function arrayBufferToBase64(buffer) {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return window.btoa(binary);
}
document.getElementById('fontUpload').addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const validTypes = [
      'font/ttf', 'font/otf', 'font/woff', 'font/woff2',
      'application/x-font-ttf', 'application/x-font-otf',
      'application/octet-stream', ''
    ];
    if (!validTypes.includes(file.type)) {
      alert('Unsupported font type.');
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      const fontData = e.target.result; // This is a data URL

      const fontName = file.name.replace(/\.[^/.]+$/, "");
      const fontFormat = 'truetype'; // Assume truetype for simplicity

      const fontFace = `
        @font-face {
          font-family: '${fontName}';
          src: url('${fontData}') format('${fontFormat}');
        }
      `;

      // Save font data to storage
      browser.storage.local.set({
        customFontFace: fontFace,
        customFontName: fontName
      }).then(() => {
        alert('Custom font applied!');
      });
    };
    reader.readAsDataURL(file); // Read as Data URL
  }
});


document.getElementById('useAurebesh').addEventListener('click', async function () {
  const fontFiles = [
    { name: 'Aurebesh', file: 'Aurebesh.otf', weight: 'normal', style: 'normal' },
    { name: 'Aurebesh', file: 'Aurebesh Bold.otf', weight: 'bold', style: 'normal' },
    { name: 'Aurebesh', file: 'Aurebesh Italic.otf', weight: 'normal', style: 'italic' },
    { name: 'Aurebesh', file: 'Aurebesh Bold Italic.otf', weight: 'bold', style: 'italic' },
    { name: 'Aurebesh Condensed', file: 'Aurebesh Condensed.otf', weight: 'normal', style: 'normal' },
    { name: 'Aurebesh Condensed', file: 'Aurebesh Condensed Italic.otf', weight: 'normal', style: 'italic' },
  ];

  let fontFaces = '';

  for (const font of fontFiles) {
    const response = await fetch(browser.runtime.getURL(font.file));
    const arrayBuffer = await response.arrayBuffer();
    const base64Font = arrayBufferToBase64(arrayBuffer);

    fontFaces += `
      @font-face {
        font-family: '${font.name}';
        src: url('data:font/otf;base64,${base64Font}') format('opentype');
        font-weight: ${font.weight};
        font-style: ${font.style};
      }
    `;
  }

  browser.storage.local.set({
    customFontFace: fontFaces,
    customFontName: 'Aurebesh'
  }).then(() => {
    alert('Aurebesh font applied!');
  });
});
