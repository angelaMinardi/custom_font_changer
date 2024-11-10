// background.js
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    browser.scripting.executeScript({
      target: { tabId: tabId },
      files: ['contentScript.js']
    });
  }
});
