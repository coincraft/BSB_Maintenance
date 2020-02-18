FROM mhart/alpine-node:8.11.4
WORKDIR app

COPY package.json package.json
RUN npm install
RUN mv /app/node_modules /node_modules

COPY . .

EXPOSE 80
CMD ["node", "server.js"]