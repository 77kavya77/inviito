// Door Opening Animation
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        document.getElementById('doorContainer').classList.add('door-open');
    }, 500);
});

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('November 16, 2025 12:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        document.querySelector('.countdown').innerHTML = '<div class="date-time">The Wedding Has Arrived!</div>';
    }
}

// Initialize countdown and update every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Calendar Integration
document.getElementById('addToCalendar').addEventListener('click', function () {
    const eventDetails = {
        title: 'Wedding of Jithin & Lekshmi',
        description: 'Join us for the wedding ceremony of Jithin Raj M and Lekshmi Anilkumar',
        location: 'Bishop Jerome Convention Hall, North to Kadavoorchurch, Mathilil PO, thevally, Kollam',
        start: '2025-11-16T12:00:00',
        end: '2025-11-16T12:20:00'
    };

    // Create .ics file for download
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}
LOCATION:${eventDetails.location}
DTSTART:${eventDetails.start.replace(/-|:/g, '')}
DTEND:${eventDetails.end.replace(/-|:/g, '')}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Wedding-Invitation.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Calendar event added! The .ics file has been downloaded.');
});

// Location Map
document.getElementById('viewLocation').addEventListener('click', function () {
    const address = 'Bishop Jerome Convention Hall, North to Kadavoorchurch, Mathilil PO, thevally, Kollam';
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
});

// Auto-advance carousel
let currentSlide = 5; // Start with the middle slide
const totalSlides = 9;

function nextSlide() {
    currentSlide = (currentSlide % totalSlides) + 1;
    document.getElementById(`t-${currentSlide}`).checked = true;
}

// Auto-advance every 5 seconds
setInterval(nextSlide, 5000);

// Fullscreen Image Viewer Functionality
const fullscreenViewer = document.getElementById('fullscreenViewer');
const fullscreenImage = document.getElementById('fullscreenImage');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const imageCounter = document.getElementById('imageCounter');

// Image data (9 images)
const images = [
    'jithin_lekshmi/images/1.jpeg',
    'jithin_lekshmi/images/2.jpeg',
    'jithin_lekshmi/images/3.jpeg',
    'jithin_lekshmi/images/4.jpeg',
    'jithin_lekshmi/images/5.jpeg',
    'jithin_lekshmi/images/6.jpeg',
    'jithin_lekshmi/images/7.jpeg',
    'jithin_lekshmi/images/8.jpeg',
    'jithin_lekshmi/images/9.jpeg'
];

let currentImageIndex = 0;

// Add click events to carousel images
document.querySelectorAll('.testimonial').forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        showFullscreenImage();
    });
});

// Show fullscreen image
function showFullscreenImage() {
    fullscreenImage.src = images[currentImageIndex];
    updateImageCounter();
    fullscreenViewer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close fullscreen viewer
closeBtn.addEventListener('click', () => {
    fullscreenViewer.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Navigate to previous image
prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    fullscreenImage.src = images[currentImageIndex];
    updateImageCounter();
});

// Navigate to next image
nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    fullscreenImage.src = images[currentImageIndex];
    updateImageCounter();
});

// Update image counter
function updateImageCounter() {
    imageCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
}

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fullscreenViewer.classList.contains('active')) {
        fullscreenViewer.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Navigate with arrow keys
document.addEventListener('keydown', (e) => {
    if (fullscreenViewer.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            fullscreenImage.src = images[currentImageIndex];
            updateImageCounter();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            fullscreenImage.src = images[currentImageIndex];
            updateImageCounter();
        }
    }
});


