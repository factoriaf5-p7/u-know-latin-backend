# Development Stage
FROM node:18-alpine AS development
WORKDIR /app
COPY package*.json ./
# RUN npm install --only=development
COPY . .
CMD ["npm", "run", "start:dev"]

# Production Stage
FROM node:18 AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package*.json ./
# RUN npm install --only=production
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"