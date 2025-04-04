import { useState } from 'react';

function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  
  const galleryImages = [
    {
      id: 1,
      src: '/photo1.webp',
      alt: 'Ford Runners Club jerseys',
      caption: 'Jerseys are available for purchase through the club'
    },
    {
      id: 2,
      src: '/photo2.webp',
      alt: 'Corporate Cup Relay',
      caption: 'Corporate Cup Relay 2023'
    }
  ];

  const openLightbox = (image) => {
    setCurrentImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <main>
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-header-content">
            <h1 className="page-title">Photo Gallery</h1>
            <p className="page-description">
              Take a look at our running events, group activities, and community moments.
            </p>
          </div>
        </div>

        {/* Gallery Section */}
        <section className="gallery-container">
          <div className="gallery-grid">
            {galleryImages.map(image => (
              <div 
                key={image.id} 
                className="gallery-item"
                onClick={() => openLightbox(image)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="gallery-image"
                  onError={(e) => {
                    // Fallback for images that might not exist in the demo
                    e.target.src = 'https://via.placeholder.com/400x300?text=Ford+Runners+Club';
                  }}
                />
                <div className="gallery-caption">
                  <p>{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lightbox */}
        {lightboxOpen && currentImage && (
          <div className="lightbox active" onClick={closeLightbox}>
            <div 
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={currentImage.src} 
                alt={currentImage.alt} 
                className="lightbox-img"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=Ford+Runners+Club';
                }}
              />
              <div className="lightbox-caption">
                <p>{currentImage.caption}</p>
              </div>
              <button 
                className="lightbox-close" 
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Gallery;
