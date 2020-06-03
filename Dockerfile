FROM node:14 AS BuildImage

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install

COPY .babelrc .linguirc tsconfig.json .eslintrc.json /app/
COPY src /app/src
COPY public /app/public
RUN npm run lint
RUN npm run build

FROM node:14
COPY --from=BuildImage /app/package.json package.json
COPY --from=BuildImage /app/package-lock.json package-lock.json
COPY --from=BuildImage /app/build build

RUN npm install -g serve

CMD serve -s build

