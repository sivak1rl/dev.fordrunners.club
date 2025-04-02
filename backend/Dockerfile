FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create a non-root user to run the application
RUN useradd -m appuser
USER appuser

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=production
ENV FLASK_DEBUG=0

# Expose the port
EXPOSE 5000

# Start the application
CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]