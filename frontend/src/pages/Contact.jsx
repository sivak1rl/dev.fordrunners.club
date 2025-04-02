import '../styles/style.css';
import '../styles/Contact.css';

function Contact() {
  return (
    <div id="content">
      <h1 id="main-header">Contact Us</h1>
      <p>Have questions or want to get in touch with the Ford Runners Club? You can get us here.</p>
      <div id="contact">
        <div className="left50">
          <h2>Webex</h2>
          <p>Join our Webex Teams space with the link below.</p>
          <p><a target="blank"
            href="https://www.webexteams.ford.com/space?r=qi6q">https://www.webexteams.ford.com/space?r=qi6q</a>
          </p>
        </div>
        <div className="right50">
          <h2>Email</h2>
          <p>Send us an email at <a href="mailto:fordrunnerclub@gmail.com">fordrunnerclub@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;