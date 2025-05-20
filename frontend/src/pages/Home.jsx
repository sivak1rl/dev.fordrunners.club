import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditableSection from '../components/EditableSection'; // Import the component

function Home() {
  const [pageContent, setPageContent] = useState({});
  const [loading, setLoading] = useState(true);
  const pageName = "home"; // Define pageName for EditableSection

  useEffect(() => {
    fetch(`/api/content/${pageName}`)
      .then(response => response.json())
      .then(data => {
        const contentMap = data.reduce((acc, item) => {
          acc[item.section_name] = item.content;
          return acc;
        }, {});
        setPageContent(contentMap);
        setLoading(false);
      })
      .catch(error => {
        console.error(`Error fetching ${pageName} page content:`, error);
        setLoading(false);
      });
  }, []);

  const handleSaveContent = (sectionName, newContent) => {
    setPageContent(prevContent => ({
      ...prevContent,
      [sectionName]: newContent,
    }));
  };

  if (loading) {
    return <main><div className="container"><p>Loading content...</p></div></main>;
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-content">
            <EditableSection
              pageName={pageName}
              sectionName="hero_title"
              initialContent={pageContent.hero_title || 'Welcome to the Ford Runners Club'}
              onSave={handleSaveContent}
              Tag="h1"
              isHtml={true}
            />
            <EditableSection
              pageName={pageName}
              sectionName="hero_paragraph"
              initialContent={pageContent.hero_paragraph || 'A community of passionate runners...'}
              onSave={handleSaveContent}
              Tag="p"
              isHtml={true}
            />
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
          <h2 className="section-title centered">
            <EditableSection
              pageName={pageName}
              sectionName="features_title"
              initialContent={pageContent.features_title || 'What We Offer'}
              onSave={handleSaveContent}
              isHtml={false}
              Tag="span"
            />
          </h2>
          <div className="home-feature-grid">
            {/* Feature Card 1: Group Runs */}
            <div className="feature-card card">
              <div className="feature-icon"><i className="fas fa-running"></i></div>
              <h3 className="feature-title">
                <EditableSection
                  pageName={pageName}
                  sectionName="feature_group_runs_title"
                  initialContent={pageContent.feature_group_runs_title || 'Group Runs'}
                  onSave={handleSaveContent}
                  isHtml={false}
                  Tag="span"
                />
              </h3>
              <EditableSection
                pageName={pageName}
                sectionName="feature_group_runs_text"
                initialContent={pageContent.feature_group_runs_text || "Join our weekly group runs..."}
                onSave={handleSaveContent}
                Tag="p"
                isHtml={true}
              />
            </div>
            {/* Feature Card 2: Events & Races */}
            <div className="feature-card card">
              <div className="feature-icon"><i className="fas fa-trophy"></i></div>
              <h3 className="feature-title">
                <EditableSection
                  pageName={pageName}
                  sectionName="feature_events_races_title"
                  initialContent={pageContent.feature_events_races_title || 'Events & Races'}
                  onSave={handleSaveContent}
                  isHtml={false}
                  Tag="span"
                />
              </h3>
              <EditableSection
                pageName={pageName}
                sectionName="feature_events_races_text"
                initialContent={pageContent.feature_events_races_text || 'Participate in local and national...'}
                onSave={handleSaveContent}
                Tag="p"
                isHtml={true}
              />
            </div>
            {/* Feature Card 3: Community */}
            <div className="feature-card card">
              <div className="feature-icon"><i className="fas fa-users"></i></div>
              <h3 className="feature-title">
                <EditableSection
                  pageName={pageName}
                  sectionName="feature_community_title"
                  initialContent={pageContent.feature_community_title || 'Community'}
                  onSave={handleSaveContent}
                  isHtml={false}
                  Tag="span"
                />
              </h3>
              <EditableSection
                pageName={pageName}
                sectionName="feature_community_text"
                initialContent={pageContent.feature_community_text || 'Connect with a supportive community...'}
                onSave={handleSaveContent}
                Tag="p"
                isHtml={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="home-testimonial">
        <div className="container">
          <h2 className="section-title centered">
            <EditableSection
              pageName={pageName}
              sectionName="runner_stories_title"
              initialContent={pageContent.runner_stories_title || 'Runner Stories'}
              onSave={handleSaveContent}
              isHtml={false}
              Tag="span"
            />
          </h2>
          <div className="strava-widget">
          <iframe allowtransparency='true' frameBorder='0' height='454' width='500px' src='https://www.strava.com/clubs/107693/latest-rides/f316579198369657308aac43ec63a6a313c88797?show_rides=true'></iframe>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta">
        <div className="container">
          <div className="home-cta-content">
            <h2 className="cta-title">
              <EditableSection
                pageName={pageName}
                sectionName="cta_title"
                initialContent={pageContent.cta_title || 'Ready to Join Our Running Community?'}
                onSave={handleSaveContent}
                isHtml={false} // Typically titles are plain text
                Tag="span"
              />
            </h2>
            <EditableSection
              pageName={pageName}
              sectionName="cta_paragraph"
              initialContent={pageContent.cta_paragraph || "Whether you're a seasoned marathoner..."}
              onSave={handleSaveContent}
              Tag="p"
              isHtml={true}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;