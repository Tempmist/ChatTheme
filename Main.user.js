// ==UserScript==
// @name         ChatGPT CSS Customizer
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Customize CSS variables for ChatGPT's UI
// @author       You
// @match        https://chatgpt.com/*
// @grant        GM_addStyle
// @updateURL https://raw.githubusercontent.com/Tempmist/ChatTheme/refs/heads/master/Main.user.js
// @downloadURL https://raw.githubusercontent.com/Tempmist/ChatTheme/refs/heads/master/Main.user.js
// ==/UserScript==

(function() {
  "use strict";

  // 🧱 DOM Setup: Create UI (unchanged)
  const uiHTML = `<style>
  /* Styling for pages */
  .page {
    display: none;
  }
  .page.active {
    display: block;
  }
  h3 {
    margin-bottom: 1px;
    margin-top: 1px;
  }
  #css-customizer {
    position: fixed;
    top: 50px;
    right: 5px;
    background: rgb(233, 233, 233);
    color: black;
    padding: 10px;
    border-radius: 15px;
    z-index: 9999;
    max-height: 60vh;
    overflow-y: auto;
    width: 250px;
    font-family: sans-serif;
  }
  #toggle-customizer {
    position: absolute;
    top: 10px;
    right: 230px;
    background: lightblue;
    padding: 10px;
    border-radius: 15px;
    z-index: 9999;
    width: 100px;
  }
</style>

<div id="css-customizer">
  <!-- Page Navigation -->
  <div id="page-nav">
    <button class="page-nav-btn" data-page="background-page">Main</button>
    <button class="page-nav-btn" data-page="sidebar-page">Sidebar</button>
    <button class="page-nav-btn" data-page="button-page">Buttons</button>
    <button class="page-nav-btn" data-page="user-page">User Bubbles</button>
    <button class="page-nav-btn" data-page="robo-page">Robo Bubbles</button>
    <button class="page-nav-btn" data-page="other-page">Other</button>
    <button id="download-css" style="background: green; color: white">
      Download CSS
    </button>
    <label for="theme-mode">Mode:</label>
    <select id="theme-mode">
      <option value=":root">Light</option>
      <option value=":dark">Dark</option>
    </select>
  </div>

  <!--------------------------------------------------------------->
  <!------------Main Background------------------------------------>
  <!-------------------------------------------------------------->
  <div id="background-page" class="page active">
    <h3>Background</h3>
    <label for="background-type">Type: </label>
    <br />
    <select id="background-type">
      <option value="solid">Solid Color</option>
      <option value="gradient">Gradient</option>
      <option value="image">Image</option>
      <option value="pattern">Pattern</option>
    </select>
    <br />
    <!-- Solid Background Color -->
    <div id="solid-background" class="background-option">
      <label for="background-main">Solid Color: </label>
      <br />
      <input type="color" id="background-main" value="#c9b7e7" />
    </div>

    <!-- Gradient Background -->
    <div
      id="gradient-background"
      class="background-option"
      style="display: none"
    >
      <label for="gradient-start">Gradient Start Color: </label>
      <br />
      <input type="color" id="gradient-start" value="#c9b7e7" />
      <br />
      <label for="gradient-end">Gradient End Color: </label>
      <br />
      <input type="color" id="gradient-end" value="#9fe4ff" />
      <br />
      <label for="gradient-direction">Gradient Direction: </label>
      <br />
      <select id="gradient-direction">
        <option value="to bottom">Top to Bottom</option>
        <option value="to right">Left to Right</option>
        <option value="to left">Right to Left</option>
      </select>
    </div>

    <!-- Image Background -->
    <div id="image-background" class="background-option" style="display: none">
      <label for="background-image">Image URL: </label>
      <input type="text" id="background-image" value="" />
    </div>

    <!-- Pattern -->
    <div
      id="pattern-background"
      class="background-option"
      style="display: none"
    >
      <label for="bg-pattern-url">Pattern Image URL: </label>
      <input type="text" id="bg-pattern-url" placeholder="" />
    </div>

    <!--------------------------------------------------------------->
    <!------------Input Box ------------------------------------>
    <!-------------------------------------------------------------->
    <h3>Input Box</h3>
    <label for="input-box">Color: </label>
    <br />
    <input type="color" id="input-box" value="#ffffff" />
    <br />

    <label for="input-text">Text: </label>
    <br />
    <input type="color" id="input-text" value="#000000" />
    <br />
  </div>
  <!--------------------------------------------------------------->
  <!------------User Bubbles ------------------------------------>
  <!-------------------------------------------------------------->
  <div id="user-page" class="page">
    <h3>User Bubbles</h3>
    <label for="user-bg-type">Background Type: </label>
    <br />
    <select id="user-bg-type">
      <option value="solid">Solid Color</option>
      <option value="gradient">Gradient</option>
    </select>
    <br />

    <!-- Solid Background Color -->
    <div id="user-solid-bg" class="background-option">
      <label for="user-bg-main">Solid Color: </label>
      <br />
      <input type="color" id="user-bg-main" value="#ffffff" />
    </div>

    <!-- Gradient Background -->
    <div id="user-gradient-bg" class="background-option" style="display: none">
      <label for="user-gradient-start">Gradient Start Color: </label>
      <br />
      <input type="color" id="user-gradient-start" value="#c9b7e7" />
      <br />
      <label for="user-gradient-end">Gradient End Color: </label>
      <br />
      <input type="color" id="user-gradient-end" value="#9fe4ff" />
      <br />
      <label for="user-gradient-direction">Gradient Direction: </label>
      <br />
      <select id="user-gradient-direction">
        <option value="to bottom">Top to Bottom</option>
        <option value="to right">Left to Right</option>
        <option value="to left">Right to Left</option>
      </select>
    </div>

    <label for="user-text-color">Text Color: </label>
    <br />
    <input type="color" id="user-text-color" value="#000285" />
    <br />

    <label for="user-bubble-border">Border: </label>
    <br />
    <input type="color" id="user-bubble-border" value="#000000" />
    <br />
    <label for="user-bubble-border-width">Border Width (px): </label>
    <input type="range" id="user-bubble-border-width" value="2" min="0" />
    <br />

    <label for="user-bubble-border-style">Border Style: </label>
    <br />
    <select id="user-bubble-border-style">
      <option value="solid">Solid</option>
      <option value="dashed">Dashed</option>
      <option value="dotted">Dotted</option>
      <option value="double">Double</option>
      <option value="groove">Groove</option>
      <option value="ridge">Ridge</option>
    </select>
    <br />
  </div>
  <!--------------------------------------------------------------->
  <!------------Robot Bubbles ------------------------------------>
  <!-------------------------------------------------------------->
  <div id="robo-page" class="page">
    <h3>Robot Bubbles</h3>
    <label for="robot-bg-type">Background Type: </label>
    <br />
    <select id="robot-bg-type">
      <option value="solid">Solid Color</option>
      <option value="gradient">Gradient</option>
    </select>
    <br />

    <!-- Solid Background Color -->
    <div id="robot-solid-bg" class="background-option">
      <label for="robot-bg-main">Solid Color: </label>
      <br />
      <input type="color" id="robot-bg-main" value="#ffffff" />
    </div>

    <!-- Gradient Background -->
    <div id="robot-gradient-bg" class="background-option" style="display: none">
      <label for="robot-gradient-start">Gradient Start Color: </label>
      <br />
      <input type="color" id="robot-gradient-start" value="#c9b7e7" />
      <br />
      <label for="robot-gradient-end">Gradient End Color: </label>
      <br />
      <input type="color" id="robot-gradient-end" value="#9fe4ff" />
      <br />
      <label for="robot-gradient-direction">Gradient Direction: </label>
      <br />
      <select id="robot-gradient-direction">
        <option value="to bottom">Top to Bottom</option>
        <option value="to right">Left to Right</option>
        <option value="to left">Right to Left</option>
      </select>
    </div>
    <!-- Text -->
    <label for="assistant-text-color">Text Color: </label>
    <br />
    <input type="color" id="assistant-text-color" value="#000000" />
    <br />
    <!-- Border -->
    <label for="assistant-bubble-border">Bubble Border: </label>
    <br />
    <input type="color" id="assistant-bubble-border" value="#000000" />
    <br />
    <label for="assistant-bubble-border-width"
      >Bubble Border Width (px):
    </label>
    <input type="range" id="assistant-bubble-border-width" value="2" min="0" />
    <br />

    <label for="assistant-bubble-border-style">Border Style: </label>
    <br />
    <select id="assistant-bubble-border-style">
      <option value="solid">Solid</option>
      <option value="dashed">Dashed</option>
      <option value="dotted">Dotted</option>
      <option value="double">Double</option>
      <option value="groove">Groove</option>
      <option value="ridge">Ridge</option>
    </select>
    <br />
  </div>
  <!--------------------------------------------------------------->
  <!------------Side bar/Headings ------------------------------------>
  <!-------------------------------------------------------------->
  <div id="sidebar-page" class="page">
    <label for="sidebar-heading">Heading Color: </label>
    <br />
    <input type="color" id="sidebar-heading" value="#000000" />
    <br />

    <label for="font">Font: </label><br />
    <input type="text" id="font" value="comfortaa, sans-serif" />
    <br />

    <label for="heading-font">Heading Font: </label><br />
    <input type="text" id="heading-font" value="Delius Unicase, cursive" />
    <br />

    <!--------------------------------------------------------------->
    <!------------Side Bar ------------------------------------>
    <!-------------------------------------------------------------->

    <label for="sidebar-bg-type">Sidebar Background Type: </label>
    <br />
    <select id="sidebar-bg-type">
      <option value="solid">Solid Color</option>
      <option value="gradient">Gradient</option>
      <option value="image">Image</option>
      <option value="pattern">Pattern</option>
    </select>
    <br />

    <!-- Solid -->
    <div id="sidebar-solid-bg" class="sidebar-bg-option">
      <label for="sidebar-bg">Sidebar Solid Color: </label>
      <br />
      <input type="color" id="sidebar-bg" value="#ffffff" />
    </div>

    <!-- Gradient -->
    <div
      id="sidebar-gradient-bg"
      class="sidebar-bg-option"
      style="display: none"
    >
      <label for="sidebar-gradient-start">Sidebar Gradient Start: </label>
      <input type="color" id="sidebar-gradient-start" value="#ffffff" /><br />
      <label for="sidebar-gradient-end">Sidebar Gradient End: </label>
      <input type="color" id="sidebar-gradient-end" value="#ffffff" /><br />
      <label for="sidebar-gradient-direction"
        >Sidebar Gradient Direction:
      </label>
      <br />
      <select id="sidebar-gradient-direction">
        <option value="to bottom">Top to Bottom</option>
        <option value="to right">Left to Right</option>
        <option value="to left">Right to Left</option>
      </select>
    </div>

    <!-- Image -->
    <div id="sidebar-image-bg" class="sidebar-bg-option" style="display: none">
      <label for="sidebar-bg-image">Sidebar Background Image URL: </label>
      <input type="text" id="sidebar-bg-image" value="" />
    </div>

    <!-- Pattern -->
    <div
      id="sidebar-pattern-bg"
      class="sidebar-bg-option"
      style="display: none"
    >
      <label for="sidebar-pattern-url">Sidebar Pattern URL: </label>
      <input type="text" id="sidebar-pattern-url" placeholder="" />
    </div>

    <label for="sidebar-list-type">Sidebar List Background Type: </label>
    <br />
    <select id="sidebar-list-type">
      <option value="solid">Solid Color</option>
      <option value="gradient">Gradient</option>
    </select>
    <br />

    <!-- Solid -->
    <div id="sidebar-list-solid" class="sidebar-list-option">
      <label for="sidebar-list-color">Sidebar List Color: </label>
      <br />
      <input type="color" id="sidebar-list-color" value="#ffffff" />
    </div>

    <!-- Gradient -->
    <div
      id="sidebar-list-gradient"
      class="sidebar-list-option"
      style="display: none"
    >
      <label for="sidebar-list-gradient-start">Gradient Start: </label>
      <input
        type="color"
        id="sidebar-list-gradient-start"
        value="#3276b1"
      /><br />
      <label for="sidebar-list-gradient-end">Gradient End: </label>
      <input
        type="color"
        id="sidebar-list-gradient-end"
        value="#1e3c5d"
      /><br />
      <label for="sidebar-list-gradient-direction">Gradient Direction: </label>
      <br />
      <select id="sidebar-list-gradient-direction">
        <option value="to bottom">Top to Bottom</option>
        <option value="to right">Left to Right</option>
        <option value="to left">Right to Left</option>
      </select>
    </div>

    <label for="sidebar-link">Sidebar Link Color: </label>
    <br />
    <input type="color" id="sidebar-link" value="#000000" />
    <br />

    <label for="sidebar-hover">Sidebar Hover Color: </label>
    <br />
    <input type="color" id="sidebar-hover" value="#CECECE" />
    <br />

    <label for="sidebar-heading">Sidebar Heading Color: </label>
    <br />
    <input type="color" id="sidebar-heading" value="#000000" />
    <br />

    <label for="sidebar-list-border">Sidebar Border Color: </label>
    <br />
    <input type="color" id="sidebar-list-border" value="#000000" />
    <br />
    <label for="sidebar-border-width">Sidebar Border Width (px): </label>
    <input type="range" id="sidebar-border-width" value="2" min="0" />
    <br />

    <label for="sidebar-border-style">Sidebar Border Style: </label>
    <br />
    <select id="sidebar-border-style">
      <option value="solid">Solid</option>
      <option value="dashed">Dashed</option>
      <option value="dotted">Dotted</option>
      <option value="double">Double</option>
      <option value="groove">Groove</option>
      <option value="ridge">Ridge</option>
    </select>
    <br />
  </div>
  <!--------------------------------------------------------------->
  <!------------Buttons ------------------------------------>
  <!-------------------------------------------------------------->
  <div id="button-page" class="page">
    <label for="button-bg">Button Background: </label>
    <br />
    <input type="color" id="button-bg" value="#ffffff" />
    <br />

    <label for="button-hover">Button Hover: </label>
    <br />
    <input type="color" id="button-hover" value="#CECECE" />
    <br />

    <label for="button-text">Button Text Color: </label>
    <br />
    <input type="color" id="button-text" value="white" />
    <br />
  </div>
  <!--------------------------------------------------------------->
  <!------------Other ------------------------------------>
  <!-------------------------------------------------------------->
  <div id="other-page" class="page">
    <label for="code-bg">Code Box Background: </label>
    <br />
    <input type="color" id="code-bg" value="#ffffff" />
    <br />
  </div>
  <!--------------------------------------------------------------->
</div>
<button id="toggle-customizer">Hide</button>
 `; // <-- Keep your existing full HTML content here, no change needed

  // 🌒 Shadow DOM container
  const container = document.createElement("div");
  container.id = "customizer-container";
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.right = "0";
  container.style.zIndex = "999999";

  const shadowRoot = container.attachShadow({ mode: "open" });
  shadowRoot.innerHTML = uiHTML;

  document.documentElement.appendChild(container);

  // 🎛️ Input element selectors
  const inputs = {
    "theme-mode": el("theme-mode"),
    "background-type": el("background-type"),
    "background-main": el("background-main"),
    "gradient-start": el("gradient-start"),
    "gradient-end": el("gradient-end"),
    "gradient-direction": el("gradient-direction"),
    "background-image": el("background-image"),
    "background-pattern": el("bg-pattern-url"),

    "input-box": el("input-box"),
    "input-text": el("input-text"),

    font: el("font"),
    "heading-font": el("heading-font"),
    "code-bg": el("code-bg"),

    "user-bg-type": el("user-bg-type"),
    "user-bg-main": el("user-bg-main"),
    "user-gradient-start": el("user-gradient-start"),
    "user-gradient-end": el("user-gradient-end"),
    "user-gradient-direction": el("user-gradient-direction"),
    "user-text-color": el("user-text-color"),
    "user-bubble-border": el("user-bubble-border"),
    "user-bubble-border-width": el("user-bubble-border-width"),
    "user-bubble-border-style": el("user-bubble-border-style"),

    "robot-bg-type": el("robot-bg-type"),
    "robot-bg-main": el("robot-bg-main"),
    "robot-gradient-start": el("robot-gradient-start"),
    "robot-gradient-end": el("robot-gradient-end"),
    "robot-gradient-direction": el("robot-gradient-direction"),
    "assistant-text-color": el("assistant-text-color"),
    "assistant-bubble-border": el("assistant-bubble-border"),
    "assistant-bubble-border-width": el("assistant-bubble-border-width"),
    "assistant-bubble-border-style": el("assistant-bubble-border-style"),

    "sidebar-bg": el("sidebar-bg"),
    "sidebar-bg-type": el("sidebar-bg-type"),
    "sidebar-gradient-start": el("sidebar-gradient-start"),
    "sidebar-gradient-end": el("sidebar-gradient-end"),
    "sidebar-gradient-direction": el("sidebar-gradient-direction"),
    "sidebar-bg-image": el("sidebar-bg-image"),
    "sidebar-pattern-url": el("sidebar-pattern-url"),
    "sidebar-list-type": el("sidebar-list-type"),
    "sidebar-list-gradient-start": el("sidebar-list-gradient-start"),
    "sidebar-list-gradient-end": el("sidebar-list-gradient-end"),
    "sidebar-list-gradient-direction": el("sidebar-list-gradient-direction"),
    "sidebar-link": el("sidebar-link"),
    "sidebar-hover": el("sidebar-hover"),
    "sidebar-heading": el("sidebar-heading"),
    "sidebar-list-border": el("sidebar-list-border"),
    "sidebar-border-width": el("sidebar-border-width"),
    "sidebar-border-style": el("sidebar-border-style"),
    "sidebar-list-color": el("sidebar-list-color"),

    "button-bg": el("button-bg"),
    "button-hover": el("button-hover"),
    "button-text": el("button-text")
  };

  // 🔧 Setup input listeners
  Object.values(inputs).forEach(input =>
    input.addEventListener("input", updateCSS)
  );

  // 🎨 Background switchers
  setupBackgroundSwitcher(
    "sidebar-list-type",
    "sidebar-list-solid",
    "sidebar-list-gradient"
  );

  setupBackgroundSwitcher(
    "background-type",
    "solid-background",
    "gradient-background",
    {
      image: el("image-background"),
      pattern: el("pattern-background")
    }
  );
  setupBackgroundSwitcher("user-bg-type", "user-solid-bg", "user-gradient-bg");
  setupBackgroundSwitcher(
    "robot-bg-type",
    "robot-solid-bg",
    "robot-gradient-bg"
  );
  setupBackgroundSwitcher(
    "sidebar-bg-type",
    "sidebar-solid-bg",
    "sidebar-gradient-bg",
    {
      image: el("sidebar-image-bg"),
      pattern: el("sidebar-pattern-bg")
    }
  );

  // 🔁 Toggle customizer box
  const toggleButton = el("toggle-customizer");
  toggleButton.addEventListener("click", () => {
    const panel = el("css-customizer");
    const hidden = panel.style.display === "none";
    panel.style.display = hidden ? "block" : "none";
    toggleButton.textContent = hidden ? "Hide" : "Show";
  });

  // 💾 Download button
  el("download-css").addEventListener("click", downloadCSS);

  // 📦 Build final CSS
  function updateCSS() {
    const styles = Object.fromEntries(
      Object.entries(inputs).map(([k, v]) => [k, v.value])
    );

    const backgroundCSS = resolveBackground(
      styles["background-type"],
      styles["background-main"],
      styles["gradient-direction"],
      styles["gradient-start"],
      styles["gradient-end"],
      styles["background-image"] || styles["background-pattern"]
    );

    const userBgCSS = resolveBackground(
      styles["user-bg-type"],
      styles["user-bg-main"],
      styles["user-gradient-direction"],
      styles["user-gradient-start"],
      styles["user-gradient-end"]
    );

    const roboBG = resolveBackground(
      styles["robot-bg-type"],
      styles["robot-bg-main"],
      styles["robot-gradient-direction"],
      styles["robot-gradient-start"],
      styles["robot-gradient-end"]
    );
    const sideBG = resolveBackground(
      styles["sidebar-bg-type"],
      styles["sidebar-bg"],
      styles["sidebar-gradient-direction"],
      styles["sidebar-gradient-start"],
      styles["sidebar-gradient-end"],
      styles["sidebar-bg-image"] || styles["sidebar-pattern-url"]
    );
    const listBG = resolveBackground(
      styles["sidebar-list-type"],
      styles["sidebar-list-color"],
      styles["sidebar-list-gradient-direction"],
      styles["sidebar-list-gradient-start"],
      styles["sidebar-list-gradient-end"]
    );

    const css = `
${styles["theme-mode"]} {
  --background-main: ${backgroundCSS};
  --input-box: ${styles["input-box"]};
  --input-text: ${styles["input-text"]};
  
  --heading-color: ${styles["heading-color"]};
  --font: ${styles["font"]};
  --heading-font: ${styles["heading-font"]};
  --code-bg: ${styles["code-bg"]};
  
  /* User Chat Bubbles */
  --user-bubble-bg: ${userBgCSS};
  --user-text-color: ${styles["user-text-color"]};
  --user-bubble-border: ${styles["user-bubble-border"]} ${styles[
      "user-bubble-border-style"
    ]} ${styles["user-bubble-border-width"]}px;
  
  /* Robot Chat Bubbles */
    --assistant-bubble-bg: ${roboBG};
  --assistant-text-color: ${styles["assistant-text-color"]};
  --assistant-bubble-border: ${styles["assistant-bubble-border"]} ${styles[
      "assistant-bubble-border-style"
    ]} ${styles["assistant-bubble-border-width"]}px;
  
    --sidebar-bg: ${sideBG};
  --sidebar-link: ${styles["sidebar-link"]};
  --sidebar-hover: ${styles["sidebar-hover"]};
  --sidebar-heading: ${styles["sidebar-heading"]};
  --sidebar-list-border: ${styles["sidebar-list-border"]} ${styles[
      "sidebar-border-style"
    ]} ${styles["sidebar-border-width"]}px;
  --sidebar-list-color: ${listBG};
  
  --button-bg: ${styles["button-bg"]};
  --button-hover: ${styles["button-hover"]};
  --button-text: ${styles["button-text"]};
}
/* =============================
   🖼️ Background
   ============================= */
body {
    background: var(--background-main) !important;
}

/* =============================
   💬 Chat Bubbles
   ============================= */
div[data-message-author-role="user"]>div>div {
    background: var(--user-bubble-bg) !important;
    color: var(--user-text-color) !important;
    border: var(--user-bubble-border) !important;
    border-radius: 20px !important;
    padding: 10px 15px !important;
    font-size: 16px !important;
    font-family: var(--font) !important;
}

div[data-message-author-role="assistant"]>div>div {
    background: var(--assistant-bubble-bg) !important;
    color: var(--assistant-text-color) !important;
    border: var(--assistant-bubble-border) !important;
    border-radius: 20px !important;
    padding: 10px 15px !important;
    font-size: 16px !important;
    font-family: var(--font) !important;
}

div[data-message-author-role="assistant"] strong {
    color: var(--assistant-text-color) !important;
}

div[data-message-author-role="assistant"] h3 {
    color: var(--assistant-text-color) !important;

}

/* =============================
   🧾 Input Box Styling
   ============================= */
form[data-type="unified-composer"]>div {
    background: var(--input-box);
}

div[contenteditable] {
    color: var(--input-text);
}

/* =============================
   🏠 Sidebar Styling
   ============================= */
nav {
    background: var(--sidebar-bg) !important;
    color: var(--sidebar-text) !important;
    padding-left: 15px !important;
    padding-right: 5px !important;
}

nav div {
    background: transparent;
    color: var(--sidebar-link) !important;
    font-size: 15px !important;
}

nav h2 {
    color: var(--sidebar-heading) !important;
    font-family: var(--heading-font) !important;
    font-size: 15px !important;
}

nav aside {
    background: var(--sidebar-list-color);
    border: var(--sidebar-list-border);
    border-radius: 20px;
    color: var(--sidebar-link) !important;
}

nav a:hover {
    background: var(--sidebar-hover);
    border-radius: 20px;
}

/* whatever is above Explore*/
div[class="group/sidebar"]>div:nth-child(3)>div>a {
    background: transparent !important;
}

div[class="group/sidebar"]>div:nth-child(3)>div:hover {
    background: var(--sidebar-hover) !important;
    border-radius: 20px !important;
}

/* Explore*/
#sidebar>div:nth-child(3)>a {
    color: var(--sidebar-link);
}

#sidebar>div:nth-child(3)>a:hover {
    background: var(--sidebar-hover) !important;
    border-radius: 20px !important;
}

/*Library*/
[title="Library"] {
    background: transparent !important
}

[title="Library"]:hover {
    background: var(--sidebar-hover) !important;
    border-radius: 20px !important
}

/* =============================
   🔘 Button Styling
   ============================= */
button {
    background: var(--button-bg) !important;
    color: var(--button-text) !important;
    border-radius: 100px !important;
}

button:hover {
    background: var(--button-hover) !important;
}

/* =============================
   ❌ Hide/Remove UI Elements
   ============================= */
/* Header Bar*/
#page-header {
    background: transparent;
}

body>div>div>div>div>div {
    background: transparent;
}

/*Title*/
[data-testid="model-switcher-dropdown-button"] {
    display: none;
}

div[class="group/sidebar"]>div:nth-child(1)>span>div>a {
    display: none;
}

/*Sora Title*/
[title="Sora"] {
    display: none !important;
}

/*Upgrade Side Banner - Mobile*/
.group.flex.gap-2.p-2\.5.text-sm.cursor-pointer.focus\:ring-0.radix-disabled\:pointer-events-none.radix-disabled\:opacity-50.items-center.hover\:bg-token-sidebar-surface-secondary.screen-arch\:px-2.screen-arch\:py-1\.5.screen-arch\:min-h-\[47px\].m-0.rounded-lg.px-2 {
    display: none;
}

/*Upgrade Side Banner - PC */
body>div>div>div>div>div>nav>div>div>div>div {
    display: none;
}

/*Overlimit Banner*/
.py-4 {
    display: none;
}
`; // Put actual full CSS template here^^^

    let styleTag = shadowRoot.getElementById("dynamic-styles");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "dynamic-styles";
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = css;
  }

  // 📂 Export CSS
  function downloadCSS() {
    const styles = Object.fromEntries(
      Object.entries(inputs).map(([k, v]) => [k, v.value])
    );

    // Resolve each background/border value
    const backgroundCSS = resolveBackground(
      styles["background-type"],
      styles["background-main"],
      styles["gradient-direction"],
      styles["gradient-start"],
      styles["gradient-end"],
      styles["background-image"] || styles["background-pattern"]
    );

    const userBgCSS = resolveBackground(
      styles["user-bg-type"],
      styles["user-bg-main"],
      styles["user-gradient-direction"],
      styles["user-gradient-start"],
      styles["user-gradient-end"]
    );

    const roboBG = resolveBackground(
      styles["robot-bg-type"],
      styles["robot-bg-main"],
      styles["robot-gradient-direction"],
      styles["robot-gradient-start"],
      styles["robot-gradient-end"]
    );

    const sideBG = resolveBackground(
      styles["sidebar-bg-type"],
      styles["sidebar-bg"],
      styles["sidebar-gradient-direction"],
      styles["sidebar-gradient-start"],
      styles["sidebar-gradient-end"],
      styles["sidebar-bg-image"] || styles["sidebar-pattern-url"]
    );

    const listBG = resolveBackground(
      styles["sidebar-list-type"],
      styles["sidebar-list-color"],
      styles["sidebar-list-gradient-direction"],
      styles["sidebar-list-gradient-start"],
      styles["sidebar-list-gradient-end"]
    );

    // Build final CSS string with resolved values
    const css = `
${styles["theme-mode"]} {
  --background-main: ${backgroundCSS};
  --input-box: ${styles["input-box"]};
  --input-text: ${styles["input-text"]};
  --heading-color: ${styles["heading-color"]};
  --font: ${styles["font"]};
  --heading-font: ${styles["heading-font"]};
  --code-bg: ${styles["code-bg"]};
  
  --user-bubble-bg: ${userBgCSS};
  --user-text-color: ${styles["user-text-color"]};
  --user-bubble-border: ${styles["user-bubble-border"]} ${styles[
      "user-bubble-border-style"
    ]} ${styles["user-bubble-border-width"]}px;
  
  --assistant-bubble-bg: ${roboBG};
  --assistant-text-color: ${styles["assistant-text-color"]};
  --assistant-bubble-border: ${styles["assistant-bubble-border"]} ${styles[
      "assistant-bubble-border-style"
    ]} ${styles["assistant-bubble-border-width"]}px;
    
  --sidebar-bg: ${sideBG};
  --sidebar-link: ${styles["sidebar-link"]};
  --sidebar-hover: ${styles["sidebar-hover"]};
  --sidebar-heading: ${styles["sidebar-heading"]};
  --sidebar-list-border: ${styles["sidebar-list-border"]} ${styles[
      "sidebar-border-style"
    ]} ${styles["sidebar-border-width"]}px;
  --sidebar-list-color: ${listBG};
  
  --button-bg: ${styles["button-bg"]};
  --button-hover: ${styles["button-hover"]};
  --button-text: ${styles["button-text"]};
}
`;

    // Create and trigger the download
    const blob = new Blob([css], { type: "text/css" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "custom-style.css";
    link.click();
  }

  // 🔄 Utilities
  function el(id) {
    return shadowRoot.getElementById(id);
  }

  function resolveBackground(type, solid, direction, start, end, extra = "") {
    switch (type) {
      case "solid":
        return solid;
      case "gradient":
        return `linear-gradient(${direction}, ${start}, ${end})`;
      case "image":
        return `url(${extra}) no-repeat center center fixed; background-size: cover`;
      case "pattern":
        return `url(${extra}) repeat`;
      default:
        return "";
    }
  }

  function setupBackgroundSwitcher(selectId, solidId, gradientId, others = {}) {
    const select = el(selectId);
    const solid = el(solidId);
    const gradient = el(gradientId);

    select.addEventListener("change", () => {
      const value = select.value;
      solid.style.display = value === "solid" ? "block" : "none";
      gradient.style.display = value === "gradient" ? "block" : "none";
      for (const [key, elem] of Object.entries(others)) {
        elem.style.display = value === key ? "block" : "none";
      }
      updateCSS();
    });

    select.dispatchEvent(new Event("change"));
  }
  // Event listeners for page navigation
  const navButtons = shadowRoot.querySelectorAll(".page-nav-btn");
  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("data-page");
      showPage(page);
    });
  });

  // Show specific page
  function showPage(pageId) {
    const pages = shadowRoot.querySelectorAll(".page");
    pages.forEach(page => page.classList.remove("active"));
    const activePage = shadowRoot.getElementById(pageId);
    if (activePage) {
      activePage.classList.add("active");
    }
  }
})();
