// 1. Sticky Navbar & Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const icon = menuToggle.querySelector('i'); // Lebih spesifik ke ikon hamburger
const body = document.body; // Mendefinisikan body agar tidak error

// 1. Fungsi untuk Toggle Buka/Tutup
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Switch ikon dan kunci scroll
    if (navLinks.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times'); // Ubah ke X
        body.style.overflow = 'hidden';
    } else {
        icon.classList.replace('fa-times', 'fa-bars'); // Kembali ke garis tiga
        body.style.overflow = 'auto';
    }
});

// 2. SOLUSI STUCK: Tutup menu saat salah satu link diklik
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        // Hapus class active agar menu menghilang
        navLinks.classList.remove('active');
        
        // Kembalikan ikon ke bentuk semula (garis tiga)
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
        
        // Aktifkan kembali scroll halaman
        body.style.overflow = 'auto';
    });
});
// Close menu when clicking a link (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        icon.className = 'fas fa-bars';
        document.body.style.overflow = 'auto';
    });
});

// 3. Typing Effect
const textElement = document.getElementById('typing-text');
const words = ["Informatics Student", "Aspiring Data Scientist", "Aspiring Designer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 100 : 200;

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 1500; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Start typing on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// 4. Reveal on Scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 5. Contact Form Validation (Simple)
const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! Your message has been sent successfully.');
        contactForm.reset();
    });
}
// 6. Download CV Functionality
const downloadBtn = document.getElementById('downloadBtn');
downloadBtn.addEventListener('click', () => {
    // 1. Tentukan path/lokasi file CV kamu (misal dalam folder assets)
    const fileUrl = 'assets/CV_Sipa_Nurul_Azizah.pdf'; 
    
    // 2. Tentukan nama file saat nanti tersimpan di komputer user
    const fileName = 'CV_Sipa_Nurul_Azizah.pdf';

    // 3. Buat elemen link sementara
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;

    // 4. Masukkan ke dokumen, klik, lalu hapus lagi
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// 7. Skill Card Toggle with Accordion Behavior
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    const arrow = card.querySelector('.arrow-icon');
    
    if (arrow) { // Pastikan arrow ada
        arrow.addEventListener('click', (e) => {
            // Mencegah klik 'tembus' ke elemen induk
            e.stopPropagation();

            // Gunakan class 'open', jangan 'active' karena bentrok dengan reveal scroll
            const isOpen = card.classList.contains('open');

            // Tutup kartu lain (sistem accordion)
            // Ini menghapus class 'open', bukan 'active', jadi bubble tetap nampak
            skillCards.forEach(c => c.classList.remove('open'));

            // Jika sebelumnya tidak terbuka, maka buka sekarang
            if (!isOpen) {
                card.classList.add('open');
            }
        });
    }
});