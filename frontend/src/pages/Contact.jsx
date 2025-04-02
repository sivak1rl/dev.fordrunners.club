import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real application, you would send the form data to your backend
    // For now, we'll just simulate a successful submission
    
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Your message has been sent! We\'ll get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <main>
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-header-content">
            <h1 className="page-title">Contact Us</h1>
            <p className="page-description">
              Have questions or want to get in touch with the Ford Runners Club? 
              We'd love to hear from you!
            </p>
          </div>
        </div>

        <div className="contact-container">
          {/* Contact Information */}
          <div className="contact-info">
            <h2 className="section-title">Get In Touch</h2>
            
            <div className="contact-method">
              <div className="contact-method-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-method-content">
                <h3>Email</h3>
                <p>
                  <a href="mailto:fordrunnerclub@gmail.com">
                    fordrunnerclub@gmail.com
                  </a>
                </p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-method-icon">
                <i className="fas fa-comment"></i>
              </div>
              <div className="contact-method-content">
                <h3>Webex Teams</h3>
                <p>
                  Join our Webex Teams space with the link below.
                </p>
                <a 
                  href="https://www.webexteams.ford.com/space?r=qi6q" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Join Webex Space
                </a>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-method-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <div className="contact-method-content">
                <h3>Weekly Runs</h3>
                <p>
                  Meet us at our weekly group runs to chat in person and get to know the club.
                </p>
                <a href="/events" className="btn btn-secondary btn-sm">
                  View Schedule
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h2 className="mb-6">Send Us a Message</h2>
            
            {formStatus.submitted ? (
              <div className="alert alert-success">
                <div className="alert-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="alert-content">
                  <p className="mb-0">{formStatus.message}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <div className="form-submit">
                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contact;