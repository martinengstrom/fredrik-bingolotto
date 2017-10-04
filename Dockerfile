FROM node

RUN apt-get update && apt-get install -y texlive

EXPOSE 8000
WORKDIR /srv
CMD npm install && node server.js
