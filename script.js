let currentIndex = 0;
let visibleImages = []; // Jo images filter hone ke baad screen par hain, sirf unhi me next/prev karega

// Shuru mein jo images screen par hain unko list me daal lo
function updateVisibleImages() {
    let allImages = document.querySelectorAll('.item');
    visibleImages = Array.from(allImages).filter(img => img.style.display !== 'none');
}

// Category Filter Function
function filterImages(category) {
    let items = document.querySelectorAll('.item');
    
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
            setTimeout(() => item.style.opacity = '1', 50); // Smooth dikhane ke liye
        } else {
            item.style.opacity = '0';
            setTimeout(() => item.style.display = 'none', 300);
        }
    });

    // Filter hone ke baad next/prev wali list update karo
    setTimeout(updateVisibleImages, 350);
}

// Lightbox Open Function
function openLightbox(element) {
    updateVisibleImages(); // Ensure karega k list updated hai
    currentIndex = visibleImages.indexOf(element); // Pata lagayega k click ki gayi image ka number kya hai
    document.getElementById('lightbox').style.display = 'flex';
    document.getElementById('lightbox-img').src = element.src;
}

// Lightbox Close Function
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Next / Previous Button Function
function changeImage(step) {
    currentIndex += step;
    
    // Agar list k aakhir me hain, to wapis shuru me chale jao
    if (currentIndex >= visibleImages.length) {
        currentIndex = 0;
    } 
    // Agar list k shuru me hain (peechay ja rahe hain), to aakhir me chale jao
    else if (currentIndex < 0) {
        currentIndex = visibleImages.length - 1;
    }
    
    document.getElementById('lightbox-img').src = visibleImages[currentIndex].src;
}

// Pehli dafa page load hone par images update kar lo
window.onload = updateVisibleImages;