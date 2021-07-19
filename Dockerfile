FROM node:14 as build-step
WORKDIR /usr/src/app/back
COPY package.json /usr/src/app/back
RUN npm install
COPY . /usr/src/app/back
CMD ["node","./bin/www","--trace-warnings"]

