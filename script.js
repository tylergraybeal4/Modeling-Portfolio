// Image array
const images = [
  'https://iili.io/2Af8hf1.jpg',
  'https://iili.io/2Af8VWB.jpg',
  'https://iili.io/2Af81Ox.jpg',
  'https://iili.io/JGBltp9.jpg',
  'https://iili.io/JGBlbIe.jpg',
  'https://iili.io/2Afkerg.jpg',
  'https://iili.io/2AfkXIV.jpg',
  'https://iili.io/JGB022V.jpg',
  'https://iili.io/2AfvpSa.jpg',
  'https://iili.io/JGBlZk7.jpg',
  'https://iili.io/2AfkVmQ.jpg',
  'https://iili.io/JGB0HEx.jpg',
  'https://iili.io/2Afk6QI.jpg',
  'https://iili.io/2Af8MxV.jpg',
  'https://iili.io/2Af8WiP.jpg',
  'https://iili.io/2AfUqyG.jpg',
  'https://iili.io/2AfUfvs.jpg',
  'https://iili.io/2AfUCuf.jpg',
  'https://iili.io/2AfUIGS.jpg',
  'https://iili.io/2AfUlZQ.jpg',
  'https://iili.io/2AfU7yb.jpg',
  'https://iili.io/2AfU1nV.jpg',
  'https://iili.io/2AfUG6P.jpg',
  'https://iili.io/2AfUcwx.jpg',
  'https://iili.io/2AfUEMB.jpg',
  'https://iili.io/2AfUVF1.jpg',
  'https://iili.io/2AfUWcF.jpg',
  'https://iili.io/2AfUX8g.jpg',
  'https://iili.io/2Af8OJa.jpg',
  'https://iili.io/2Afk0ru.jpg',
  'https://iili.io/2Af87f9.jpg',
  'https://iili.io/2Af8gsI.jpg',
  'https://iili.io/2Af860X.jpg',
  'https://iili.io/2Af84ft.jpg',
  'https://iili.io/2AfS7Xp.jpg',
  'https://iili.io/2AfSYLN.jpg',
  'https://iili.io/2AfS3ej.jpg',
  'https://iili.io/2AfSMkG.jpg',
  'https://iili.io/2AfSG7s.jpg',
  'https://iili.io/2AfSL41.jpg',
  'https://iili.io/2AfSiCB.jpg',
  'https://iili.io/2AfSZ3F.jpg',
  'https://iili.io/2AfSbyJ.jpg',
  'https://iili.io/2AfSyjR.jpg',
  'https://iili.io/2AfUdGI.jpg',
  'https://iili.io/2Afvmcg.jpg',
  'https://iili.io/2Af8FVI.jpg',
  'https://iili.io/2Af8KPt.jpg',
  'https://iili.io/2Af8CSs.jpg',
  'https://iili.io/2Af8aUu.jpg',
  'https://iili.io/2AfviwQ.jpg',
  'https://iili.io/2AfvZMP.jpg',
  'https://iili.io/2AfkiBt.jpg',
  'https://iili.io/2AfvCTQ.jpg',
  'https://iili.io/2AfvoZB.jpg',
  'https://iili.io/2AfkhhB.jpg',
  'https://iili.io/2AfkNB1.jpg'
];

// Image loading utilities
const createImageLoader = () => {
  const imageCache = new Map();
  const loadingPromises = new Map();

  const preloadImage = (src) => {
    if (imageCache.has(src)) {
      return Promise.resolve(imageCache.get(src));
    }

    if (loadingPromises.has(src)) {
      return loadingPromises.get(src);
    }

    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        imageCache.set(src, img);
        loadingPromises.delete(src);
        resolve(img);
      };
      
      img.onerror = () => {
        loadingPromises.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      img.src = src;
    });

    loadingPromises.set(src, promise);
    return promise;
  };

  return { preloadImage };
};

// DOM Elements
const gallery = document.getElementById('gallery');
const overlay = document.getElementById('overlay');
const overlayImage = document.getElementById('overlayImage');
const overlayClose = document.getElementById('overlayClose');
const overlayPrev = document.getElementById('overlayPrev');
const overlayNext = document.getElementById('overlayNext');
const downloadBtn = document.getElementById('downloadBtn');
const overlayDownloadBtn = document.getElementById('overlayDownloadBtn');

let currentImageIndex = 0;
const imageLoader = createImageLoader();

// Initialize gallery with lazy loading
const initGallery = () => {
  // Create intersection observer for lazy loading
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        loadImage(img);
      }
    });
  }, {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  });

  // Create and append gallery items
  images.forEach((src, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    const img = document.createElement('img');
    img.dataset.src = src;
    img.alt = `Tyler Graybeal - Image ${index + 1}`;
    img.loading = 'lazy';
    img.classList.add('image-loading');
    
    item.appendChild(img);
    item.addEventListener('click', () => openOverlay(index));
    gallery.appendChild(item);
    
    // Observe for lazy loading
    observer.observe(img);
  });

  // Preload first few images
  images.slice(0, 4).forEach(src => imageLoader.preloadImage(src));
};

// Load individual images
const loadImage = async (imgElement) => {
  try {
    const src = imgElement.dataset.src;
    if (!src) return;

    await imageLoader.preloadImage(src);
    imgElement.src = src;
    imgElement.classList.add('loaded');
    
    // Preload next few images
    const index = images.indexOf(src);
    if (index !== -1) {
      const nextImages = images.slice(index + 1, index + 4);
      nextImages.forEach(nextSrc => imageLoader.preloadImage(nextSrc));
    }
  } catch (error) {
    console.error('Error loading image:', error);
  }
};

// Overlay functions
function openOverlay(index) {
  currentImageIndex = index;
  const src = images[index];
  
  // Show loading state
  overlayImage.style.opacity = '0.5';
  
  // Load image
  imageLoader.preloadImage(src).then(() => {
    overlayImage.src = src;
    overlayImage.style.opacity = '1';
    
    // Preload adjacent images
    if (index < images.length - 1) {
      imageLoader.preloadImage(images[index + 1]);
    }
    if (index > 0) {
      imageLoader.preloadImage(images[index - 1]);
    }
  });
  
  overlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeOverlay() {
  overlay.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  openOverlay(currentImageIndex);
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  openOverlay(currentImageIndex);
}

function handleDownload(e) {
  e.preventDefault();
  const imageUrl = 'https://github.com/tylergraybeal4/Modeling-Portfolio/blob/main/Modeling-pics/IMG_5652.JPG?raw=true';
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = 'Tyler_Graybeal_Compcard.png';
  link.click();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initGallery);
overlayClose.addEventListener('click', closeOverlay);
overlayPrev.addEventListener('click', showPrevImage);
overlayNext.addEventListener('click', showNextImage);
downloadBtn.addEventListener('click', handleDownload);
overlayDownloadBtn.addEventListener('click', handleDownload);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    closeOverlay();
  }
});

document.addEventListener('keydown', (e) => {
  if (overlay.style.display === 'block') {
    if (e.key === 'Escape') closeOverlay();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
  }
});
