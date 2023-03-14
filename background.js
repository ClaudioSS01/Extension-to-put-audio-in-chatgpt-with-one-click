console.log("version 13-03-2023")

chrome.browserAction.onClicked.addListener(function (tab) {
  

  chrome.tabs.executeScript(null, {
    file: "go.js"
 });
 
});