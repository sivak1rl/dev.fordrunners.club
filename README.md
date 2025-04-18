# 🏃‍♂️ Ford Runners Club Website

A modern, full-stack web application built to serve the Ford Runners Club community. This platform connects Ford employees who enjoy running, providing event information, training resources, and a vibrant community hub.

![Ford Runners Club Banner](/frontend/public/logo.jpg)

## ✨ Features

### 🌐 Frontend
- **Modern React Application** - Built with React 18 and Vite for lightning-fast performance
- **Responsive Design** - Custom CSS framework with adaptive layouts for all devices
- **Intuitive Navigation** - Clean, user-friendly interface with accessibility in mind
- **Interactive Components** - Dynamic content like event calendars, photo galleries, and training plans
- **Authentication System** - Secure login and registration with JWT

### 🖥️ Backend
- **RESTful API** - Flask-based backend with structured endpoints
- **Database Integration** - SQLAlchemy ORM with migrations support
- **JWT Authentication** - Secure token-based authentication with refresh capabilities
- **Admin Dashboard** - Protected routes for content management

### 🔐 Security Features
- **HTTPS Enforcement** - SSL/TLS encryption via Let's Encrypt
- **CORS Protection** - Configured access control
- **JWT Token Management** - Secure authentication with refresh tokens
- **Password Hashing** - Bcrypt implementation for user password security

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library for component-based development
- **React Router** - Client-side routing
- **Vite** - Next generation frontend tooling
- **Custom CSS Framework** - Tailored styling system with utility classes
- **Axios** - HTTP client for API requests

### Backend
- **Flask** - Lightweight Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **Flask-JWT-Extended** - JWT authentication
- **Flask-Migrate** - Database migrations
- **Flask-CORS** - Cross-Origin Resource Sharing

### DevOps & Infrastructure
- **Docker** - Containerization for consistent environments
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server and reverse proxy
- **Traefik** - Modern HTTP reverse proxy and load balancer
- **Let's Encrypt** - Automated SSL certificate issuance
- **GitHub Actions** - CI/CD with CodeQL security scanning

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose (for production/development)
- Node.js v18+ (for local development)
- Python 3.9+ (for local development)
- Git

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ford-runners-club.git
   cd ford-runners-club
   ```

2. **Local Development with Docker (Recommended)**
   ```bash
   # Start the local development environment
   docker compose up -d --build frontend-local backend-local
   
   # The app will be available at:
   # - Frontend: http://localhost:3000
   # - Backend API: http://localhost:5000/api
   ```

3. **Manual Setup (Without Docker)**
   
   **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   
   **Backend:**
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   python -m flask run
   ```

4. **VS Code Tasks**
   
   The project includes VS Code tasks for common operations:
   - `Start Project`: Launches the frontend development server
   - `Rebuild Project`: Rebuilds frontend and starts backend
   - `Production Build`: Creates production build and starts Flask in production mode

## 🌍 Deployment Options

### Production Deployment

```bash
# Build and deploy the production environment
docker compose up -d --build frontend backend

# For subsequent updates
docker compose down && docker compose up -d --build frontend backend
```

### Development Environment

```bash
# Start the development environment
docker compose up -d --build frontend-dev backend-dev

# View logs
docker compose logs <frontend[-dev|-local]|backend[-dev|-local]>
```

### SSL Certificates

traefik should handle certs

## 📁 Project Structure

```
ford-runners-club/
├── backend/                # Flask backend
│   ├── frc/                # Application package
│   │   ├── blueprints/     # API route blueprints
│   │   ├── models/         # Database models
│   │   ├── app.py          # App factory
│   │   └── extensions.py   # Flask extensions
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile          # Backend container definition
├── frontend/               # React frontend
│   ├── src/                # Source code
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (auth, etc.)
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── styles/         # CSS styles
│   ├── public/             # Static files
│   ├── package.json        # NPM dependencies
│   └── Dockerfile.nginx    # Frontend container definition
├── .github/                # GitHub Actions workflows
├── docker-compose.yml      # Multi-environment container config
├── manage_environments.sh  # Environment management script
└── README.md               # You are here! 📍
```

## 🧩 Customization

### Styling
- Modify CSS variables in `frontend/src/styles/variables.css`
- Add new utility classes in `frontend/src/styles/utilities.css`
- Component-specific styles in `frontend/src/styles/components.css`

### Adding Routes
- Frontend: Update routes in `frontend/src/App.jsx`
- Backend: Add new blueprints in `backend/frc/blueprints/`

### Database Changes
1. Modify models in `backend/frc/models/`
2. Generate migrations: `flask db migrate -m "Description"`
3. Apply migrations: `flask db upgrade`

## 🔧 Environment Variables

### Frontend
- `VITE_API_URL` - Backend API URL (default: `http://localhost:5000`)

### Backend
- `FLASK_ENV` - Environment (`development`, `production`, `local`)
- `SECRET_KEY` - Flask secret key
- `DATABASE_URL` - Database connection string
- `JWT_SECRET_KEY` - Secret for JWT tokens

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 👏 Acknowledgments

- Icons by [Font Awesome](https://fontawesome.com/)
- Fonts: Inter, Montserrat, and JetBrains Mono from [Google Fonts](https://fonts.google.com/)
- Photos placeholder by [Placeholder.com](https://placeholder.com/)
