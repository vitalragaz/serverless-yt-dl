# Stage 1 - the build process
FROM node:14-alpine as build-deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2 - the production environment
FROM node:14-alpine
WORKDIR /usr/src/app
COPY --from=build-deps /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install --only=production

ENV PORT 3000
EXPOSE 3000
CMD ["npm", "start"]
