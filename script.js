// LocalStorage bindings
let galleryData = JSON.parse(localStorage.getItem('myGallery')) || myGalleryData;
let timelineData = JSON.parse(localStorage.getItem('myTimeline')) || myTimelineData;
let insideJokes = JSON.parse(localStorage.getItem('myJokes')) || myInsideJokes;
let bucketList = JSON.parse(localStorage.getItem('myBucket')) || myBucketList;

// 1. ADVANCED ENGINE GENERATOR FOR GRID TIMER
function initTimer() {
    const dBox = document.getElementById('days');
    const hBox = document.getElementById('hours');
    const mBox = document.getElementById('minutes');
    const sBox = document.getElementById('seconds');
    
    if (!dBox) return; // Exit if not on landing layout

    const anniversary = new Date(2023, 2, 21); // Feb 21, 2023

    function updateTimer() {
        const now = new Date();
        const diff = now - anniversary;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        // Inject structured numeric blocks with clean string paddings
        dBox.innerText = String(d).padStart(2, '0');
        hBox.innerText = String(h).padStart(2, '0');
        mBox.innerText = String(m).padStart(2, '0');
        sBox.innerText = String(s).padStart(2, '0');
    }
    setInterval(updateTimer, 1000);
    updateTimer();
}

// 2. POLAROID FRAME ENGINE
function renderGallery() {
    const galleryGrid = document.getElementById('dynamic-gallery');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = ""; 
    galleryData.forEach(photo => {
        galleryGrid.innerHTML += `
            <div class="polaroid-frame">
                <img src="${photo.filename}" alt="${photo.caption}" style="width:100%; aspect-ratio:1; object-fit:cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="photo-box" style="display:none;">[ Picture File: "${photo.filename}" ]</div>
                <p>${photo.caption}</p>
            </div>
        `;
    });
}

function addNewPhoto() {
    const urlInput = document.getElementById('photo-url').value;
    const captionInput = document.getElementById('photo-caption').value;

    if (!urlInput || !captionInput) return alert("Please fill out all input text boxes!");

    galleryData.push({ filename: urlInput, caption: captionInput });
    localStorage.setItem('myGallery', JSON.stringify(galleryData));
    
    document.getElementById('photo-url').value = "";
    document.getElementById('photo-caption').value = "";
    renderGallery();
}

// 3. SPINE TIMELINE ENGINE
function renderTimeline() {
    const timelineContainer = document.getElementById('dynamic-timeline');
    if (!timelineContainer) return;

    timelineContainer.innerHTML = "";
    timelineData.forEach(item => {
        timelineContainer.innerHTML += `
            <div class="timeline-block ${item.position}-block">
                <div class="timeline-content">
                    <span>${item.date}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
    });
}

// 4. MEMORIES & BOARDS SYSTEM
function renderMemories() {
    const bucketContainer = document.getElementById('dynamic-bucket-list');
    if (bucketContainer) {
        bucketContainer.innerHTML = "";
        bucketList.forEach(item => {
            bucketContainer.innerHTML += `<p style="margin-bottom:8px;">📌 ${item}</p>`;
        });
    }
    generateJoke();
}

function generateJoke() {
    const box = document.getElementById('joke-display');
    if (!box) return;
    const randomIdx = Math.floor(Math.random() * insideJokes.length);
    box.innerText = insideJokes[randomIdx];
}

function addNewJoke() {
    const jokeInput = document.getElementById('new-joke-text').value;
    if (!jokeInput) return alert("Write something down first!");

    insideJokes.push(jokeInput);
    localStorage.setItem('myJokes', JSON.stringify(insideJokes));
    document.getElementById('new-joke-text').value = "";
    generateJoke();
}

function addNewTimeline() {
    const date = document.getElementById('time-date').value;
    const title = document.getElementById('time-title').value;
    const desc = document.getElementById('time-desc').value;
    const pos = document.getElementById('time-pos').value;

    if (!date || !title || !desc) return alert("Fill out all configurations!");

    timelineData.push({ date: date, title: title, description: desc, position: pos });
    localStorage.setItem('myTimeline', JSON.stringify(timelineData));

    document.getElementById('time-date').value = "";
    document.getElementById('time-title').value = "";
    document.getElementById('time-desc').value = "";
    renderTimeline();
}

// 5. BACKDROP ANIMATIONS CLICK GENERATOR
document.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON' || event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') return;

    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '💖';
    heart.style.left = `${event.pageX - 10}px`;
    heart.style.top = `${event.pageY - 10}px`;
    heart.style.fontSize = `${Math.random() * 15 + 15}px`;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2500);
});

window.onload = function() {
    initTimer();
    renderGallery();
    renderTimeline();
    renderMemories();
};
// HOMEPAGE LOVE NOTE RUNTIME CONTROL
function initHomepage() {
    const savedNote = localStorage.getItem('homepageNote');
    if (savedNote && document.getElementById('homepage-note-text')) {
        document.getElementById('homepage-note-text').innerText = savedNote;
    }

    const savedPhoto = localStorage.getItem('homepagePhoto');
    if (savedPhoto && document.getElementById('homepage-photo-display')) {
        document.getElementById('homepage-photo-display').innerHTML = `
            <img src="${savedPhoto}" style="width:100%; aspect-ratio:1; object-fit:cover;">
        `;
    }
}

function updateHomepageNote() {
    const newText = document.getElementById('new-note-input').value;
    if (!newText) return alert("Write a message first!");
    localStorage.setItem('homepageNote', newText);
    document.getElementById('homepage-note-text').innerText = newText;
    document.getElementById('new-note-input').value = "";
}

function updateHomepagePhoto() {
    const photoFilename = document.getElementById('homepage-photo-url').value;
    if (!photoFilename) return alert("Type an image filename!");
    localStorage.setItem('homepagePhoto', photoFilename);
    document.getElementById('homepage-photo-display').innerHTML = `
        <img src="${photoFilename}" style="width:100%; aspect-ratio:1; object-fit:cover;">
    `;
    document.getElementById('homepage-photo-url').value = "";
}

// Append homepage checker to your current window.onload block
const existingOnload = window.onload;
window.onload = function() {
    if (existingOnload) existingOnload();
    initHomepage();
};
