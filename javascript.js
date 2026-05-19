// ===== ELEMENTS =====
const bloomBtn = document.getElementById('bloomBtn');
const resetBtn = document.getElementById('resetBtn');
const flowerStage = document.getElementById('flowerStage');
const particlesContainer = document.getElementById('particles');

// ===== COLOR PALETTES =====
const palettes = [
    { petals: ['#ff6b9d','#ff8fab','#ffb3c6'], name: 'Rose' },
    { petals: ['#c44dff','#d580ff','#e6b3ff'], name: 'Violet' },
    { petals: ['#ff6b6b','#ff8e8e','#ffb4b4'], name: 'Red' },
    { petals: ['#fbbf24','#fcd34d','#fde68a'], name: 'Sunflower' },
    { petals: ['#60a5fa','#93c5fd','#bfdbfe'], name: 'Blue' },
    { petals: ['#f472b6','#f9a8d4','#fbcfe8'], name: 'Pink' },
    { petals: ['#a78bfa','#c4b5fd','#ddd6fe'], name: 'Lavender' },
    { petals: ['#fb923c','#fdba74','#fed7aa'], name: 'Orange' },
];

// ===== CREATE BACKGROUND PARTICLES =====
function createParticles() {
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 4 + 2;
        const colors = ['#ff6b9d','#c44dff','#6e44ff','#4ade80','#fbbf24'];
        p.style.cssText = `
            width: ${size}px; height: ${size}px;
            left: ${Math.random() * 100}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation-duration: ${Math.random() * 10 + 8}s;
            animation-delay: ${Math.random() * 8}s;
        `;
        particlesContainer.appendChild(p);
    }
}

// ===== BUILD FLOWER =====
function buildFlower(palette) {
    flowerStage.innerHTML = '';

    // Stem
    const stem = document.createElement('div');
    stem.className = 'stem';
    flowerStage.appendChild(stem);

    // Leaves
    const leafL = document.createElement('div');
    leafL.className = 'leaf leaf-left';
    const leafR = document.createElement('div');
    leafR.className = 'leaf leaf-right';
    flowerStage.appendChild(leafL);
    flowerStage.appendChild(leafR);

    // Glow ring
    const glow = document.createElement('div');
    glow.className = 'glow-ring';
    flowerStage.appendChild(glow);

    // Flower head
    const head = document.createElement('div');
    head.className = 'flower-head';
    flowerStage.appendChild(head);

    // Create petals in 3 layers
    const layers = [
        { count: 8, cls: 'petal-layer-1', colors: palette.petals[0] },
        { count: 8, cls: 'petal-layer-2', colors: palette.petals[1] },
        { count: 6, cls: 'petal-layer-3', colors: palette.petals[2] },
    ];

    layers.forEach((layer, li) => {
        for (let i = 0; i < layer.count; i++) {
            const petal = document.createElement('div');
            const angle = (360 / layer.count) * i + (li * 15);
            petal.className = `petal ${layer.cls}`;
            petal.style.setProperty('--rotation', `${angle}deg`);
            petal.style.background = `linear-gradient(to top, ${layer.colors}, ${lighten(layer.colors, 30)})`;
            petal.style.transitionDelay = `${0.8 + li * 0.3 + i * 0.05}s`;
            head.appendChild(petal);
        }
    });

    // Center
    const center = document.createElement('div');
    center.className = 'flower-center';
    head.appendChild(center);

    // Sparkles
    for (let i = 0; i < 16; i++) {
        const sp = document.createElement('div');
        sp.className = 'sparkle';
        const angle = (Math.PI * 2 / 16) * i;
        const dist = 60 + Math.random() * 80;
        sp.style.top = '50%';
        sp.style.left = '50%';
        sp.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
        sp.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
        sp.style.setProperty('--delay', `${1.5 + Math.random() * 1}s`);
        sp.style.setProperty('--duration', `${0.8 + Math.random() * 0.5}s`);
        sp.style.background = palette.petals[Math.floor(Math.random() * 3)];
        head.appendChild(sp);
    }

    return { stem, leafL, leafR, glow, head, center };
}

// ===== ANIMATE BLOOM =====
function animateBloom(parts) {
    // 1. Grow stem
    setTimeout(() => parts.stem.classList.add('grow'), 100);

    // 2. Grow leaves
    setTimeout(() => parts.leafL.classList.add('grow'), 600);
    setTimeout(() => parts.leafR.classList.add('grow'), 900);

    // 3. Bloom petals
    setTimeout(() => {
        parts.head.querySelectorAll('.petal').forEach(p => p.classList.add('bloom'));
    }, 800);

    // 4. Show center
    setTimeout(() => parts.center.classList.add('bloom'), 1800);

    // 5. Glow ring
    setTimeout(() => parts.glow.classList.add('bloom'), 2000);

    // 6. Sparkles
    setTimeout(() => {
        parts.head.querySelectorAll('.sparkle').forEach(s => s.classList.add('animate'));
    }, 1800);

    // 7. Falling petals celebration
    setTimeout(() => createFallingPetals(), 2200);

    // 8. Show reset button
    setTimeout(() => resetBtn.classList.add('visible'), 2800);
}

// ===== FALLING PETALS =====
function createFallingPetals() {
    const colors = ['#ff6b9d','#c44dff','#f472b6','#fbbf24','#a78bfa','#60a5fa'];
    for (let i = 0; i < 25; i++) {
        const fp = document.createElement('div');
        fp.className = 'falling-petal';
        fp.style.left = Math.random() * 100 + 'vw';
        fp.style.background = colors[Math.floor(Math.random() * colors.length)];
        fp.style.setProperty('--fall-duration', (4 + Math.random() * 4) + 's');
        fp.style.setProperty('--fall-delay', (Math.random() * 2) + 's');
        fp.style.setProperty('--fall-rotate', (Math.random() * 720 - 360) + 'deg');
        fp.style.width = (12 + Math.random() * 14) + 'px';
        fp.style.height = (14 + Math.random() * 16) + 'px';
        document.body.appendChild(fp);
        // Clean up
        setTimeout(() => fp.remove(), 9000);
    }
}

// ===== BUTTON CLICK BURST =====
function createBurst(x, y) {
    const colors = ['#ff6b9d','#c44dff','#fbbf24','#4ade80','#60a5fa'];
    for (let i = 0; i < 12; i++) {
        const bp = document.createElement('div');
        const angle = (Math.PI * 2 / 12) * i;
        const dist = 40 + Math.random() * 60;
        bp.style.cssText = `
            position:fixed; width:10px; height:12px; border-radius:50% 0 50% 0;
            left:${x}px; top:${y}px; pointer-events:none; z-index:200;
            background:${colors[Math.floor(Math.random() * colors.length)]};
            --bx:${Math.cos(angle)*dist}px; --by:${Math.sin(angle)*dist}px;
            --br:${Math.random()*360}deg;
            animation: burstOut 0.8s ease-out forwards;
        `;
        document.body.appendChild(bp);
        setTimeout(() => bp.remove(), 900);
    }
}

// ===== HELPER: LIGHTEN COLOR =====
function lighten(hex, percent) {
    const num = parseInt(hex.replace('#',''), 16);
    const r = Math.min(255, (num >> 16) + percent);
    const g = Math.min(255, ((num >> 8) & 0x00FF) + percent);
    const b = Math.min(255, (num & 0x0000FF) + percent);
    return `rgb(${r},${g},${b})`;
}

// ===== EVENT: BLOOM =====
bloomBtn.addEventListener('click', (e) => {
    // Burst effect on click
    createBurst(e.clientX, e.clientY);

    // Hide button
    bloomBtn.classList.add('hidden');

    // Pick random palette
    const palette = palettes[Math.floor(Math.random() * palettes.length)];

    // Build & animate
    const parts = buildFlower(palette);
    animateBloom(parts);
});

// ===== EVENT: RESET =====
resetBtn.addEventListener('click', () => {
    resetBtn.classList.remove('visible');
    flowerStage.innerHTML = '';
    bloomBtn.classList.remove('hidden');
});

// ===== INIT =====
createParticles();
