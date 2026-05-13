
localStorage.setItem("last_page", "welcome");

function playIntroSound() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    function note(freq, start, dur, type = 'sine', gainVal = 0.22, fadeOut = true) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0, ctx.currentTime + start);
        gain.gain.linearRampToValueAtTime(gainVal, ctx.currentTime + start + 0.04);
        if (fadeOut) {
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
        }
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + dur + 0.05);
    }

    
    const melody = [
        [523.25, 0.00, 0.25, 'sine', 0.18],  // C5
        [659.25, 0.18, 0.25, 'sine', 0.20],  // E5
        [783.99, 0.34, 0.25, 'sine', 0.20],  // G5
        [1046.5, 0.50, 0.30, 'sine', 0.18],  // C6
        [1318.5, 0.65, 0.20, 'sine', 0.14],  // E6
        // Sparkle tinkle
        [2093, 0.10, 0.15, 'sine', 0.06],
        [2637, 0.28, 0.12, 'sine', 0.05],
        [2093, 0.46, 0.12, 'sine', 0.05],
        [3136, 0.60, 0.10, 'sine', 0.04],
        // Warm chord pad
        [261.63, 0.40, 0.9, 'triangle', 0.08],
        [329.63, 0.40, 0.9, 'triangle', 0.07],
        [392.00, 0.40, 0.9, 'triangle', 0.07],
        // Final chime hits
        [1568, 0.82, 0.35, 'sine', 0.16],
        [1976, 0.96, 0.35, 'sine', 0.14],
        [2349, 1.08, 0.45, 'sine', 0.18],
        [3136, 1.20, 0.5, 'sine', 0.12],
        // Bloom
        [4186, 1.30, 0.6, 'sine', 0.08],
    ];

    melody.forEach(([f, s, d, t, v]) => note(f, s, d, t, v));

   
    function popDrum(start) {
        const b = ctx.createOscillator();
        const bg = ctx.createGain();
        b.connect(bg);
        bg.connect(ctx.destination);
        b.type = 'sine';
        b.frequency.setValueAtTime(200, ctx.currentTime + start);
        b.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + start + 0.12);
        bg.gain.setValueAtTime(0.18, ctx.currentTime + start);
        bg.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + 0.15);
        b.start(ctx.currentTime + start);
        b.stop(ctx.currentTime + start + 0.2);
    }
    
    [0.0, 0.35, 0.70, 1.05].forEach(t => popDrum(t));

    setTimeout(() => {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
            note(f, i * 0.06, 1.2, 'sine', 0.12);
        });
    }, 1300);
}


let soundPlayed = false;

function trySound() {
    if (soundPlayed) return;
    soundPlayed = true;
    playIntroSound();
}

setTimeout(() => {
    try {
        trySound();
    } catch (e) {}
}, 300);

['click', 'touchstart', 'keydown'].forEach(e =>
    document.addEventListener(e, trySound, { once: true })
);


(function() {
    const c = document.getElementById('bgCanvas');
    const ctx = c.getContext('2d');
    let W, H, t = 0;

    function resize() {
        W = c.width = window.innerWidth;
        H = c.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const colors = [
        [15, 32, 50], [10, 40, 80], [20, 20, 60], [5, 35, 45]
    ];
    let ci = 0;

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function draw() {
        t += 0.005;
        const phase = (Math.sin(t) * 0.5 + 0.5);
        const c1 = colors[Math.floor(ci) % colors.length];
        const c2 = colors[(Math.floor(ci) + 1) % colors.length];

        const r = lerp(c1[0], c2[0], phase);
        const g = lerp(c1[1], c2[1], phase);
        const b = lerp(c1[2], c2[2], phase);

        if (phase > 0.99) ci = (ci + 1) % colors.length;

        ctx.fillStyle = `rgb(${r | 0}, ${g | 0}, ${b | 0})`;
        ctx.fillRect(0, 0, W, H);

        // Nebula blobs
        const blobs = [
            { x: W * 0.2, y: H * 0.3, r: W * 0.4, col: `rgba(67,233,123,${0.04 + 0.03 * Math.sin(t * 1.3)})` },
            { x: W * 0.8, y: H * 0.7, r: W * 0.35, col: `rgba(79,172,254,${0.04 + 0.03 * Math.sin(t * 0.9)})` },
            { x: W * 0.5, y: H * 0.15, r: W * 0.3, col: `rgba(253,121,168,${0.03 + 0.02 * Math.sin(t * 1.7)})` },
            { x: W * 0.1, y: H * 0.8, r: W * 0.25, col: `rgba(162,155,254,${0.03 + 0.02 * Math.sin(t * 1.1)})` },
        ];

        blobs.forEach(blob => {
            const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
            grad.addColorStop(0, blob.col);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, W, H);
        });

        requestAnimationFrame(draw);
    }
    draw();
})();


(function() {
    const c = document.getElementById('particleCanvas');
    const ctx = c.getContext('2d');
    let W, H;

    function resize() {
        W = c.width = window.innerWidth;
        H = c.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#43e97b', '#38f9d7', '#4facfe', '#a29bfe', '#fd79a8', '#ffe066', '#ffffff'];
    const pts = [];

    for (let i = 0; i < 90; i++) {
        pts.push({
            x: Math.random() * 2000,
            y: Math.random() * 1200,
            vx: (Math.random() - 0.5) * 0.4,
            vy: -0.3 - Math.random() * 0.6,
            r: 1 + Math.random() * 2.5,
            col: colors[Math.floor(Math.random() * colors.length)],
            a: Math.random(),
            da: 0.005 + Math.random() * 0.015,
            life: Math.random()
        });
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        pts.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life += 0.003;
            p.a = Math.abs(Math.sin(p.life * Math.PI));
            
            if (p.y < -10) {
                p.y = H + 10;
                p.x = Math.random() * W;
                p.life = 0;
            }
            
            ctx.beginPath();
            ctx.arc(p.x % W, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.col;
            ctx.globalAlpha = p.a * 0.7;
            ctx.fill();
            
            // Glow effect
            ctx.beginPath();
            ctx.arc(p.x % W, p.y, p.r * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = p.col;
            ctx.globalAlpha = p.a * 0.12;
            ctx.fill();
        });
        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
    }
    draw();
})();

(function() {
    const burst = document.getElementById('burst');
    const colors = ['#43e97b', '#4facfe', '#fd79a8', '#ffe066', '#a29bfe', '#38f9d7', '#ff9f43'];
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    setTimeout(() => {
        for (let i = 0; i < 60; i++) {
            const d = document.createElement('div');
            d.classList.add('bp');
            const angle = Math.random() * Math.PI * 2;
            const dist = 80 + Math.random() * 200;
            const sz = 4 + Math.random() * 10;
            const dur = 0.6 + Math.random() * 0.8;
            
            d.style.cssText = `
                left: ${cx}px; top: ${cy}px;
                width: ${sz}px; height: ${sz}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                --bx: ${Math.cos(angle) * dist}px;
                --by: ${Math.sin(angle) * dist}px;
                animation-name: burstOut;
                animation-duration: ${dur}s;
                animation-delay: ${0.2 + Math.random() * 0.3}s;
                box-shadow: 0 0 6px currentColor;
            `;
            burst.appendChild(d);
        }
        
        setTimeout(() => burst.innerHTML = '', 2000);
    }, 800);
})();


setTimeout(() => {
    document.getElementById('fadeOut').classList.add('go');
    setTimeout(() => {
        window.location.href = 'welcome.html';
    }, 850);
}, 5500);