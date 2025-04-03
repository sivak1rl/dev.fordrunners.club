from flask import Blueprint, jsonify

# Create blueprint
api_bp = Blueprint('api', __name__)

# Add routes to blueprint
@api_bp.route('/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello from Ford Runners Club API!"})

# Add more API routes as needed
# For example:
@api_bp.route('/events', methods=['GET'])
def get_events():
    # Logic to fetch events from database
    events = [{
      "id": 1,
      "title": 'Weekly Track Workout',
      "day": 'Every Tuesday',
      "time": '6:00 PM',
      "location": 'Check our Webex',
      "description": 'Runners of all ability levels are welcome. There is no one who is too slow for these workouts. Each runner goes at what-ever pace they are comfortable at. The workout begins Tuesdays at 6:00 PM, but show up early if you need time to warm-up and stretch. There is no bathroom or place to change, there is no water fountain, so be advised.'
    },
    {
      "id": 2,
      "title": 'Corporate Cup Relays',
      "date": 'June 2025',
      "location": 'Berkley, MI',
      "description": 'The FRC\'s main event each year is a charity 5k/10k and track & field competition vs GM and Stellantis called the Corporate Cup Relays which is held in June. This competition is a lot of fun and raises money for Special Olympics of Michigan and Friends For The Dearborn Animal Shelter. CCR is open to Salaried, Hourly, Agency, Retired/Alumni*, Supplier and Supplemental employees located at a Ford site.'
    },
    {
      "id": 3,
      "title": 'Weekend Long Run',
      "day": 'Every Saturday',
      "time": '8:00 AM',
      "location": 'Rotating Locations',
      "description": 'Join us for our weekend long run where we tackle different routes around the area. All paces welcome! Routes are typically between 5-10 miles, with options to shorten or extend based on your training needs.'
    }]
    return jsonify(events)