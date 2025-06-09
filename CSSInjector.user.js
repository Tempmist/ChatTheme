// ==UserScript==
// @name         CSS Injector
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  Inject custom CSS into a webpage
// @author       You
// @match        https://chatgpt.com/*
// @grant        GM_addStyle
// @updateURL https://raw.githubusercontent.com/Tempmist/ChatTheme/refs/heads/master/CSSInjector.user.js
// @downloadURL https://raw.githubusercontent.com/Tempmist/ChatTheme/refs/heads/master/CSSInjector.user.js
// ==/UserScript==

(function() {
  "use strict";
 const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Delius+Unicase:wght@400;700&display=swap';
  document.head.appendChild(fontLink);
  // Your custom CSS
  const customCSS = `
/* =============================
   🌐 Imports
   ============================= */
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Delius+Unicase:wght@400;700&display=swap');
/* =============================
   🌑 Light Mode Overrides
   ============================= */
:root {
  --background-main: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(7) rotate(20)'><rect x='0' y='0' width='100%' height='100%' fill='%2305afbcff'/><path d='M0 0h10v10H0z'  stroke-width='1' stroke='none' fill='%23deffdeff'/><path d='M10 10h10v10H10z'  stroke-width='1' stroke='none' fill='%23deffdeff'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>");;
  --input-box: #074375;
  --input-text: #fafafa;
  --heading-color: #deffde;
  --font: comfortaa, sans-serif;
  --heading-font: Delius Unicase, cursive;
  --code-bg: #ffffff;
  --user-bubble-bg: #ff6600;
  --user-text-color: #074375;
  --user-bubble-border: #ffdd00 solid 5px;
  --assistant-bubble-bg: #ffdd00;
  --assistant-text-color: #074375;
  --assistant-bubble-border: #ff6100 solid 4px;
  --sidebar-bg: #074375;
  --sidebar-link: #deffde;
  --sidebar-hover: #ff6100;
  --sidebar-heading: #eeff00;
  --sidebar-list-border: #ffdd00 double 8px;
  --sidebar-list-color: #00b0c1;
  --button-bg: #deffde;
  --button-hover: #ffdd00;
  --button-text: #074375;
}

/* =============================
   🌑 Dark Mode Overrides
   ============================= */
.dark {
    /* Layout */
    --background-main: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='100' height='80' patternTransform='scale(2) rotate(20)'><rect x='0' y='0' width='100%' height='100%' fill='%231e1c3fff'/><path d='M25 51.35l2.58 6 6.53.58-4.92 4.3 1.45 6.4L25 65.28l-5.64 3.36 1.45-6.39-4.92-4.3 6.53-.59zM21.86 65.2L25 63.35l3.14 1.86-.83-3.53 2.75-2.39-3.64-.33-1.45-3.36-1.44 3.36-3.61.3 2.75 2.4zM50 71.35l2.58 6 6.53.58-4.92 4.3 1.45 6.4L50 85.28l-5.64 3.36 1.45-6.39-4.92-4.3 6.53-.58zM46.86 85.2L50 83.35l3.14 1.86-.8-3.56 2.74-2.39-3.64-.33L50 75.57l-1.44 3.36-3.64.33 2.75 2.4zM75 11.35l2.58 6 6.53.58-4.92 4.3 1.45 6.4L75 25.29l-5.64 3.36 1.45-6.39-4.92-4.3 6.53-.59zM71.86 25.2L75 23.35l3.14 1.86-.8-3.56 2.74-2.39-3.64-.33L75 15.57l-1.44 3.36-3.64.33 2.75 2.4zM50-8.65l2.58 6 6.53.58-4.92 4.3 1.45 6.4L50 5.28l-5.64 3.36 1.45-6.39-4.92-4.3 6.53-.59zM46.86 5.2L50 3.35l3.14 1.86-.8-3.56 2.74-2.39-3.64-.33L50-4.43l-1.44 3.36-3.64.33 2.75 2.4zM100 43.35l-3.14 1.86.8-3.53-2.74-2.42 3.64-.33L100 35.6v-4.25l-2.58 6.03-6.53.58 4.94 4.3-1.47 6.4 5.64-3.37zm-94.39 5.3l-1.47-6.39 4.94-4.3-6.52-.59L0 31.36v4.25l1.42 3.33 3.64.33-2.75 2.42.8 3.53L0 43.35v1.94z'  stroke-width='1' stroke='none' fill='%23272553ff'/><path d='M75 51.35l2.58 6 6.53.58-4.92 4.3 1.45 6.4L75 65.28l-5.64 3.36 1.45-6.39-4.92-4.3 6.53-.59zM71.86 65.2L75 63.35l3.14 1.86-.8-3.56 2.74-2.39-3.64-.33L75 55.57l-1.44 3.36-3.64.33 2.75 2.4zM100 75.6v-4.25l-2.58 6.03-6.53.58 4.94 4.3-1.47 6.4 5.64-3.37v-1.94l-3.14 1.86.8-3.53-2.74-2.42 3.64-.33zm-100 0l1.42 3.33 3.64.33-2.75 2.42.8 3.53L0 83.35v1.94l5.61 3.36-1.47-6.39 4.94-4.3-6.52-.58L0 71.34zm25-64.25l2.58 6 6.53.58-4.92 4.3 1.45 6.4L25 25.29l-5.64 3.36 1.45-6.39-4.92-4.3 6.53-.59zM21.86 25.2L25 23.35l3.14 1.86-.83-3.53 2.75-2.39-3.64-.33-1.45-3.36-1.44 3.36-3.61.3 2.75 2.4zM100 3.35L96.86 5.2l.8-3.53-2.74-2.42 3.64-.33L100-4.4v-4.25l-2.58 6.02-6.53.59 4.94 4.3-1.47 6.4L100 5.28zM5.61 8.65L4.14 2.26l4.94-4.3-6.52-.59L0-8.65v4.25l1.42 3.33 3.64.33L2.3 1.68l.8 3.53L0 3.35v1.94zM50 31.35l2.58 6 6.53.58-4.92 4.3 1.45 6.4L50 45.28l-5.64 3.36 1.45-6.39-4.92-4.3 6.53-.59zM46.86 45.2L50 43.35l3.14 1.86-.8-3.56 2.74-2.39-3.64-.33L50 35.57l-1.44 3.36-3.64.33 2.75 2.4z'  stroke-width='1' stroke='none' fill='%2346437cff'/><path d='M45.28 58.82l3.25-.3 1.3-3 1.28 3 3.25.3-2.47 2.14.75 3.2-2.8-1.67L47 64.15l.75-3.2zM100 62.65v-6.97l-1.3 3-3.26.3 2.48 2.14-.75 3.2zM0 62.57l2.64 1.58-.75-3.2 2.47-2.13-3.25-.3L0 55.9zm70.28 16.25l3.25-.3 1.3-3 1.28 3 3.25.3-2.47 2.14.75 3.2-2.8-1.67L72 84.15l.75-3.2zm-50 0l3.25-.3 1.3-3 1.28 3 3.25.3-2.47 2.14.75 3.2-2.8-1.67L22 84.15l.75-3.2zm31.6-57.86l.76 3.2-2.8-1.67L47 24.15l.75-3.2-2.47-2.13 3.25-.3 1.3-3 1.28 3 3.25.3zM100 15.68l-1.3 3-3.26.3 2.48 2.14-.75 3.2 2.83-1.67zM2.64 24.15l-.75-3.2 2.47-2.13-3.25-.3L0 15.9v6.67zM76.89.95l.75 3.2-2.8-1.66L72 4.15l.75-3.2-2.47-2.13 3.25-.3 1.3-3 1.28 3 3.25.3zm-50 0l.75 3.2-2.8-1.66L22 4.15l.75-3.2-2.47-2.13 3.25-.3 1.3-3 1.28 3 3.25.3zm50 40l.75 3.2-2.8-1.66L72 44.15l.75-3.2-2.47-2.13 3.25-.3 1.3-3 1.28 3 3.25.3zm-50 0l.75 3.2-2.8-1.66L22 44.15l.75-3.2-2.47-2.13 3.25-.3 1.3-3 1.28 3 3.25.3z'  stroke-width='1' stroke='none' fill='%23ecc94bff'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>");
    --input-box: #883888;
    --input-text: rgb(240, 211, 243);
    --heading-color: rgb(251, 251, 252);
    --font: "comfortaa", sans-serif;
    --heading-font: "Delius Unicase", cursive;

    /*Code Boxes*/
    --code-bg: rgb(58, 37, 37);

    /* Chat Bubbles */
    --user-bubble-bg: #a74e6c;
    --user-text-color: #dbf1ff;
    --user-bubble-border: 1px solid rgb(255, 221, 148);

    --assistant-bubble-bg: #602085;
    --assistant-text-color: rgb(255, 239, 253);
    --assistant-bubble-border: 1px solid rgba(255, 214, 0, 1);

    /* Sidebar */
    --sidebar-bg: linear-gradient(0deg, rgba(39, 28, 124, 1) 0%, rgba(80, 20, 120, 1) 100%);
    --sidebar-link: rgb(238, 187, 240);
    --sidebar-hover: rgba(255, 118, 74, 0.2);
    --sidebar-heading: rgb(204, 150, 255);
    --sidebar-list-border: 1px solid rgb(255, 224, 51);
    --sidebar-list-color: linear-gradient(0deg, rgba(39, 28, 124, 1) 0%, rgba(80, 20, 120, 1) 100%);

    /* Buttons */
    --button-bg:rgb(114, 47, 128);
    --button-hover:rgb(255, 224, 51);
    --button-text:rgb(245, 188, 247);
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
div[data-message-author-role="user"]>div>div{
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
form[data-type="unified-composer"]>div{
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
    background: var(--button-hover)!important;
}
/* =============================
   ❌ Hide/Remove UI Elements
   ============================= */
/* Header Bar*/
   #page-header {
    background: transparent !important;
}

body>div>div>div>div>div {
    background: transparent;
}
/*Title*/
[data-testid="model-switcher-dropdown-button"] {
    display: none !important;
}

div[class="group/sidebar"]>div:nth-child(1)>span>div>a {
    display: none !important;
}
/*Sora Title*/
[title="Sora"] {
    display: none !important;
}
/*Upgrade Side Banner - Mobile*/
.group.flex.gap-2.p-2\.5.text-sm.cursor-pointer.focus\:ring-0.radix-disabled\:pointer-events-none.radix-disabled\:opacity-50.items-center.hover\:bg-token-sidebar-surface-secondary.screen-arch\:px-2.screen-arch\:py-1\.5.screen-arch\:min-h-\[47px\].m-0.rounded-lg.px-2 {
    display: none !important;
}
/*Upgrade Side Banner - PC */
body > div> div > div > div > div > nav >div>div>div>div{
  display:none !important;
}
/*Overlimit Banner*/
.py-4 {
    display: none !important;
}

    `;

  function injectCSS() {
    if (typeof GM_addStyle === 'function') {
      GM_addStyle(customCSS);
    } else {
      const style = document.createElement('style');
      style.textContent = customCSS;
      document.head.appendChild(style);
    }
  }

  // Wait until full load
  if (document.readyState === 'complete') {
    injectCSS();
  } else {
    window.addEventListener('load', injectCSS);
  }
})();
