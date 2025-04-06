FROM python:3.9

WORKDIR /app

RUN apt-get update && apt-get install -y libpq-dev gcc && apt-get clean

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONPATH=/app
ENV FLASK_APP=frc
ENV FLASK_ENV=production
ENV SECRET_KEY=${SECRET_KEY}

EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--reload", "frc:create_app()"]
