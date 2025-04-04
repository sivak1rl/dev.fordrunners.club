import { useState, useEffect } from 'react';

function Events() {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    
    fetchEvents();
  }, []);

  return (
    <main>
      <div className="container">
        <div className="page-header">
          <div className="page-header-content">
            <h1 className="page-title">Upcoming Events</h1>
            <p className="page-description">
              Check out the exciting running events organized by the Ford Runners Club.
              Join us for group runs, races, and social gatherings.
            </p>
          </div>
        </div>

        <section className="section">
          <h2 className="section-title">Ongoing Events</h2>
          <div className="events-list">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-header">
                  <h3 className="event-title">{event.title}</h3>
                  <div className="event-meta">
                    {event.day && (
                      <div className="event-meta-item">
                        <i className="fas fa-calendar-alt event-meta-icon"></i>
                        <span>{event.day}</span>
                      </div>
                    )}
                    {event.date && (
                      <div className="event-meta-item">
                        <i className="fas fa-calendar-alt event-meta-icon"></i>
                        <span>{event.date}</span>
                      </div>
                    )}
                    {event.time && (
                      <div className="event-meta-item">
                        <i className="fas fa-clock event-meta-icon"></i>
                        <span>{event.time}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="event-meta-item">
                        <i className="fas fa-map-marker-alt event-meta-icon"></i>
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="event-content">
                  <p className="event-description">{event.description}</p>
                  {/* <div className="event-actions">
                    <a href="#contact-links" className="btn btn-primary btn-sm">Contact for Details</a>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CCR Info Section */}
        <section className="section bg-gray-100 rounded-lg p-8">
          <h2 className="section-title">Corporate Cup Relays Information</h2>
          <div className="grid gap-6">
            <div className="alert alert-info">
              <div className="alert-icon">
                <i className="fas fa-info-circle"></i>
              </div>
              <div className="alert-content">
                <h4 className="alert-title">When</h4>
                <p>10K @ 7:45am | 5K run @ 9:00am | 5K walk @ 9:05am | Jumps/Shot @ 10:30am | Track Meet @ noon-4:00pm</p>
              </div>
            </div>
            
            <div className="card p-6">
              <p className="mb-4">
                All ability levels and ages are welcome. The relay events have many different age and gender requirements to level the playing field amongst teams. We especially need retirees for the morning road races. Please talk to us before you decide you are too slow to compete.
              </p>
            </div>
          </div>
        </section>

        {/* Calendar Section */}
        <section className="section">
          <div className="calendar-container">
            <div className="calendar-header">
              <h2 className="mb-0">Our Calendar</h2>
            </div>
            <iframe 
              className="calendar-embed"
              title="Ford Runners Club Calendar"
              src="https://calendar.google.com/calendar/embed?wkst=1&bgcolor=%23ffffff&ctz=America%2FNew_York&src=Zm9yZHJ1bm5lcmNsdWJAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=bGIzcG9iZjU5Y2J2bnZ0NW5scHFubmU1bjBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237986CB&color=%23AD1457&color=%234285F4"
            ></iframe>
            <p className="text-center mt-4">
              If you can't see our calendar, <a href="https://calendar.google.com/calendar/embed?wkst=1&bgcolor=%23ffffff&ctz=America%2FNew_York&src=Zm9yZHJ1bm5lcmNsdWJAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=bGIzcG9iZjU5Y2J2bnZ0NW5scHFubmU1bjBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ" target="_blank" rel="noopener noreferrer">please try here instead</a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Events;