FROM node:12

WORKDIR /app

COPY . .
RUN npm install

EXPOSE 2000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && node app.js