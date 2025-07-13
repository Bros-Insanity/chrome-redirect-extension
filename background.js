chrome.omnibox.onInputEntered.addListener((text) => {
  chrome.storage.sync.get(['redirects'], function(result) {
    const redirects = result.redirects || {};
    if (redirects[text]) {
      chrome.tabs.update({ url: redirects[text] });
    }
  });
});

chrome.runtime.onInstalled.addListener(() => {
  const defaultSuggestion = chrome.i18n.getMessage('defaultSuggestion');
  chrome.omnibox.setDefaultSuggestion({
    description: defaultSuggestion
  });
});

