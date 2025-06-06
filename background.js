chrome.omnibox.onInputEntered.addListener((text) => {
  chrome.storage.sync.get(['redirects'], function(result) {
    const redirects = result.redirects || {};
    if (redirects[text]) {
      chrome.tabs.update({ url: redirects[text] });
    }
  });
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.omnibox.setDefaultSuggestion({
    description: 'Tapez votre mot pour être redirigé vers l\'URL'
  });
});


