FROM node:20-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .
RUN npm run build

# docker build -t travis:latest .
# docker run -d --name travis -p 5173:80 travis:latest
# OR
# npm run prod
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
