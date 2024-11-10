// options.js

document.getElementById('useAurebesh').addEventListener('click', function () {
  // Define multiple font faces for Aurebesh variants
  const fontFaces = `
    @font-face {
      font-family: 'Aurebesh';
      src: url('${browser.runtime.getURL('Aurebesh.otf')}') format('opentype');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'Aurebesh';
      src: url('${browser.runtime.getURL('Aurebesh Italic.otf')}') format('opentype');
      font-weight: normal;
      font-style: italic;
    }
    @font-face {
      font-family: 'Aurebesh';
      src: url('${browser.runtime.getURL('Aurebesh Bold.otf')}') format('opentype');
      font-weight: bold;
      font-style: normal;
    }
    @font-face {
      font-family: 'Aurebesh';
      src: url('${browser.runtime.getURL('Aurebesh Bold Italic.otf')}') format('opentype');
      font-weight: bold;
      font-style: italic;
    }
    @font-face {
      font-family: 'Aurebesh Condensed';
      src: url('${browser.runtime.getURL('Aurebesh Condensed.otf')}') format('opentype');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'Aurebesh Condensed';
      src: url('${browser.runtime.getURL('Aurebesh Condensed Italic.otf')}') format('opentype');
      font-weight: normal;
      font-style: italic;
    }
  `;

  browser.storage.local.set({
    customFontFace: fontFaces,
    customFontName: 'Aurebesh'
  }).then(() => {
    alert('Aurebesh font applied!');
  });
});
