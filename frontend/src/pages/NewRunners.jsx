import { useState } from 'react';
import { Link } from 'react-router-dom';

function NewRunners() {
  const [activeTab, setActiveTab] = useState('5k');
  const [expandedWeek, setExpandedWeek] = useState(null);

  const toggleWeek = (weekNum) => {
    setExpandedWeek(expandedWeek === weekNum ? null : weekNum);
  };

  return (
    <main>
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-header-content">
            <h1 className="page-title">Welcome, Future Ford Runner!</h1>
            <div className="alert alert-info mb-6">
              <div className="alert-icon">
                <i className="fas fa-info-circle"></i>
              </div>
              <div className="alert-content">
                <p className="mb-0">
                  Note that any of these training plans <strong>can and should be adjusted to fit your individual
                  needs</strong>. These are "one-size fits all" solutions that may not fit your needs. As always,
                  consult with a physician or qualified health professional before engaging in any physical activity.
                  Please review our <Link to='/disclaimer'>disclaimer</Link>.
                </p>
              </div>
            </div>
            <p className="page-description">
              Choose your adventure below to get started on your running journey.
            </p>
          </div>
        </div>

        {/* Tips Section */}
        <section className="tips-section mb-12">
          <h2 className="section-title mb-6">Tips & Tricks for New Runners</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3 className="tip-title">
                <i className="fas fa-shoe-prints tip-icon"></i>
                Footwear
              </h3>
              <p>
                Good running shoes can help prevent overuse injuries by providing proper support
                and cushioning for your feet. Visit a specialty running store for a professional
                fitting to find the right shoes for your foot type and running style.
              </p>
              <p className="text-sm text-gray-600">
                Source: <a href="#ref4" className="text-ford-blue">Running-Related Biomechanical Risk Factors for Overuse Injuries</a>
              </p>
            </div>
            
            <div className="tip-card">
              <h3 className="tip-title">
                <i className="fas fa-tint tip-icon"></i>
                Hydration
              </h3>
              <p>
                Water is essential for endurance and recovery. Drink 16-20 ounces of water 2-3 hours
                before running, and 6-8 ounces every 15-20 minutes during your run. After running,
                replenish with water or a sports drink to replace lost electrolytes.
              </p>
              <p className="text-sm text-gray-600">
                Source: <a href="#ref3" className="text-ford-blue">Factors Affecting Training and Physical Performance</a>
              </p>
            </div>
            
            <div className="tip-card">
              <h3 className="tip-title">
                <i className="fas fa-bed tip-icon"></i>
                Rest
              </h3>
              <p>
                Don't underestimate the power of a good night's sleep for recovery. Aim for 7-9 hours
                of quality sleep each night. Rest days are equally important—they allow your muscles
                to repair and strengthen, reducing the risk of injury.
              </p>
              <p className="text-sm text-gray-600">
                Source: <a href="#ref3" className="text-ford-blue">Factors Affecting Training and Physical Performance</a>
              </p>
            </div>
            
            <div className="tip-card">
              <h3 className="tip-title">
                <i className="fas fa-heartbeat tip-icon"></i>
                Start Slow
              </h3>
              <p>
                Begin with a comfortable pace where you can maintain a conversation. The "talk test"
                is a good way to gauge if you're pushing too hard. Gradually increase your distance
                and intensity over time—the 10% rule suggests not increasing your weekly mileage by
                more than 10%.
              </p>
            </div>
          </div>
        </section>

        {/* Training Plans Section */}
        <section className="training-plans">
          <h2 className="section-title">Training Plans</h2>
          
          <div className="plan-tabs">
            <button 
              className={`plan-tab ${activeTab === '5k' ? 'active' : ''}`}
              onClick={() => setActiveTab('5k')}
            >
              Couch to 5K
            </button>
            <button 
              className={`plan-tab ${activeTab === '10k' ? 'active' : ''}`}
              onClick={() => setActiveTab('10k')}
            >
              Couch to 10K
            </button>
            <button 
              className={`plan-tab ${activeTab === 'marathon' ? 'active' : ''}`}
              onClick={() => setActiveTab('marathon')}
            >
              Marathon Training
            </button>
          </div>
          
          {/* 5K Plan */}
          <div className={`plan-content ${activeTab === '5k' ? 'active' : ''}`}>
            <div className="mb-6">
              <h3>Couch to 5K: An 8-Week Plan</h3>
              <p>
                Inspired by the "Start to Run" program, which has been shown to effectively increase physical
                activity among novice runners. This program includes three practice sessions per week, with
                rest days in between.
              </p>
              <div className="alert alert-info mb-6">
                <div className="alert-icon">
                  <i className="fas fa-info-circle"></i>
                </div>
                <div className="alert-content">
                  <p className="mb-0">
                    "Periodized training programs should consider the target competitive distance, experience, 
                    and time availability."<br/>"Alternate sessions of high-intensity or sprint interval training 
                    with sessions of low and moderate intensity continuous training, with ≥ 75% of the volume at 
                    low intensity."
                  </p>
                </div>
              </div>
            </div>
            
            <ul className="week-list">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(week => (
                <li key={week} className="week-item">
                  <div 
                    className="week-header" 
                    onClick={() => toggleWeek(week)}
                  >
                    <h4 className="mb-0">Week {week}</h4>
                    <i className={`fas fa-chevron-${expandedWeek === week ? 'up' : 'down'}`}></i>
                  </div>
                  {expandedWeek === week && (
                    <div className="week-content">
                      {week === 1 && (
                        <div>
                          <p><strong>Walk 5 min, Run 1 min (Repeat 4 times)</strong></p>
                          <p>Do this workout 3 times this week, with at least one day of rest between sessions.</p>
                          <p>Focus on proper form and breathing. Don't worry about speed—just get comfortable with the motion of running.</p>
                        </div>
                      )}
                      {week === 2 && (
                        <div>
                          <p><strong>Walk 4 min, Run 2 min (Repeat 4 times)</strong></p>
                          <p>Continue with 3 sessions per week. You're now doubling your running time!</p>
                          <p>Pay attention to how your body feels and adjust as needed.</p>
                        </div>
                      )}
                      {/* Content for other weeks would follow the same pattern */}
                      {week > 2 && (
                        <div>
                          <p>
                            <strong>
                              {week === 3 && 'Walk 3 min, Run 3 min (Repeat 4 times)'}
                              {week === 4 && 'Walk 2 min, Run 4 min (Repeat 4 times)'}
                              {week === 5 && 'Walk 2 min, Run 5 min (Repeat 3 times)'}
                              {week === 6 && 'Walk 1 min, Run 6 min (Repeat 3 times)'}
                              {week === 7 && 'Walk 1 min, Run 7 min (Repeat 3 times)'}
                              {week === 8 && 'Walk 1 min, Run 8 min (Repeat 3 times)'}
                            </strong>
                          </p>
                          <p>Continue with 3 sessions per week, allowing for rest days between workouts.</p>
                          <p>
                            {week < 6 
                              ? 'Focus on building endurance and maintaining consistent form.' 
                              : 'You\'re approaching your goal! Stay consistent and trust your training.'}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* 10K Plan */}
          <div className={`plan-content ${activeTab === '10k' ? 'active' : ''}`}>
            <h3>Couch to 10K: A 12-Week Plan</h3>
            <p>
              Building on the success of the 5K program, this 12-week plan gradually increases your 
              endurance to prepare for a 10K race. The program follows the same principle of 
              alternating walking and running, with three sessions per week.
            </p>
            
            <ul className="week-list">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(week => (
                <li key={week} className="week-item">
                  <div 
                    className="week-header" 
                    onClick={() => toggleWeek(`10k-${week}`)}
                  >
                    <h4 className="mb-0">Week {week}</h4>
                    <i className={`fas fa-chevron-${expandedWeek === `10k-${week}` ? 'up' : 'down'}`}></i>
                  </div>
                  {expandedWeek === `10k-${week}` && (
                    <div className="week-content">
                      <p>
                        <strong>
                          {week === 1 && 'Walk 4 min, Run 2 min (Repeat 4 times)'}
                          {week === 2 && 'Walk 3 min, Run 3 min (Repeat 4 times)'}
                          {week === 3 && 'Walk 2 min, Run 4 min (Repeat 4 times)'}
                          {week === 4 && 'Walk 2 min, Run 5 min (Repeat 3 times)'}
                          {week === 5 && 'Walk 1 min, Run 6 min (Repeat 3 times)'}
                          {week === 6 && 'Walk 1 min, Run 7 min (Repeat 3 times)'}
                          {week === 7 && 'Walk 1 min, Run 8 min (Repeat 3 times)'}
                          {week === 8 && 'Walk 1 min, Run 9 min (Repeat 3 times)'}
                          {week === 9 && 'Walk 1 min, Run 10 min (Repeat 3 times)'}
                          {week === 10 && 'Walk 1 min, Run 11 min (Repeat 3 times)'}
                          {week === 11 && 'Walk 1 min, Run 12 min (Repeat 3 times)'}
                          {week === 12 && 'Walk 1 min, Run 13 min (Repeat 3 times)'}
                        </strong>
                      </p>
                      <p>Schedule 3 workout sessions each week with rest days in between.</p>
                      <p>
                        {week < 6 
                          ? 'Focus on building a solid foundation of endurance.' 
                          : week < 10 
                            ? 'You\'re making great progress! Pay attention to your form as you increase distance.'
                            : 'The finish line is in sight! Keep up the great work and prepare for your 10K.'}
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Marathon Plan */}
          <div className={`plan-content ${activeTab === 'marathon' ? 'active' : ''}`}>
            <div className="text-center py-12">
              <i className="fas fa-running text-5xl text-ford-blue mb-4"></i>
              <h3>Marathon Training: Coming Soon</h3>
              <p className="text-lg mb-6">
                Our comprehensive 18-week marathon training plan is currently being developed 
                by our experienced coaches.
              </p>
              <p>
                Check back soon or contact us to be notified when the plan becomes available.
              </p>
              <div className="mt-6">
                <Link to="#contact-links" className="btn btn-primary">
                  Contact for Details
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* References Section */}
        <section className="references-section" id="references">
          <h3 className="mb-4">References:</h3>
          <ol className="reference-list">
            <li id="ref1" className="reference-item">
              <a 
                target="_blank" 
                rel="noopener noreferrer"
                href="https://bmcpublichealth.biomedcentral.com/counter/pdf/10.1186/1471-2458-13-697"
                className="reference-link"
              >
                Effectiveness of Start to Run, a 6-week training program for novice runners
              </a>
            </li>
            <li id="ref3" className="reference-item">
              <a 
                target="_blank" 
                rel="noopener noreferrer"
                href="https://www.mdpi.com/2075-4663/8/3/35/pdf?version=1585288260"
                className="reference-link"
              >
                Factors Affecting Training and Physical Performance in Recreational Endurance Runners
              </a>
            </li>
            <li id="ref4" className="reference-item">
              <a 
                target="_blank" 
                rel="noopener noreferrer"
                href="https://link.springer.com/content/pdf/10.1007/s40279-022-01666-3.pdf"
                className="reference-link"
              >
                Running-Related Biomechanical Risk Factors for Overuse Injuries in Distance Runners
              </a>
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}

export default NewRunners;