// popup.js

// When the current page is ready, inject setPageBackgroundColor into current page
$(document).ready(async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    });
});

// The body of this function will be executed as a content script inside the
// current page
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