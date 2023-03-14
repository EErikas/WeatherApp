FROM node:lts-alpine

# Allow for Hot Reaload
ENV CHOKIDAR_USEPOLLING=true

WORKDIR /app
COPY ./package*.json .
RUN npm ci
CMD ["npm", "run", "dev"]