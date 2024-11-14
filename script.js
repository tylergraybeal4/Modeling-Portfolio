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


const extendedImages = [...images];

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
  const imageUrl = 'https://github.com/tylergraybeal4/Modeling-Portfolio/blob/main/Modeling-pics/IMG_5652.JPG?raw=true';

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
