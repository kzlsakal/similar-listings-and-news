FROM node:current

WORKDIR /similar-listings-and-news
COPY package*.json ./
RUN npm install

EXPOSE 3005

COPY . .
RUN npm run build

CMD [ "npm", "start" ]
