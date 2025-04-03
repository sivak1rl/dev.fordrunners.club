# Ford Runners Club Website

This repository contains the codebase for the Ford Runners Club website, a full-stack web application built with React and Flask. The website serves as a community hub for Ford employees who enjoy running, providing information about club events, training resources for new runners, and a photo gallery of past activities.

## Project Structure

The project is divided into two main parts:

### Frontend
- Built with React.js and Vite
- Modern, responsive design with custom CSS
- Features include:
  - Home page with club information
  - Events calendar with upcoming activities
  - New runners section with training plans
  - Photo gallery
  - About page and contact information

### Backend
- Built with Python using Flask
- RESTful API endpoints
- Serves frontend build in production

## Technologies Used

- **Frontend:**
  - React.js
  - React Router for navigation
  - CSS for styling (custom framework)
  - Vite for bundling

- **Backend:**
  - Flask (Python web framework)
  - Flask-CORS for cross-origin requests

- **Deployment:**
  - Docker for containerization
  - Nginx for serving the frontend and as a reverse proxy
  - SSL configuration for HTTPS

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- Python 3.9 or higher
- npm or yarn
- Docker and docker-compose (for production deployment)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ford-runners-club.git
   cd ford-runners-club
   ```

2. Frontend setup:
   ```
   cd frontend
   npm install
   npm run dev
   ```
   The frontend development server will start at http://localhost:8080

3. Backend setup:
   ```
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   python -m flask run
   ```
   The backend server will start at http://localhost:5000

### Full-stack Development

You can run both frontend and backend concurrently using the provided npm script:

```
cd frontend
npm run start:full
```

## Production Deployment

The application is designed to be deployed using Docker:

1. Build and run using docker-compose:
   ```
   docker-compose build
   docker-compose up -d
   ```

2. For subsequent updates, you can use the provided shell script:
   ```
   ./rebuild_app.sh
   ```

## Project Customization

- CSS variables can be modified in `frontend/src/styles/variables.css`
- Add new routes in `frontend/src/App.jsx`
- Backend API endpoints can be added in `backend/frc/blueprints/api.py`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License

This project is intended for use by the Ford Runners Club.

## Acknowledgments

- Icons provided by Font Awesome
- Fonts: Inter, Montserrat, and JetBrains Mono from Google Fonts
