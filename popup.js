document.getElementById("openSidePanelBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab) {
    // Opens side panel anchored to current active window
    await chrome.sidePanel.open({ windowId: tab.windowId });
    window.close(); // Close popup once side panel opens
  }
});