FROM node:18

WORKDIR /usr/src/app
COPY app/ .
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]

