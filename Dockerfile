FROM node
WORKDIR /app
COPY package.json
RUN npm i
COPY ..
EXPOSE 5173
RUN ["npm", "run", "dev"]
