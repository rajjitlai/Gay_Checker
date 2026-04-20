"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const btnNo = document.getElementById("btn-no");
    const btnYes = document.getElementById("btn-yes");
    const popupGay = document.getElementById("popup-gay");
    const popupStraight = document.getElementById("popup-straight");
    const closeBtns = document.querySelectorAll(".close-btn");

    let audioGay = new Audio("assets/audio/gay-meme.mp3");
    let audioStraight = new Audio("assets/audio/straight.MP3");

    // Disable right-click for the "prank" feel
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    /**
     * Moves the "No" button to a random position within the viewport
     */
    const moveButton = () => {
        // Break out of the parent card to avoid clipping (backdrop-filter issue)
        if (btnNo.parentElement !== document.body) {
            document.body.appendChild(btnNo);
        }

        const padding = 20;
        const btnWidth = btnNo.offsetWidth;
        const btnHeight = btnNo.offsetHeight;

        // Use window.innerWidth/Height for the most reliable viewport bounds
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Calculate maximum safe bounds
        const maxX = vw - btnWidth - padding;
        const maxY = vh - btnHeight - padding;

        // Ensure we don't pick a position that's off-screen
        const randomX = Math.floor(Math.random() * (Math.max(padding, maxX) - padding + 1)) + padding;
        const randomY = Math.floor(Math.random() * (Math.max(padding, maxY) - padding + 1)) + padding;

        btnNo.style.position = "fixed";
        btnNo.style.left = `${randomX}px`;
        btnNo.style.top = `${randomY}px`;
        btnNo.style.margin = "0";
    };

    /**
     * Shows a popup and plays associated audio
     * @param {HTMLElement} popup 
     * @param {HTMLAudioElement} audio 
     */
    const showPopup = (popup, audio) => {
        popup.classList.add("active");
        audio.currentTime = 0;
        audio.play().catch(err => console.log("Audio play failed:", err));
    };

    /**
     * Closes all popups and stops all audio
     */
    const closePopups = () => {
        document.querySelectorAll(".popup").forEach(p => p.classList.remove("active"));
        audioGay.pause();
        audioStraight.pause();
    };

    // Event Listeners
    btnNo.addEventListener("mouseover", moveButton);
    btnNo.addEventListener("touchstart", (e) => {
        e.preventDefault();
        moveButton();
    });

    btnYes.addEventListener("click", () => showPopup(popupGay, audioGay));
    
    // Fallback if they actually manage to click "No" (e.g. via keyboard)
    btnNo.addEventListener("click", () => showPopup(popupStraight, audioStraight));

    closeBtns.forEach(btn => btn.addEventListener("click", closePopups));

    // Close on background click
    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("popup")) closePopups();
    });
});