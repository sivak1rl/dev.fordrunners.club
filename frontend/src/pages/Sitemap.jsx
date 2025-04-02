import { Link } from 'react-router-dom';

function Sitemap() {
  return (
    <main>
      <div className="container max-w-4xl">
        <div className="page-header">
          <h1 className="page-title">Sitemap</h1>
          <p className="page-description">
            Find your way around the Ford Runners Club website.
          </p>
        </div>

        <div className="card p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Main Pages</h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-ford-blue hover:underline flex items-center">
                    <i className="fas fa-home mr-2"></i> Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-ford-blue hover:underline flex items-center">
                    <i className="fas fa-info-circle mr-2"></i> About Us
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="text-ford-blue hover:underline flex items-center">
                    <i className="fas fa-calendar-alt mr-2"></i> Events
                  </Link>
                </li>
                <li>
                  <Link to="/new" className="text-ford-blue hover:underline flex items-center">
                    <i className="fas fa-running mr-2"></i> New Runners
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="text-ford-blue hover:underline flex items-center">
                    <i className="fas fa-images mr-2"></i> Photo Gallery
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/disclaimer" className="text-ford-blue hover:underline flex items-center">
                    <i className="fas fa-file-alt mr-2"></i> Disclaimer
                  </Link>
                </li>
                <li>
                  <Link to="/sitemap" className="text-ford-blue hover:underline flex items-center">
                    <i className="fas fa-sitemap mr-2"></i> Sitemap
                  </Link>
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">External Resources</h2>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://calendar.google.com/calendar/embed?wkst=1&bgcolor=%23ffffff&ctz=America%2FNew_York&src=Zm9yZHJ1bm5lcmNsdWJAZ21haWwuY29t"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ford-blue hover:underline flex items-center"
                  >
                    <i className="fas fa-calendar mr-2"></i> Google Calendar
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.flickr.com/photos/100703222@N03"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ford-blue hover:underline flex items-center"
                  >
                    <i className="fas fa-camera mr-2"></i> Flickr Photo Gallery
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Sitemap;