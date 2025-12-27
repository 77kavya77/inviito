// Digital Clock and Date
function updateDateTime() {
    const now = new Date();
    const weddingDate = new Date('December 29, 2025 10:00:00');

    const timeElement = document.getElementById('digital-time');
    const dateElement = document.getElementById('digital-date');

    // Keep the wedding date text if element exists
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    if (dateElement) {
        dateElement.textContent = weddingDate.toLocaleDateString('en-US', options);
    }

    // Compute countdown
    const diffMs = weddingDate - now;
    const totalSeconds = Math.floor(diffMs / 1000);

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    if (timeElement) {
        if (totalSeconds > 0) {
            const days = Math.floor(totalSeconds / (3600 * 24));
            let rem = totalSeconds % (3600 * 24);
            const hours = Math.floor(rem / 3600);
            rem = rem % 3600;
            const minutes = Math.floor(rem / 60);
            const seconds = rem % 60;

            // Format: "Xd HH:MM:SS" (hide days if 0)
            const timeStr = (days > 0)
                ? `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
                : `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

            timeElement.textContent = timeStr;
        } else if (totalSeconds > -86400) {
            // If the wedding is within the last 24 hours or happening now
            timeElement.textContent = 'Happening today!';
        } else {
            // Event passed
            timeElement.textContent = 'Event has passed';
        }
    }
}

// Update time every second
setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call

// Add to Calendar functionality
document.getElementById('addToCalendar').addEventListener('click', function (e) {
    e.preventDefault();

    // Create ICS file content
    const weddingDate = new Date('December 29, 2025 10:00:00');
    const receptionDate = new Date('December 29, 2025 13:00:00');

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//John and Chaithanya//EN
BEGIN:VEVENT
UID:wedding-john-chaithanya-20251229
DTSTAMP:${formatDateForICS(new Date())}
DTSTART:${formatDateForICS(weddingDate)}
DTEND:${formatDateForICS(new Date(weddingDate.getTime() + 2 * 60 * 60 * 1000))}
SUMMARY:Wedding of John Soloman and Chaithanya Shajumon
LOCATION:Mar Yohannan Mamdhana Church Eastfort, Thrissur
DESCRIPTION:Wedding ceremony of John Soloman and Chaithanya Shajumon\\n\\nReception and lunch to follow at Elinor Convention Centre Vinpy Nagar, Paravattani, Thrissur.
END:VEVENT
BEGIN:VEVENT
UID:reception-john-chaithanya-20251229
DTSTAMP:${formatDateForICS(new Date())}
DTSTART:${formatDateForICS(receptionDate)}
DTEND:${formatDateForICS(new Date(receptionDate.getTime() + 4 * 60 * 60 * 1000))}
SUMMARY:Wedding Reception - John and Chaithanya
LOCATION:Elinor Convention Centre Vinpy Nagar, Paravattani, Thrissur
DESCRIPTION:Wedding reception and lunch for John Soloman and Chaithanya Shajumon.
END:VEVENT
END:VCALENDAR`;

    // Create download link for ICS file
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'John-Chaithanya-Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show confirmation message
    alert('Calendar event downloaded! Please open the downloaded file to add it to your calendar.');
});

function formatDateForICS(date) {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

// Social sharing
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', function (e) {
        e.preventDefault();

        if (this.querySelector('.fa-whatsapp')) {
            // WhatsApp sharing
            const text = "Hello! I want to know more about your wedding invitation.";
            const url = encodeURIComponent(window.location.href);
            window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' )}`, '_blank');
        } else if (this.querySelector('.fa-instagram')) {
            // Instagram (just open Instagram in this demo)
            window.open('https://instagram.com', '_blank');
        } else if (this.querySelector('.fa-heart')) {
            // Save the date
            alert('Save this date: December 29, 2025!');
        }
    });
});

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentIndexElement = document.getElementById('currentIndex');
const totalImagesElement = document.getElementById('totalImages');

// Get all gallery images
const galleryImages = document.querySelectorAll('.photo-frame img');
const totalImages = galleryImages.length;
let currentImageIndex = 0;

// Set total images count
totalImagesElement.textContent = totalImages;

// Open lightbox when clicking on gallery images
galleryImages.forEach((img, index) => {
    img.parentElement.addEventListener('click', () => {
        openLightbox(index);
    });
});

// Open lightbox function
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close lightbox function
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scrolling
}

// Update lightbox image - Always use high-res version for lightbox
function updateLightboxImage() {
    // Use data-src if available (high-res), otherwise use regular src
    const imgSrc = galleryImages[currentImageIndex].getAttribute('data-src') ||
        galleryImages[currentImageIndex].getAttribute('src');

    // Create new image to preload
    const newImage = new Image();
    newImage.src = imgSrc;

    // Show loading message
    lightboxImage.src = '';
    lightboxImage.alt = 'Loading...';

    // When image is loaded, show it
    newImage.onload = function () {
        lightboxImage.src = imgSrc;
        lightboxImage.alt = galleryImages[currentImageIndex].alt;
        currentIndexElement.textContent = currentImageIndex + 1;
    };

    // If there's an error, fall back to regular src
    newImage.onerror = function () {
        const fallbackSrc = galleryImages[currentImageIndex].getAttribute('src');
        lightboxImage.src = fallbackSrc;
        lightboxImage.alt = galleryImages[currentImageIndex].alt;
        currentIndexElement.textContent = currentImageIndex + 1;
    };
}

// Navigate to next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    updateLightboxImage();
}

// Navigate to previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    updateLightboxImage();
}

// Event listeners for lightbox controls
lightboxClose.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

// Close lightbox when clicking on background (anywhere except navigation buttons)
lightbox.addEventListener('click', (e) => {
    // Close only when clicking on backdrop (lightbox) or the explicit close button
    if (e.target === lightbox || e.target === lightboxClose) {
        closeLightbox();
    }
});

// Keyboard navigation (optional, but still works)
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            prevImage();
            break;
        case 'ArrowRight':
            nextImage();
            break;
    }
});

// Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;

    if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left - next image
        nextImage();
    } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right - previous image
        prevImage();
    }
}

// Make sure all gallery images have the same dimensions
function ensureImageSizes() {
    galleryImages.forEach(img => {
        // Force all gallery images to maintain aspect ratio but fill the container
        img.style.objectFit = 'cover';
    });
}

// Initialize image sizes
ensureImageSizes();

// Initialize Maps
function initializeMaps() {
    // Coordinates for Mar Yohannan Mamdhana Church, Thrissur
    const churchCoords = [10.5243, 76.2145];

    // Coordinates for Elinor Convention Centre, Paravattani, Thrissur
    const receptionCoords = [10.5421, 76.2015];

    // Initialize Church Map
    const churchMap = L.map('churchMap').setView(churchCoords, 15);

    // Add tile layer to church map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(churchMap);

    // Add marker for church
    const churchIcon = L.divIcon({
        className: 'custom-div-icon',
        html: '<div style="background-color: #3E2026; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;"><i class="fas fa-church"></i></div>',
        iconSize: [40, 40],
        iconAnchor: [20, 40]
    });

    L.marker(churchCoords, { icon: churchIcon })
        .addTo(churchMap)
        .bindPopup('<b>Mar Yohannan Mamdhana Church</b><br>Eastfort, Thrissur')
        .openPopup();

    // Initialize Reception Map
    const receptionMap = L.map('receptionMap').setView(receptionCoords, 15);

    // Add tile layer to reception map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(receptionMap);

    // Add marker for reception venue
    const receptionIcon = L.divIcon({
        className: 'custom-div-icon',
        html: '<div style="background-color: #6F8451; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;"><i class="fas fa-utensils"></i></div>',
        iconSize: [40, 40],
        iconAnchor: [20, 40]
    });

    L.marker(receptionCoords, { icon: receptionIcon })
        .addTo(receptionMap)
        .bindPopup('<b>Elinor Convention Centre</b><br>Vinpy Nagar, Paravattani, Thrissur')
        .openPopup();

    // Fit both maps properly after a short delay
    setTimeout(() => {
        churchMap.invalidateSize();
        receptionMap.invalidateSize();
    }, 100);
}

// Debug helper: Find elements that overflow the viewport horizontally
function detectOverflowElements() {
    const vw = document.documentElement.clientWidth;
    const overflowing = [];

    [...document.querySelectorAll('body *')].forEach(el => {
        // ignore elements not rendered or invisible
        const style = getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || el.offsetParent === null) return;

        const sw = el.scrollWidth;
        if (sw > vw + 1) { // small tolerance
            overflowing.push({ el, sw, tag: el.tagName, cls: el.className });
            // add a temporary visible outline to help inspection
            el.style.outline = '3px solid rgba(255,0,0,0.7)';
            el.style.outlineOffset = '-3px';
        }
    });

    if (overflowing.length) {
        console.warn('Overflowing elements (wider than viewport):', overflowing);
    } else {
        console.info('No overflowing elements detected.');
    }
}

// Run detector after load and after a short delay to allow layout to settle
document.addEventListener('DOMContentLoaded', function () {
    // Initialize maps after a short delay to ensure containers are rendered
    setTimeout(initializeMaps, 300);

    setTimeout(detectOverflowElements, 300);
    setTimeout(detectOverflowElements, 1200); // run again after fonts/images load
});


