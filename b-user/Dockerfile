FROM node:14
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
COPY . /app
RUN yarn install --frozen-lockfile
CMD ["yarn", "start"]