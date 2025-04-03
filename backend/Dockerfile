FROM python:3.9-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Set environment variables
ENV PYTHONPATH=/app
ENV FLASK_APP=frc
ENV FLASK_ENV=production
ENV SECRET_KEY=${SECRET_KEY}

# Expose port
EXPOSE 5000

# Command to run when container starts
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "frc:create_app()"]
