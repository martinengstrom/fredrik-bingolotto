FROM node

RUN apt-get update && apt-get install -y \
	texlive \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

EXPOSE 8000
WORKDIR /srv
CMD npm install && node server.js
