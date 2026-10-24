chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "analyzeDebate",
    title: "Challenge this Perspective",
    contexts: ["selection", "page"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "analyzeDebate") {
    // Open the side panel for the active tab
    await chrome.sidePanel.open({ windowId: tab.windowId });
    
    // Pass selected text or tab info to the side panel
    chrome.runtime.sendMessage({
      action: "analyze_text",
      text: info.selectionText || null,
      tabId: tab.id
    });
  }
});