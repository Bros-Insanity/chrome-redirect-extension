document.addEventListener('DOMContentLoaded', function () {
    const wordInput = document.getElementById('word');
    const urlInput = document.getElementById('url');
    const addButton = document.getElementById('add');
    const redirectsList = document.getElementById('redirects');

    chrome.storage.sync.get(['redirects'], function (result) {
        const redirects = result.redirects || {};
        for (const [word, url] of Object.entries(redirects)) {
            addRedirectToList(word, url);
        }
    });

    addButton.addEventListener('click', function () {
        const word = wordInput.value;
        const url = urlInput.value;

        if (word && url) {
            chrome.storage.sync.get(['redirects'], function (result) {
                const redirects = result.redirects || {};
                redirects[word] = url;
                chrome.storage.sync.set({ redirects }, function () {
                    addRedirectToList(word, url);
                    wordInput.value = '';
                    urlInput.value = '';
                });
            });
        }
    });

    function addRedirectToList(word, url) {
        const li = document.createElement('li');
        li.textContent = `${word} -> ${url}`;
        redirectsList.appendChild(li);
    }
});

