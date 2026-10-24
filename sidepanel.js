const apiKeyInput = document.getElementById("apiKeyInput");
const saveKeyBtn = document.getElementById("saveKeyBtn");
const stanceSlider = document.getElementById("stanceSlider");
const stanceLabel = document.getElementById("stanceLabel");
const claimText = document.getElementById("claimText");
const grabTextBtn = document.getElementById("grabTextBtn");
const analyzeBtn = document.getElementById("analyzeBtn");
const statusDiv = document.getElementById("status");
const outputDiv = document.getElementById("output");

const personas = {
  "1": "Socratic Questioner (Asks probing, analytical questions)",
  "2": "Academic Critic (Provides rigorous counter-evidence)",
  "3": "Aggressive Debater (Directly refutes statements)"
};

// 1. Tab Switching Logic
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// 2. Load Stored API Key & Pending Text
chrome.storage.local.get(["geminiApiKey", "pendingText"], (result) => {
  if (result.geminiApiKey) {
    apiKeyInput.value = result.geminiApiKey;
    statusDiv.textContent = "Ready to analyze claims.";
  } else {
    statusDiv.textContent = "Set your Gemini API key in Settings first.";
  }

  if (result.pendingText) {
    claimText.value = result.pendingText;
    chrome.storage.local.remove(["pendingText"]);
  }
});

// 3. Save API Key
saveKeyBtn.addEventListener("click", () => {
  const key = apiKeyInput.value.trim();
  if (!key) {
    statusDiv.textContent = "Please enter an API key.";
    return;
  }
  chrome.storage.local.set({ geminiApiKey: key }, () => {
    alert("API Key Saved Successfully!");
  });
});

// 4. Stance Slider UI Update
stanceSlider.addEventListener("input", (e) => {
  const val = e.target.value;
  if (val === "1") stanceLabel.textContent = "Socratic Questioner";
  if (val === "2") stanceLabel.textContent = "Academic Critic";
  if (val === "3") stanceLabel.textContent = "Aggressive Debater";
});

// 5. Grab Highlighted Text from Active Webpage
grabTextBtn.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.getSelection().toString()
  }, (results) => {
    if (results?.[0]?.result) {
      claimText.value = results[0].result;
    } else {
      statusDiv.textContent = "No highlighted text found on active tab.";
    }
  });
});

// 6. Execute Gemini API Counter-Analysis
analyzeBtn.addEventListener("click", async () => {
  const text = claimText.value.trim();
  if (!text) {
    statusDiv.textContent = "Please paste or select text first.";
    return;
  }

  const key = apiKeyInput.value.trim();
  if (!key) {
    statusDiv.textContent = "Error: Configure Gemini API Key in Settings.";
    return;
  }

  const persona = personas[stanceSlider.value];
  statusDiv.textContent = "Analyzing arguments and dissecting logic...";
  outputDiv.style.display = "none";
  analyzeBtn.disabled = true;

  const prompt = `Act as an adversarial debate persona: "${persona}".
Analyze this text/claim:
"${text}"

Provide:
1. Core Thesis Detected
2. Logical Fallacies Radar & Biases
3. Top 3 Counter-Arguments
4. Unstated Assumptions`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );

    const data = await res.json();
    if (data.error) throw new Error(data.error.message);

    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (resultText) {
      outputDiv.textContent = resultText;
      outputDiv.style.display = "block";
      statusDiv.textContent = "Analysis complete!";
    }
  } catch (err) {
    statusDiv.textContent = `Error: ${err.message}`;
  } finally {
    analyzeBtn.disabled = false;
  }
});