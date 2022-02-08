FROM node:17-buster-slim

# Install packages
RUN apt-get update \
    && apt-get install -y supervisor
    
# Setup app
RUN mkdir -p /app

# Add application
WORKDIR /app
COPY . .

# Install dependencies
RUN npm install

# Setup superivsord
COPY config/supervisord.conf /etc/supervisord.conf

# Setup docker connection
COPY config/connection.js /app

# Expose the port node-js is reachable on
EXPOSE 3000

# Start the node-js application
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
