# 😈 AI Devil's Advocate

**AI Devil's Advocate** is a Manifest V3 Chrome Extension designed to challenge perspectives, expose logical fallacies, and generate rigorous counter-arguments for web articles and claims. Powered by Google's Gemini API, it provides a dedicated side panel experience where users can analyze text using customizable debate personas.

---

## ✨ Features

- 🎯 **Context Menu Integration**: Highlight text on any page, right-click, and select *"Challenge this Perspective"* to open the side panel automatically.
- 📌 **Side Panel Interface**: Operates alongside your main browsing tab without cluttering the main viewport.
- 🪄 **One-Click Text Grabber**: Easily pull highlighted text from active web pages directly into the side panel.
- 🎚️ **Adjustable Adversarial Stance**: Switch between three distinct debate personas:
  - **Socratic Questioner**: Asks probing, analytical questions to uncover underlying assumptions.
  - **Academic Critic**: Delivers rigorous counter-evidence and structural analysis.
  - **Aggressive Debater**: Directly refutes claims with focused counter-arguments.
- ⚙️ **Custom Gemini API Key**: Powered by Google Gemini (`gemini-3.6-flash`), with secure local storage for your API key.

---

## 📂 Project Structure

```text
.
├── manifest.json       # Extension configuration (Manifest V3)
├── background.js       # Background service worker (Context menu & side panel triggers)
├── popup.html          # Extension popup UI
├── popup.js            # Handles opening the side panel from the popup
├── sidepanel.html      # Main user interface (Analysis & Settings tabs)
└── sidepanel.js        # Core app logic (Tab switching, DOM manipulation, Gemini API API integration)
```

---

## 🚀 Installation & Setup

### 1. Prerequisites
- Google Chrome browser (or any Chromium-based browser supporting Manifest V3 Side Panels).
- A **Gemini API Key** (Get one from [Google AI Studio](https://aistudio.google.com/)).

### 2. Load the Extension into Chrome
1. Clone or download this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** using the toggle in the top-right corner.
4. Click **Load unpacked** in the top-left.
5. Select the folder containing the project files (`manifest.json`, `background.js`, etc.).

---

## ⚙️ Configuration

1. Click the **AI Devil's Advocate** icon in your Chrome toolbar (or open the side panel directly).
2. Navigate to the **⚙️ Settings** tab inside the side panel.
3. Paste your **Gemini API Key** into the input field.
4. Click **Save API Key**. Your key will be saved securely to local storage.

---

## 📖 How to Use

### Method 1: Context Menu (Right-Click)
1. Highlight any snippet of text on any website.
2. Right-click and choose **"Challenge this Perspective"**.
3. The side panel will automatically open and populate the text for analysis.

### Method 2: Manual / Grab Text
1. Open the extension side panel via the popup or toolbar icon.
2. Click **"🪄 Grab Selected"** to pull highlighted text from the current active tab, or paste claims manually into the text area.
3. Use the **Adversarial Stance** slider to select your desired critique intensity:
   - Level 1: *Socratic Questioner*
   - Level 2: *Academic Critic*
   - Level 3: *Aggressive Debater*
4. Click **"⚡ Deconstruct & Counter-Argue"**.

---

## 🔒 Permissions

This extension requests the following permissions:
- `activeTab`: Used to capture selected text from the currently viewed tab.
- `scripting`: Needed to execute text extraction scripts on web pages.
- `contextMenus`: Used to create the right-click "Challenge this Perspective" menu option.
- `storage`: Required to securely store your API key locally on your device.
- `sidePanel`: Required to display the main user interface alongside web pages.
- `https://*/*`: Necessary to perform API requests to Google's Gemini endpoints.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).