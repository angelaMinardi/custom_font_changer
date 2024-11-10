document.getElementById('fontUpload').addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const validTypes = ['font/ttf', 'font/otf', 'font/woff', 'font/woff2', 'application/octet-stream'];
    if (!validTypes.includes(file.type)) {
      alert('Unsupported font type.');
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
      const fontData = e.target.result;
      const fontName = file.name.replace(/\.[^/.]+$/, "");
      const fontFormat = file.type.split('/')[1] || 'truetype';

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
    reader.readAsDataURL(file);
  }
});

document.getElementById('useAurebesh').addEventListener('click', function() {
  const aurebeshFontFace = `
    @font-face {
      font-family: 'Aurebesh';
      src: url('${browser.runtime.getURL('aurebesh.ttf')}') format('truetype');
    }
  `;
  browser.storage.local.set({
    customFontFace: aurebeshFontFace,
    customFontName: 'Aurebesh'
  }).then(() => {
    alert('Aurebesh font applied!');
  });
});

document.getElementById('resetFont').addEventListener('click', function() {
  browser.storage.local.remove(['customFontFace', 'customFontName']).then(() => {
    alert('Font reset to default.');
  });
});
