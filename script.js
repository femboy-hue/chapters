// Automatically create the glowing stardust background particles
const sparklesContainer = document.getElementById('sparkles');
for (let i = 0; i < 40; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.width = sparkle.style.height = (Math.random() * 6 + 4) + 'px';
    sparkle.style.animationDelay = Math.random() * 5 + 's';
    sparkle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    sparklesContainer.appendChild(sparkle);
}

// Keep track of chapters
const openedMessages = {
    chapter1: false,
    chapter2: false,
    chapter3: false
};

// Main script narrative tracker script array
let dialogueScript = [
    { text: "Hey Brooke... look who made it into the game loop! Swipe or click anywhere on this text box to keep me talking.", action: "enter-boy" },
    { text: "I wanted to pull you into a completely custom world for a second because regular text messages aren't enough for you." },
    { text: "Genuinely, out of all the best things that have ever happened to me in my life... meeting you is easily number one." },
    { text: "Let's change our view for a quick second. Walk with me up here...", action: "start-walk" },
    { text: "Wow... look at this sunset view. Pretty stunning, right?", action: "stop-walk" },
    { text: "But honestly? Even with a view like this right in front of us... I'd still rather just look at you." },
    { text: "You are the sweetest, most perfect person I've ever known, and you deserve something that blooms forever.", action: "pop-peony" },
    { text: "So... I brought your absolute favorites. Will you accept them from me?", action: "show-choices" }
];

let currentLine = 0;
let cutsceneActive = false;

function goToPage(pageNumber) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    const nextPage = document.getElementById('page' + pageNumber);
    if (nextPage) {
        nextPage.classList.add('active');
        // If entering the minigame theater layer, start the script loop sequence
        if (pageNumber === 5 && !cutsceneActive) {
            cutsceneActive = true;
            runCutsceneStep();
        }
    }
}

// Open / Close functions for glass mechanics
function unlockDome() {
    const dome = document.getElementById('domeContainer');
    const nextBtn = document.getElementById('nextPageBtn');
    if (!dome.classList.contains('opened')) {
        dome.classList.add('opened');
        setTimeout(() => { nextBtn.classList.remove('hidden'); }, 1000);
    }
}

function openMessage(chapterId) {
    openedMessages[chapterId] = true;
    const modal = document.getElementById('messageModal');
    const modalBody = document.getElementById('modalBody');

    const messages = {
        chapter1: "<h3>Chapter 1: My Favorite Person 🌸</h3><p>I just wanted to make something entirely new to show you how much I love you. You are genuinely my favorite person in the whole world, and having you around makes everything so much better.</p>",
        chapter2: "<h3>Chapter 2: Why You're Special 🎀</h3><p>My absolute favorite thing about you is how you're always so incredibly sweet. You have the best heart, you're always caring, and you just bring so much happiness into my life every single day.</p>",
        chapter3: "<h3>Chapter 3: Simply Perfect ✨</h3><p>To put it simply, you're just perfect to me. You're beautiful, thoughtful, and completely amazing. Thank you for being exactly who you are.</p>"
    };

    modalBody.innerHTML = messages[chapterId];
    modal.classList.add('active');
    checkAllOpened();
}

function closeMessage() {
    document.getElementById('messageModal').classList.remove('active');
}

function checkAllOpened() {
    const allOpened = Object.values(openedMessages).every(opened => opened);
    if (allOpened) {
        document.getElementById('finalPageBtn').classList.remove('hidden');
    }
}

// --- 🎮 CORE RETRO INTERACTIVE MINIGAME LOGIC ENGINE ---
function runCutsceneStep() {
    if (currentLine >= dialogueScript.length) return;

    const step = dialogueScript[currentLine];
    document.getElementById('dialogueText').innerText = step.text;

    // Process step cues
    if (step.action === "enter-boy") {
        document.getElementById('boyCharacter').style.left = "35%";
    } 
    else if (step.action === "start-walk") {
        document.getElementById('gameViewport').classList.add('scrolling');
        document.getElementById('boyCharacter').style.transform = "scale(1.1)";
    } 
    else if (step.action === "stop-walk") {
        document.getElementById('gameViewport').classList.remove('scrolling');
    } 
    else if (step.action === "pop-peony") {
        document.getElementById('pixelPeony').classList.remove('hidden');
    } 
    else if (step.action === "show-choices") {
        document.getElementById('gameChoices').classList.remove('hidden');
        document.getElementById('dialogueBox').style.pointerEvents = "none"; // Lock text box during decisions
    }
}

function advanceDialogue() {
    // Prevent manual advance if choices are on screen
    if (dialogueScript[currentLine] && dialogueScript[currentLine].action === "show-choices") return;

    currentLine++;
    if (currentLine < dialogueScript.length) {
        runCutsceneStep();
    }
}

// Trick function: Makes the "Deny" choice skip away smoothly so she can't click it!
function dodgeButton(btn) {
    const x = Math.floor(Math.random() * 40) - 20;
    const y = Math.floor(Math.random() * 40) - 20;
    btn.style.transform = `translate(${x}px, ${y}px)`;
}

function chooseEnding(choice) {
    if (choice === 'accept') {
        document.getElementById('gameChoices').classList.add('hidden');
        document.getElementById('pixelPeony').style.transform = "scale(1.5) translateY(-10px)";
        
        // Final zoom out cinematic delay transition
        document.getElementById('dialogueBox').style.pointerEvents = "auto";
        document.getElementById('dialogueText').innerText = "*You took the Peony. We sat down together on the peak, watching the sunset...* Click one more time to finish.";
        
        // Route click target directly to final screen card
        document.getElementById('dialogueBox').onclick = () => {
            goToPage(4);
        };
    }
}
