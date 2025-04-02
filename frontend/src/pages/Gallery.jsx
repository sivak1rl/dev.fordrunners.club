import '../styles/style.css';
import '../styles/Gallery.css';

function Gallery() {
  return (
    <div id="content">
      <h1>Photo Gallery</h1>
      <div className="gallery">
        <img src="/photo1.png" alt="Event 1" />
        <img src="/photo2.webp" alt="Event 2" />
      </div>
      <div>
        <h2>Check out our photos on Flickr</h2>
        <a data-flickr-embed="true" data-header="true" data-footer="true"
          href="https://www.flickr.com/photos/100703222@N03" title="">
          <img
            src="https://live.staticflickr.com/5833/21805331798_2091b8fb73_z.webp" 
            width="640" 
            height="480"
            alt="Ford Runners Club Photos" 
          />
        </a>
        {/* You'll need to handle the script tag differently in React */}
        {/* Consider using a React component for Flickr integration */}
      </div>
    </div>
  );
}

export default Gallery;