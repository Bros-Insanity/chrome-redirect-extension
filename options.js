document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const messageName = element.getAttribute('data-i18n');
        const message = chrome.i18n.getMessage(messageName);
        if (element.hasAttribute('placeholder')) {
            element.setAttribute('placeholder', message);
        } else {
            element.textContent = message;
        }
    });

    const wordInput = document.getElementById('word');
    const urlInput = document.getElementById('url');
    const addButton = document.getElementById('add');
    const redirectsList = document.getElementById('redirects');

    chrome.storage.sync.get(['redirects'], function(result) {
        const redirects = result.redirects || {};
        for (const [word, url] of Object.entries(redirects)) {
            addRedirectToList(word, url);
        }
    });

    addButton.addEventListener('click', function() {
        const word = wordInput.value;
        const url = urlInput.value;

        if (word && url) {
            chrome.storage.sync.get(['redirects'], function(result) {
                const redirects = result.redirects || {};
                redirects[word] = url;
                chrome.storage.sync.set({ redirects }, function() {
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

        const deleteButton = document.createElement('button');
        deleteButton.textContent = chrome.i18n.getMessage('deleteButton');
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', function() {
            chrome.storage.sync.get(['redirects'], function(result) {
                const redirects = result.redirects || {};
                delete redirects[word];
                chrome.storage.sync.set({ redirects }, function() {
                    li.remove();
                });
            });
        });

        li.appendChild(deleteButton);
        redirectsList.appendChild(li);
    }
});

