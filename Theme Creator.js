// ==UserScript==
// @name         ChatGPT CSS Customizer
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Customize CSS variables for ChatGPT's UI
// @author       You
// @match        https://chatgpt.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  "use strict";

  // 🧱 DOM Setup: Create UI (unchanged)
  const uiHTML = ` `; // <-- Keep your existing full HTML content here, no change needed

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
