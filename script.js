"use strict";

const yearElements = document.querySelectorAll("#year");

yearElements.forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

const copyButton = document.querySelector("#copy-handle");
const copyFeedback = document.querySelector("#copy-feedback");

if (copyButton && copyFeedback) {
  copyButton.addEventListener("click", async () => {
    const textToCopy = copyButton.dataset.copy;

    try {
      await navigator.clipboard.writeText(textToCopy);
      copyFeedback.textContent = "Copied to clipboard!";
    } catch {
      copyFeedback.textContent =
        "Clipboard access failed. Your handle is: " + textToCopy;
    }
  });
}


const music = document.getElementById("background-music");
const musicButton = document.getElementById("music-button");
const volumeSlider = document.getElementById("volume-slider");

if (music && musicButton && volumeSlider) {
    music.volume = Number(volumeSlider.value) / 100;

    music.play().catch(() => {
        console.log("Felhasználói interakcióra várakozok...");
    });

    musicButton.addEventListener("click", async () => {
        if (music.paused || music.muted) {
            music.muted = false;

            try {
                await music.play();
            } catch (error) {
                console.log("A lejátszás nem indítható el:", error);
            }
        } else {
            music.muted = true;
        }
    });

    volumeSlider.addEventListener("input", () => {
        music.volume = Number(volumeSlider.value) / 100;
        music.muted = Number(volumeSlider.value) === 0;
    });
}