import { Link } from 'react-router-dom';

function Disclaimer() {
  return (
    <main>
      <div className="container max-w-4xl">
        <div className="page-header">
          <h1 className="page-title">Disclaimer</h1>
          <p className="page-description">
            Welcome to the Ford Runners Club website. By accessing and using this website, 
            you agree to the following disclaimers:
          </p>
        </div>

        <div className="card p-8 mb-8">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">1. Informational Content</h2>
            <p>
              The content provided on this website is for general informational purposes only. 
              While we strive to ensure that the information is accurate and up-to-date, we make 
              no representations or warranties of any kind, express or implied, about the 
              completeness, accuracy, reliability, suitability, or availability of the information. 
              Any reliance you place on such information is strictly at your own risk.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">2. Fitness and Health</h2>
            <p>
              Participation in running and other physical activities carries inherent risks. 
              Before engaging in any exercise or training program, we strongly recommend 
              consulting with a qualified healthcare professional to assess your individual 
              health condition and determine the suitability of such activities for you.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">3. Club Events and Activities</h2>
            <p>
              The Ford Runners Club organizes various events and activities for its members. 
              While we take reasonable precautions to ensure the safety and well-being of 
              participants, we cannot be held responsible for any injuries, accidents, or 
              incidents that may occur during club events. Participants are responsible for 
              their own safety and should follow the guidelines provided by the event organizers.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">4. External Links</h2>
            <p>
              This website may contain links to external websites and resources. The inclusion 
              of any external links does not imply endorsement or recommendation by the Ford 
              Runners Club. We are not responsible for the content, privacy policies, or 
              practices of these external sites.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
            <p>
              The Ford Runners Club website does not use cookies or any other tracking 
              technologies to collect personal information about visitors. Your privacy is 
              important to us, and we do not store any identifiable information about you 
              without your consent.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">6. Personally Identifiable Information</h2>
            <p>
              All personally identifiable information is stored properly and safeguards are 
              in place to keep your data out of the hands of cyber criminals and hackers.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">7. Changes to the Website</h2>
            <p>
              The Ford Runners Club reserves the right to modify, update, or discontinue any 
              part of this website at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p>
              If you have any questions or concerns about the disclaimers or any aspect of 
              the Ford Runners Club website, please feel free to contact us.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Disclaimer;