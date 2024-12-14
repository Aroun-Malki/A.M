// Initialisation du contexte de dessin
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Tableau des particules
let particles = [];

// Classe Particule
class Particle {
    constructor(x, y, speedX, speedY, radius, blur) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.radius = radius;
        this.blur = blur; // Niveau de flou
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        // Si la particule a un blur, appliquer un effet lumineux
        if (this.blur) {
            ctx.shadowColor = "white";
            ctx.shadowBlur = this.blur;
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        } else {
            ctx.shadowBlur = 0; // Pas de flou pour les autres
            ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        }

        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Réapparaître de l'autre côté si la particule sort de l'écran
        if (this.x > canvas.width) this.x = 0;
        if (this.y > canvas.height) this.y = 0;
    }
}

// Générer des particules
function createParticles() {
    particles = [];
    for (let i = 0; i < 150; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = (Math.random() - 0.5) * 0.5;
        const speedY = (Math.random() - 0.5) * 0.5;
        const radius = Math.random() * 3 + 1; // Taille de 1 à 4
        const blur = Math.random() < 0.3 ? Math.random() * 10 + 5 : 0; // 30% des particules ont un flou
        particles.push(new Particle(x, y, speedX, speedY, radius, blur));
    }
}

// Animation des particules
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    if (!paused) requestAnimationFrame(animateParticles);
}

// Gestion du bouton Pause/Play
let paused = false;
document.getElementById("pauseButton").addEventListener("click", () => {
    paused = !paused;
    if (!paused) {
        createParticles(); // Réinitialiser les particules
        animateParticles();
    }
});

// Réagir au redimensionnement de la fenêtre
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
});

// Initialiser les particules
createParticles();
animateParticles();


// Fonction pour ouvrir le client mail
function openMail() {
    window.location.href = "mailto:malki.aro@icloud.com";
}

// Fonction pour copier le numéro de téléphone dans le presse-papiers
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Numéro copié dans le presse-papiers : " + text);
    }).catch(err => {
        console.error("Erreur lors de la copie :", err);
    });
}

// Fonction pour ouvrir Instagram dans un nouvel onglet
function openInstagram() {
    window.open("https://www.instagram.com/aroun_mlk_/", "_blank");
}
