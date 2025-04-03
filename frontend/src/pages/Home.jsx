import { Link } from 'react-router-dom';

function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-content">
            <h1>Welcome to the Ford Runners Club</h1>
            <p>
              A community of passionate runners dedicated to promoting health, fitness, 
              and camaraderie through the joy of running.
            </p>
            <div className="home-hero-buttons">
              <Link to="/new" className="btn btn-accent">
                New Runners Start Here
              </Link>
              <Link to="/events" className="btn btn-secondary">
                View Upcoming Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-features">
        <div className="container">
          <h2 className="section-title centered">What We Offer</h2>
          <div className="home-feature-grid">
            <div className="feature-card card">
              <div className="feature-icon">
                <i className="fas fa-running"></i>
              </div>
              <h3 className="feature-title">Group Runs</h3>
              <p>
                Join our weekly group runs led by experienced coaches. No matter your 
                pace or experience level, there's a place for you.
              </p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <h3 className="feature-title">Events & Races</h3>
              <p>
                Participate in local and national running events and races with 
                fellow members, including our annual Corporate Cup Relays.
              </p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="feature-title">Community</h3>
              <p>
                Connect with a supportive community of runners who encourage and 
                motivate each other to achieve their personal goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="home-testimonial">
        <div className="container">
          <h2 className="section-title centered">Runner Stories</h2>
          <div className="strava-widget">
          <iframe allowtransparency='true' frameborder='0' height='454' width='500px' src='https://www.strava.com/clubs/107693/latest-rides/f316579198369657308aac43ec63a6a313c88797?show_rides=true'></iframe>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta">
        <div className="container">
          <div className="home-cta-content">
            <h2 className="cta-title">Ready to Join Our Running Community?</h2>
            <p>
              Whether you're a seasoned marathoner or just starting your running journey, 
              the Ford Runners Club welcomes you. Join us for our next event!
            </p>
            <Link to="#contact-links" className="btn btn-accent">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;