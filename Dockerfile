FROM node:lts-alpine as frontend_builder
WORKDIR /app
COPY ../frontend/package*.json  .
RUN npm ci
COPY ./frontend/ .
RUN npm run build

FROM node:lts-alpine 
WORKDIR /app
COPY ../backend/package*.json  .
# Only install production packages
RUN npm ci --production
COPY ./backend/ .
COPY --from=frontend_builder /app/dist ./dist
CMD [ "npm", "start" ] 