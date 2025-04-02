FROM nginx:alpine

# Install necessary tools for SSL
RUN apk add --no-cache openssl

# Create directory for certificates
RUN mkdir -p /etc/nginx/ssl

# Generate self-signed certificate (for development)
# In production, replace these with real certificates
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/nginx.key \
    -out /etc/nginx/ssl/nginx.crt \
    -subj "/CN=localhost" \
    -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"

# Copy SSL-enabled Nginx configuration
COPY nginx.ssl.conf /etc/nginx/conf.d/default.conf

# Copy static website files
COPY dist /usr/share/nginx/html

# Expose both HTTP and HTTPS ports
EXPOSE 80 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]