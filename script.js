const images = [
  'https://iili.io/2Af8hf1.png',
  'https://iili.io/2Af8VWB.png',
  'https://iili.io/2Af81Ox.png',
  'https://iili.io/JGBltp9.png',
  'https://iili.io/JGBlbIe.png',
  'https://iili.io/2Afkerg.png',
  'https://iili.io/2AfkXIV.png',
  'https://iili.io/JGB022V.png',
  'https://iili.io/2AfvpSa.png',
  'https://iili.io/JGBlZk7.png',
  'https://iili.io/2AfkVmQ.png',
  'https://iili.io/JGB0HEx.png',
  'https://iili.io/2Afk6QI.png',
  'https://iili.io/2Af8MxV.png',
  'https://iili.io/2Af8WiP.png',
  'https://iili.io/2AfUqyG.png',
  'https://iili.io/2AfUfvs.png',
  'https://iili.io/2AfUCuf.png',
  'https://iili.io/2AfUIGS.png',
  'https://iili.io/2AfUlZQ.png',
  'https://iili.io/2AfU7yb.png',
  'https://iili.io/2AfU1nV.png',
  'https://iili.io/2AfUG6P.png',
  'https://iili.io/2AfUcwx.png',
  'https://iili.io/2AfUEMB.png',
  'https://iili.io/2AfUVF1.png',
  'https://iili.io/2AfUWcF.png',
  'https://iili.io/2AfUX8g.png',
  'https://iili.io/2Af8OJa.png',
  'https://iili.io/2Afk0ru.png',
  'https://iili.io/2Af87f9.png',
  'https://iili.io/2Af8gsI.png',
  'https://iili.io/2Af860X.png',
  'https://iili.io/2Af84ft.png',
  'https://iili.io/2AfS7Xp.png',
  'https://iili.io/2AfSYLN.png',
  'https://iili.io/2AfS3ej.png',
  'https://iili.io/2AfSMkG.png',
  'https://iili.io/2AfSG7s.png',
  'https://iili.io/2AfSL41.png',
  'https://iili.io/2AfSiCB.png',
  'https://iili.io/2AfSZ3F.png',
  'https://iili.io/2AfSbyJ.png',
  'https://iili.io/2AfSyjR.png',
  'https://iili.io/2AfUdGI.png',
  'https://iili.io/2Afvmcg.png',
  'https://iili.io/2Af8FVI.png',
  'https://iili.io/2Af8KPt.png',
  'https://iili.io/2Af8CSs.png',
  'https://iili.io/2Af8aUu.png',
  'https://iili.io/2AfviwQ.png',
  'https://iili.io/2AfvZMP.png',
  'https://iili.io/2AfkiBt.png',
  'https://iili.io/2AfvCTQ.png',
  'https://iili.io/2AfvoZB.png',
  'https://iili.io/2AfkhhB.png',
  'https://iili.io/2AfkNB1.png'
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
  
  const imageUrl = 'https://iili.io/2Aum1ou.png'; 
  const filename = 'Tyler_Graybeal_Compcard.png';

  // Show loading state if desired
  // downloadBtn.textContent = 'Downloading...';

  fetch(imageUrl)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.blob();
    })
    .then(blob => {
      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create a temporary link
      const downloadLink = document.createElement('a');
      downloadLink.style.display = 'none';
      downloadLink.href = blobUrl;
      downloadLink.download = filename;
      
      // Add to document, click, and clean up
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      // Clean up the blob URL
      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
        // Reset button text if you added loading state
        // downloadBtn.textContent = 'Download Compcard';
      }, 100);
    })
    .catch(error => {
      console.error('Download failed:', error);
      // Reset button text if you added loading state
      // downloadBtn.textContent = 'Download Compcard';
    });
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
