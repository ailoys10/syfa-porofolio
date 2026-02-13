// Gabungkan semua ke dalam satu DOMContentLoaded agar aman
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navbar
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
    const icon = menuToggle ? menuToggle.querySelector('i') : null;
    const body = document.body;

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
                body.style.overflow = 'hidden';
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
                body.style.overflow = 'auto';
            }
        });

        // Tutup menu saat link diklik
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                icon.className = 'fas fa-bars';
                body.style.overflow = 'auto';
            });
        });
    }

    // 3. Typing Effect
    const textElement = document.getElementById('typing-text');
    const words = ["Informatics Student", "Aspiring Data Scientist", "Aspiring Designer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!textElement) return;
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
            typeSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    setTimeout(type, 1000);

    // 4. Reveal on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 5. Skill Card Accordion (PENYEBAB UTAMA GAGAL KEMARIN)
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        const header = card.querySelector('.skill-card-header');
        if (header) {
            header.addEventListener('click', (e) => {
                // Hentikan efek klik agar tidak tabrakan dengan reveal
                e.stopPropagation();
                
                const isOpen = card.classList.contains('open');
                
                // Tutup kartu lain
                skillCards.forEach(c => c.classList.remove('open'));

                // Toggle kartu ini
                if (!isOpen) {
                    card.classList.add('open');
                }
            });
        }
    });

    // 6. Download CV (Pastikan ID downloadBtn ada di HTML)
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = 'assets/cvSipaNurul.pdf'; // Sesuaikan dengan nama file di HTML kamu
            link.download = 'CV_Sipa_Nurul_Azizah.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});
