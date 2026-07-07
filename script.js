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

// Keep track of which messages have been opened
const openedMessages = {
    chapter1: false,
    chapter2: false,
    chapter3: false
};

// Function to handle switching between "pages"
function goToPage(pageNumber) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active')); // Hide all pages

    const nextPage = document.getElementById('page' + pageNumber);
    if (nextPage) {
        nextPage.classList.add('active'); // Show the next page
    }
}

// Function to open the message modal
function openMessage(chapterId) {
    openedMessages[chapterId] = true;
    const modal = document.getElementById('messageModal');
    const modalBody = document.getElementById('modalBody');

    // Define the messages for each chapter
    const messages = {
        chapter1: "<h3>Chapter 1: My Favorite Person 🌸</h3><p>I just wanted to make something entirely new to show you how much I love you. You are genuinely my favorite person in the whole world, and having you around makes everything so much better.</p>",
        chapter2: "<h3>Chapter 2: Why You're Special 🎀</h3><p>My absolute favorite thing about you is how you're always so incredibly sweet. You have the best heart, you're always caring, and you just bring so much happiness into my life every single day.</p>",
        chapter3: "<h3>Chapter 3: Simply Perfect ✨</h3><p>To put it simply, you're just perfect to me. You're beautiful, thoughtful, and completely amazing. Thank you for being exactly who you are.</p>"
    };

    modalBody.innerHTML = messages[chapterId];
    modal.classList.add('active'); // Show the modal

    // Check if all messages are opened to show the final page button
    checkAllOpened();
}

// Function to close the message modal
function closeMessage() {
    const modal = document.getElementById('messageModal');
    modal.classList.remove('active'); // Hide the modal
}

// Function to check completion state
function checkAllOpened() {
    const allOpened = Object.values(openedMessages).every(opened => opened);
    if (allOpened) {
        const finalBtn = document.getElementById('finalPageBtn');
        if (finalBtn) {
            finalBtn.classList.remove('hidden'); // Show the button when all chapters are read
        }
    }
}