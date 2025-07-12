FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /usr/src/app

COPY package*.json ./

USER root
RUN chown -R pptruser:pptruser /usr/src/app
USER pptruser

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]
