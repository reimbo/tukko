# docker build -t travis:dev --target=dev .
# docker run -p 5173:80 travis:dev
FROM node:20-alpine as dev
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .
CMD ["npm", "run", "dev"]

FROM dev as build
RUN npm run build

# docker build -t travis:latest --target=production .
# docker run -p 5173:80 travis:latest
FROM nginx:latest as production
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
