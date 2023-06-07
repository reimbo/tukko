FROM node:20-alpine as dev
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .
CMD ["npm", "run", "dev"]

FROM dev as build
RUN npm run build

FROM nginx:latest as production
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
