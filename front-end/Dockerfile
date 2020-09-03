# pull official base image
FROM node:12 as react-build

# set working directory
WORKDIR /src/app

COPY /package*.json ./

RUN npm install

COPY . . 

ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "start" ]