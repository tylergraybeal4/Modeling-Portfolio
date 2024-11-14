const images = [
  'https://github.com/tylergraybeal4/Modeling-Portfolio/blob/main/image000000.jpg?raw=true',
  'https://github.com/tylergraybeal4/Modeling-Portfolio/blob/main/IMG_6912.JPG?raw=true',
  'https://github.com/tylergraybeal4/Modeling-Portfolio/blob/main/IMG_5652.JPG?raw=true',
  'https://github.com/tylergraybeal4/Modeling-Portfolio/blob/main/IMG_5651.JPG?raw=true',
  'https://github.com/tylergraybeal4/Modeling-Portfolio/blob/main/IMG_5650.JPG?raw=true',
  'https://github.com/tylergraybeal4/Modeling-Portfolio/blob/main/IMG_5649.JPG?raw=true'
];

const extendedImages = [...images, ...images, ...images, ...images];

const gallery = document.getElementById('gallery');
const overlay = document.getElementById('overlay');
const overlayImage = document.getElementById('overlayImage');
const overlayClose = document.getElementById('overlayClose');
const overlayPrev = document.getElementById('overlayPrev');
const overlayNext = document.getElementById('overlayNext');
const downloadBtn = document.getElementById('downloadBtn');
const overlayDownloadBtn = document.getElementById('overlayDownloadBtn');

let currentImageIndex = 0;

extendedImages.forEach((src, index) => {
  const item = document.createElement('div');
  item.className = 'gallery-item';
  
  const img = document.createElement('img');
  img.src = src;
  img.alt = `Tyler Graybeal - Image ${index + 1}`;
  img.loading = 'lazy';
  
  item.appendChild(img);
  item.addEventListener('click', () => openOverlay(index));
  gallery.appendChild(item);
});

function openOverlay(index) {
  currentImageIndex = index;
  overlayImage.src = extendedImages[index];
  overlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeOverlay() {
  overlay.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + extendedImages.length) % extendedImages.length;
  overlayImage.src = extendedImages[currentImageIndex];
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % extendedImages.length;
  overlayImage.src = extendedImages[currentImageIndex];
}

function handleDownload(e) {
  e.preventDefault();
  
  // Set the URL of the image to download
  const imageUrl = 'https://github.com/tylergraybeal4/Modeling-Portfolio/blob/main/IMG_5651.JPG?raw=true';

  // Create an anchor element and set the download attributes
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = 'Tyler_Graybeal_Compcard.png'; // Set the desired file name for download
  
  // Programmatically click the link to trigger the download
  link.click();
}

// Event Listeners
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
