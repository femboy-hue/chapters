const sparklesContainer = document.getElementById('sparkles');
for (let i = 0; i < 30; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.width = sparkle.style.height = (Math.random() * 5 + 3) + 'px';
    sparkle.style.animationDelay = Math.random() * 5 + 's';
    sparklesContainer.appendChild(sparkle);
}

const openedMessages = { chapter1: false, chapter2: false, chapter3: false };

let dialogueScript = [
    { text: "Hey Brooke... click or tap on this box to read along with me.", action: "enter-scene" },
    { text: "I wanted to step away from normal texts and build something special, just for you." },
    { text: "Honestly... out of every single thing that has ever happened in my life, meeting you is easily the best one." },
    { text: "Come with me for a second, let's head up to the peak over here...", action: "move-top" },
    { text: "Look out at that sunset... standing right up here on top of the world with you is amazing.", action: "reveal-brooke" },
    { text: "But honestly? Even with a view like this right in front of us... I'd still rather just look at you." },
    { text: "You have the kindest heart of anyone I know, and you deserve something that stays beautiful.", action: "reveal-bouquet" },
    { text: "So... I brought your absolute favorite flowers. Will you accept them from me?", action: "prompt-choices" }
];

let currentLine = 0;
let cutsceneActive = false;

function goToPage(pageNumber) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const nextPage = document.getElementById('page' + pageNumber);
    if (nextPage) {
        nextPage.classList.add('active');
        if (pageNumber === 5 && !cutsceneActive) {
            cutsceneActive = true;
            runCutsceneStep();
        }
    }
}

function unlockDome() {
    const dome = document.getElementById('domeContainer');
    if (!dome.classList.contains('opened')) {
        dome.classList.add('opened');
        setTimeout(() => { document.getElementById('nextPageBtn').classList.remove('hidden'); }, 1000);
    }
}

function openMessage(id) {
    openedMessages[id] = true;
    const modal = document.getElementById('messageModal');
    const body = document.getElementById('modalBody');

    const contents = {
        chapter1: "<h3>Chapter 1: My Favorite Person 🌸</h3><p>I wanted to build this page to show you how much you truly mean to me. Having you around makes every single day brighter.</p>",
        chapter2: "<h3>Chapter 2: Why You're Special 🎀</h3><p>My absolute favorite thing about you is how genuinely sweet and caring you are to everyone around you.</p>",
        chapter3: "<h3>Chapter 3: Simply Perfect ✨</h3><p>To put it simply, you're amazing just the way you are. Thank you for being you, Kitkat.</p>"
    };

    body.innerHTML = contents[id];
    modal.classList.add('active');
    if (Object.values(openedMessages).every(v => v)) {
        document.getElementById('finalPageBtn').classList.remove('hidden');
    }
}

function closeMessage() { document.getElementById('messageModal').classList.remove('active'); }

function runCutsceneStep() {
    if (currentLine >= dialogueScript.length) return;
    const step = dialogueScript[currentLine];
    document.getElementById('dialogueText').innerText = step.text;

    if (step.action === "enter-scene") {
        const boy = document.getElementById('boyCharacter');
        boy.style.left = "25%";
    } 
    else if (step.action === "move-top") {
        const boy = document.getElementById('boyCharacter');
        boy.style.bottom = "28%";
        boy.style.left = "38%";
    } 
    else if (step.action === "reveal-brooke") {
        document.getElementById('girlCharacter').classList.remove('hidden');
    }
    else if (step.action === "reveal-bouquet") {
        document.getElementById('pixelPeony').classList.remove('hidden');
    } 
    else if (step.action === "prompt-choices") {
        document.getElementById('gameChoices').classList.remove('hidden');
        document.getElementById('dialogueBox').style.pointerEvents = "none";
    }
}

function advanceDialogue() {
    if (dialogueScript[currentLine]?.action === "prompt-choices") return;
    currentLine++;
    if (currentLine < dialogueScript.length) runCutsceneStep();
}

function dodgeButton(btn) {
    const x = Math.floor(Math.random() * 80) - 40;
    const y = Math.floor(Math.random() * 80) - 40;
    btn.style.transform = `translate(${x}px, ${y}px)`;
}

function chooseEnding(choice) {
    if (choice === 'accept') {
        document.getElementById('gameChoices').classList.add('hidden');
        
        // Triggers the 3D Perspective camera pullback zoom-out animation sequence
        document.getElementById('gameViewport').classList.add('cinematic-zoom');
        
        document.getElementById('dialogueBox').style.pointerEvents = "auto";
        document.getElementById('dialogueText').innerText = "*You took the pink peonies. We sat down together on top of the mountain peak, looking out at the sunset view...* Click to continue.";
        document.getElementById('dialogueBox').onclick = () => { goToPage(4); };
    }
}
