import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/style.css';
import '../styles/Events.css';

function Events() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Weekly Track Workout',
      day: 'Every Tuesday!',
      time: '6:00 PM',
      location: 'Check our webex',
      description: 'Runners of all ability levels are welcome. There is no one who is too slow for these workouts. Each runner goes at what-ever pace they are comfortable at. The workout begins Tuesdays at 6:00 PM, but show up early if you need time to warm-up and stretch. There is no bathroom or place to change, there is no water fountain, so be advised.'
    },
    {
      id: 2,
      title: 'Corporate Cup Relays',
      location: 'Berkley, MI',
      description: 'The FRC\'s main event each year is a charity 5k/10k and track & field competition vs GM and Stellantis called the Corporate Cup Relays which is held in June. This competition is a lot of fun and raises money for Special Olympics of Michigan and Friends For The Dearborn Animal Shelter. CCR is open to Salaried, Hourly, Agency, Retired/Alumni*, Supplier and Supplemental employees located at a Ford site.'
    }
  ]);
  
  // In a production app, you would fetch events from your API
  // useEffect(() => {
  //   axios.get('/api/events')
  //     .then(response => setEvents(response.data))
  //     .catch(error => console.error('Error fetching events:', error));
  // }, []);

  return (
    <div id="content">
      <h1>Ongoing Events</h1>
      <p>Check out the exciting running events organized by the Ford Runners Club:</p>
      
      <ul id="ongoing-events">
        {events.map(event => (
          <li key={event.id}>
            <h2>{event.title}</h2>
            {event.day && <p>Day: {event.day}</p>}
            {event.time && <p>Time: {event.time}</p>}
            {event.location && <p>Location: {event.location}</p>}
            <p>{event.description}</p>
          </li>
        ))}
        <li>
          <h2>CCR Info</h2>
          <ul id="ccr-info">
            <li>When: 10K @ 7:45am | 5K run @ 9:00am | 5K walk @ 9:05am | Jumps/Shot @ 10:30am | Track Meet @ noon-4:00pm</li>
            <li>Where: All events will be staged at Anderson Middle School (3205 Catalpa Dr, Berkley, MI 48072)</li>
            <li>All ability levels and ages are welcome. The relay events have many different age and gender requirements to level the playing field amongst teams. We especially need retirees for the morning road races. Please talk to us before you decide you are too slow to compete.</li>
            <li>For <strong>anyone interested in TRACK events</strong>, there will be <strong>time trials on Tuesday, June 6th at 6pm</strong> in Dearborn! If you do not have recent track times, please plan to attend so we can start building relay teams and meet your teammates. Team captain will send out details to registered athletes. All speeds and skill levels will be there and everyone who wants to run in a relay will have a chance to.</li>
          </ul>
        </li>
      </ul>
      
      <div id="calendar">
        <h2>Our Calendar</h2>
        <iframe 
          title="Ford Runners Club Calendar"
          src="https://calendar.google.com/calendar/embed?wkst=1&bgcolor=%23ffffff&ctz=America%2FNew_York&src=Zm9yZHJ1bm5lcmNsdWJAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=bGIzcG9iZjU5Y2J2bnZ0NW5scHFubmU1bjBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237986CB&color=%23AD1457&color=%234285F4"
        ></iframe>
        <p>If you can't see our calendar, <a href="https://calendar.google.com/calendar/embed?wkst=1&bgcolor=%23ffffff&ctz=America%2FNew_York&src=Zm9yZHJ1bm5lcmNsdWJAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=bGIzcG9iZjU5Y2J2bnZ0NW5scHFubmU1bjBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ">please try here instead</a></p>
      </div>
    </div>
  );
}

export default Events;