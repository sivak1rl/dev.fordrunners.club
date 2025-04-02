import { useState } from 'react';

function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  
  const galleryImages = [
    {
      id: 1,
      src: '/photo1.png',
      alt: 'Group Run Event',
      caption: 'Weekly group run through the park'
    },
    {
      id: 2,
      src: '/photo2.webp',
      alt: 'Corporate Cup Relay',
      caption: 'Corporate Cup Relay 2023'
    },
    {
      id: 3,
      src: '/gallery/track-event.jpg',
      alt: 'Track Event',
      caption: 'Annual track competition'
    },
    {
      id: 4,
      src: '/gallery/charity-run.jpg',
      alt: 'Charity Run',
      caption: 'Fundraising event for Special Olympics'
    },
    {
      id: 5,
      src: '/gallery/training-session.jpg',
      alt: 'Training Session',
      caption: 'Coach-led training session for new runners'
    },
    {
      id: 6,
      src: '/gallery/awards-ceremony.jpg',
      alt: 'Awards Ceremony',
      caption: 'Annual awards ceremony celebrating our runners'
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

        {/* Flickr Embed Section */}
        <section className="section">
          <h2 className="section-title">More Photos on Flickr</h2>
          <p className="mb-6">
            Visit our Flickr page to see more photos from our events and activities.
          </p>
          
          <div className="flickr-embed">
            <a 
              href="https://www.flickr.com/photos/100703222@N03" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://live.staticflickr.com/5833/21805331798_2091b8fb73_z.webp" 
                width="100%" 
                alt="Ford Runners Club Photos on Flickr" 
                className="rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400?text=Ford+Runners+Club+Flickr';
                }}
              />
            </a>
            <div className="text-center mt-4">
              <a 
                href="https://www.flickr.com/photos/100703222@N03" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View Full Gallery on Flickr
              </a>
            </div>
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