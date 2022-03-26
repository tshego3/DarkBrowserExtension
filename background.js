// background.js

let bgColor = '#1A1A1A';
let txtColor = '#E5E5E5';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ bgColor });
    chrome.storage.sync.set({ txtColor });
    console.log('Default background colors are set to dark mode!');
});