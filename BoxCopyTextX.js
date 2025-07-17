// ==UserScript==
// @name        Copy Text X
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Copy text
// @updateURL    https://khanhnnv.github.io/BoxCopyTextX.js
// @downloadURL  https://khanhnnv.github.io/BoxCopyTextX.js
// @author       KhanhNNV
// @match        *://x.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement("style");
    style.textContent = `
        .copier-box {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 200px;
            background-color: white;
            border-radius: 20px;
            padding: 20px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
            z-index: 9999;
        }

        .copier-box.collapsed {
            width: 35px;
            height: auto;
            padding: 10px 5px;
            border-radius: 20px;
            background-color: #ffbf66;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .copier-box.collapsed .content {
            visibility: hidden;
            height: 0;
            overflow: hidden;
            padding: 0;
            margin: 0;
         }

        .copier-box.collapsed .toggle-btn {
            position: static;
            font-size: 14px;
            width: 30px;
            height: 30px;
            padding-top: 0;
            margin: 5px 0 0;
            padding-left: 6px;
        }

        .copier-box.collapsed .copy-btn {
            width: 30px;
            height: 30px;
            font-size: 14px;
            padding: 0;
            border-radius: 50%;
            margin: 5px 0 0;
            padding-left: 4px;
        }

        .toggle-btn {
            position: absolute;
            top: -10px;
            left: -10px;
            border: 2px solid;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            color: #77c256;
            background: #FCC3C2;
            cursor: pointer;
            padding-top: 2px;
            padding-left: 8px;
            font-weight: bold;
        }

        .copy-btn {
            margin:0px;
            background-color: #FCC3C2;
            border-radius: 10px;
            color: #77c256;
            font-size: 16px;
            cursor: pointer;
            border: 2px solid;
            padding: 6px 10px;
        }

        #copierInput {
            width: 100%;
            height: 80px;
            border-radius: 10px;
            border: 1px solid #ccc;
            box-sizing: border-box;
            padding: 5px;
        }
    `;
    document.head.appendChild(style);

    const container = document.createElement("div");
    container.className = "copier-box collapsed";
    container.innerHTML = `
        <button class="toggle-btn" id="copierToggle">◀</button>
        <div class="content" id="copierContent">
            <textarea id="copierInput" placeholder="Nhập ..."></textarea>
        </div>
        <br>
        <button class="copy-btn" id="copierCopyBtn">📋</button>
    `;
    document.body.appendChild(container);

    const toggleBtn = document.getElementById("copierToggle");
    const box = container;
    const copyBtn = document.getElementById("copierCopyBtn");
    const input = document.getElementById("copierInput");

    toggleBtn.addEventListener("click", () => {
        box.classList.toggle("collapsed");
        toggleBtn.textContent = box.classList.contains("collapsed") ? "◀" : "▶";
    });

    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(input.value).then(() => {
            copyBtn.textContent = "✅";
        }).catch(() => {
            copyBtn.textContent = "❌";
        });
        setTimeout(() => {
            copyBtn.textContent = "📋";
        }, 1500);
    });
})();
