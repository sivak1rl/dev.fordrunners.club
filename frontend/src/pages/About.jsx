import React, { useState, useEffect } from 'react';
import EditableSection from '../components/EditableSection';

function About() {
  const [pageContent, setPageContent] = useState({});
  const [loading, setLoading] = useState(true);
  const pageName = "about";

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
      <div className="container">
        {/* Page Header */}
        <div className="about-header">
          <EditableSection
            pageName={pageName}
            sectionName="header_title"
            initialContent={pageContent.header_title || 'About Ford Runners Club'}
            onSave={handleSaveContent}
            Tag="h1"
            isHtml={true} // Titles can be HTML if needed for styling like em, strong
          />
          <div className="about-intro">
            <EditableSection
              pageName={pageName}
              sectionName="intro_text"
              initialContent={pageContent.intro_text || 'Welcome to the Ford Runners Club...'}
              onSave={handleSaveContent}
              Tag="p"
              isHtml={true}
            />
          </div>
        </div>

        {/* Mission Section */}
        <section className="about-mission">
          <div className="container">
            <h2 className="section-title centered text-white">
              <EditableSection
                pageName={pageName}
                sectionName="mission_title"
                initialContent={pageContent.mission_title || 'Our Mission'}
                onSave={handleSaveContent}
                isHtml={false} // Titles are often plain text
                Tag="span" // Render as span inside h2
              />
            </h2>
            <EditableSection
              pageName={pageName}
              sectionName="mission_text_1"
              initialContent={pageContent.mission_text_1 || 'Our mission is to inspire...'}
              onSave={handleSaveContent}
              Tag="p"
              isHtml={true}
            />
            <EditableSection
              pageName={pageName}
              sectionName="mission_text_2"
              initialContent={pageContent.mission_text_2 || "At the heart of our club..."}
              onSave={handleSaveContent}
              Tag="p"
              isHtml={true}
            />
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="about-section">
          <h2 className="section-title">
            <EditableSection
              pageName={pageName}
              sectionName="offer_title"
              initialContent={pageContent.offer_title || 'What We Offer'}
              onSave={handleSaveContent}
              isHtml={false}
              Tag="span"
            />
          </h2>
          <div className="grid grid-2">
            {/* Card 1: Group Runs */}
            <div className="about-value-card">
              <div className="about-value-icon"><i className="fas fa-running"></i></div>
              <h3 className="about-value-title">
                <EditableSection
                  pageName={pageName}
                  sectionName="offer_group_runs_title"
                  initialContent={pageContent.offer_group_runs_title || 'Group Runs'}
                  onSave={handleSaveContent}
                  isHtml={false}
                  Tag="span"
                />
              </h3>
              <EditableSection
                pageName={pageName}
                sectionName="offer_group_runs_text"
                initialContent={pageContent.offer_group_runs_text || 'Regular group runs...'}
                onSave={handleSaveContent}
                Tag="p"
                isHtml={true}
              />
            </div>
            {/* Card 2: Training Plans */}
            <div className="about-value-card">
              <div className="about-value-icon"><i className="fas fa-clipboard-list"></i></div>
              <h3 className="about-value-title">
                <EditableSection
                  pageName={pageName}
                  sectionName="offer_training_plans_title"
                  initialContent={pageContent.offer_training_plans_title || 'Training Plans'}
                  onSave={handleSaveContent}
                  isHtml={false}
                  Tag="span"
                />
              </h3>
              <EditableSection
                pageName={pageName}
                sectionName="offer_training_plans_text"
                initialContent={pageContent.offer_training_plans_text || "Personalized training plans..."}
                onSave={handleSaveContent}
                Tag="p"
                isHtml={true}
              />
            </div>
            {/* Card 3: Events & Races */}
            <div className="about-value-card">
              <div className="about-value-icon"><i className="fas fa-trophy"></i></div>
              <h3 className="about-value-title">
                <EditableSection
                  pageName={pageName}
                  sectionName="offer_events_races_title"
                  initialContent={pageContent.offer_events_races_title || 'Events & Races'}
                  onSave={handleSaveContent}
                  isHtml={false}
                  Tag="span"
                />
              </h3>
              <EditableSection
                pageName={pageName}
                sectionName="offer_events_races_text"
                initialContent={pageContent.offer_events_races_text || 'Participation in local and national...'}
                onSave={handleSaveContent}
                Tag="p"
                isHtml={true}
              />
            </div>
            {/* Card 4: Community */}
            <div className="about-value-card">
              <div className="about-value-icon"><i className="fas fa-users"></i></div>
              <h3 className="about-value-title">
                <EditableSection
                  pageName={pageName}
                  sectionName="offer_community_title"
                  initialContent={pageContent.offer_community_title || 'Community'}
                  onSave={handleSaveContent}
                  isHtml={false}
                  Tag="span"
                />
              </h3>
              <EditableSection
                pageName={pageName}
                sectionName="offer_community_text"
                initialContent={pageContent.offer_community_text || 'Social events and networking...'}
                onSave={handleSaveContent}
                Tag="p"
                isHtml={true}
              />
            </div>
          </div>
        </section>

        {/* Get Involved Section */}
        <section className="about-section">
          <h2 className="section-title">
            <EditableSection
              pageName={pageName}
              sectionName="get_involved_title"
              initialContent={pageContent.get_involved_title || 'Get Involved'}
              onSave={handleSaveContent}
              isHtml={false}
              Tag="span"
            />
          </h2>
          <div className="grid grid-2 gap-8">
            <div>
              <EditableSection
                pageName={pageName}
                sectionName="get_involved_text_1"
                initialContent={pageContent.get_involved_text_1 || "Ready to lace up your running shoes..."}
                onSave={handleSaveContent}
                Tag="p"
                // className="text-lg" // EditableSection does not pass className to Tag, wrap if needed
                isHtml={true}
              />
              {/* If text-lg is crucial, wrap: <p className="text-lg"><EditableSection ... Tag="span" /></p> */}
              <EditableSection
                pageName={pageName}
                sectionName="get_involved_text_2"
                initialContent={pageContent.get_involved_text_2 || "We're excited to welcome you..."}
                onSave={handleSaveContent}
                Tag="p"
                isHtml={true}
              />
              <EditableSection
                pageName={pageName}
                sectionName="get_involved_text_3"
                initialContent={pageContent.get_involved_text_3 || "Let's run, explore, and achieve..."}
                onSave={handleSaveContent}
                Tag="p"
                // className="mb-6" // Wrap if needed
                isHtml={true}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default About;
