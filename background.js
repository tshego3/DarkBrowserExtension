// background.js

let bgColor = '#1A1A1A';
let txtColor = '#E5E5E5';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ bgColor });
    chrome.storage.sync.set({ txtColor });
});

// This function will be executed as a content script inside the current page.
function setPageBackgroundColor() {
    chrome.storage.sync.get("bgColor", ({ bgColor }) => {
        chrome.storage.sync.get("txtColor", ({ txtColor }) => {
            document.body.style.backgroundColor = bgColor;

            const nodeList0 = document.querySelectorAll("html, pre");
            for (i = 0; i < nodeList0.length; i++) {
                nodeList0[i].style.background = bgColor;
            }

            const nodeList1 = document.querySelectorAll("div, h1, h2, h3, p, textarea, tr, td, th, ul, li");
            for (i = 0; i < nodeList1.length; i++) {
                nodeList1[i].style.backgroundColor = bgColor;
                nodeList1[i].style.color = txtColor;
            }

            const nodeList2 = document.querySelectorAll("code, span");
            for (i = 0; i < nodeList2.length; i++) {
                nodeList2[i].style.background = bgColor;
                nodeList2[i].style.color = txtColor;
            }

            const nodeList3 = document.querySelectorAll("a, pre");
            for (i = 0; i < nodeList3.length; i++) {
                nodeList3[i].style.color = txtColor;
            }
        });
    });
}

// Fired when the selected tab in a window changes, inject setPageBackgroundColor into current page.
chrome.tabs.onActivated.addListener(async () => {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);

    if (!tab.url.includes("edge://") && tab.url != "") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: setPageBackgroundColor
        });
    }
});

// Fired when a tab is created, inject setPageBackgroundColor into current page.
chrome.tabs.onCreated.addListener(async () => {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);

    if (!tab.url.includes("edge://") && tab.url != "") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: setPageBackgroundColor
        });
    }
});

// Fired when a tab is updated, inject setPageBackgroundColor into current page.
chrome.tabs.onUpdated.addListener(async () => {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);

    if (!tab.url.includes("edge://") && tab.url != "") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: setPageBackgroundColor
        });
    }
});
