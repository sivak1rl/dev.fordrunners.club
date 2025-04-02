function About() {
  return (
    <main>
      <div className="container">
        {/* Page Header */}
        <div className="about-header">
          <h1>About Ford Runners Club</h1>
          <div className="about-intro">
            <p>
              Welcome to the Ford Runners Club, a vibrant community of passionate 
              runners dedicated to promoting health, fitness, and friendship through 
              the joy of running.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <section className="about-mission">
          <div className="container">
            <h2 className="section-title centered text-white">Our Mission</h2>
            <p>
              Our mission is to inspire and support our members in achieving their 
              running goals while fostering a sense of community and camaraderie. 
              We strive to create an inclusive and welcoming space where runners of 
              all backgrounds can come together to share their passion for the sport.
            </p>
            <p>
              At the heart of our club is the belief that running is not just a 
              physical activity but a way of life that empowers us to push our 
              boundaries, overcome challenges, and build lasting connections. 
              Whether you're a seasoned marathoner or a complete beginner, we 
              welcome all levels of runners to join our diverse and inclusive community.
            </p>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="about-section">
          <h2 className="section-title">What We Offer</h2>
          <div className="grid grid-2">
            <div className="about-value-card">
              <div className="about-value-icon">
                <i className="fas fa-running"></i>
              </div>
              <h3 className="about-value-title">Group Runs</h3>
              <p>
                Regular group runs led by experienced coaches to help you improve 
                your running form, endurance, and speed in a supportive environment.
              </p>
            </div>
            
            <div className="about-value-card">
              <div className="about-value-icon">
                <i className="fas fa-clipboard-list"></i>
              </div>
              <h3 className="about-value-title">Training Plans</h3>
              <p>
                Personalized training plans tailored to your fitness level and goals, 
                whether you're preparing for your first 5K or aiming for a marathon PR.
              </p>
            </div>
            
            <div className="about-value-card">
              <div className="about-value-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <h3 className="about-value-title">Events & Races</h3>
              <p>
                Participation in local and national running events and races, including 
                our annual Corporate Cup Relays charity 5k/10k and track & field competition.
              </p>
            </div>
            
            <div className="about-value-card">
              <div className="about-value-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="about-value-title">Community</h3>
              <p>
                Social events and networking opportunities with fellow runners who 
                share your passion and provide encouragement and motivation.
              </p>
            </div>
          </div>
        </section>

        {/* Get Involved Section */}
        <section className="about-section">
          <h2 className="section-title">Get Involved</h2>
          <div className="grid grid-2 gap-8">
            <div>
              <img src="/runners-group.jpg" alt="Group of runners" className="rounded-lg shadow-md w-full" />
            </div>
            <div>
              <p className="text-lg">
                Ready to lace up your running shoes and be part of our thriving community? 
                Joining the Ford Runners Club is simple! You can sign up online through 
                our website or come meet us at one of our group runs.
              </p>
              <p>
                We're excited to welcome you into the family and embark on a journey of 
                fitness and friendship together. Whether you're looking to set new personal 
                records, explore scenic running trails, or simply enjoy the exhilaration of 
                running, the Ford Runners Club has something to offer for everyone.
              </p>
              <p className="mb-6">
                Let's run, explore, and achieve greatness together!
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default About;